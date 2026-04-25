// ============================================================
// Football API Service Layer — Football-Data.org Integration
// ============================================================

const FootballAPI = (() => {
    const CORS_PROXY = '/api/proxy?url='; // Strictly using requested local proxy gateway

    const API = {
        baseUrl: 'https://api.football-data.org/v4'
    };

    // Football-Data.org IDs: PL: 2021, CL: 2001, BL1: 2002, SA: 2019, PD: 2014, FL1: 2015, DED: 2003, PPL: 2017, ELC: 2016, BSA: 2013, WC: 2000, EC: 2018
    const ALLOWED_LEAGUES = [2021, 2014, 2001, 2002, 2019, 2015, 2003, 2017, 2016, 2013, 2000, 2018];
 
    // ── Helpers ──────────────────────────────────────────────
    function todayDate() { return new Date().toISOString().slice(0, 10); }
    function yesterdayDate() {
        const d = new Date(); d.setDate(d.getDate() - 1);
        return d.toISOString().slice(0, 10);
    }
    function tomorrowDate() {
        const d = new Date(); d.setDate(d.getDate() + 1);
        return d.toISOString().slice(0, 10);
    }
    
    function getCurrentSeason() {
        // Football-Data uses the START year of the season.
        // If we are in the first half of the year (Jan-June), the season began last year.
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed
        return (month < 7) ? (year - 1) : year;
    }
 
    // ── Core Fetch with CORS Proxy Rotation ──────────────────
    let lastRequestTime = 0;
    const REQUEST_DELAY = 6100; // 6.1 seconds between requests (Stricter for Football-Data.org Free Tier: 10 calls/min)
 
    async function waitForThrottle() {
        const now = Date.now();
        const timeSinceLast = now - lastRequestTime;
        const delay = Math.max(0, REQUEST_DELAY - timeSinceLast);
        
        lastRequestTime = now + delay;
        
        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
 
    async function apiFetch(endpoint, params = {}, ttl = null, retryCount = 0) {
        if (retryCount > 2) {
            console.error(`[FootballData] Max retries reached for: ${endpoint}`);
            return null;
        }
 
        const qs = new URLSearchParams(params).toString();
        const originalUrl = `${API.baseUrl}/${endpoint}${qs ? '?' + qs : ''}`;
 
        // Wait for throttle
        await waitForThrottle();
 
        const finalUrl = CORS_PROXY + encodeURIComponent(originalUrl);
        console.log(`[FootballData] Requesting (Authorized by Proxy): ${endpoint}`);
 
        try {
            // Headers are now handled by the server-side proxy
            const res = await fetch(finalUrl); 
 
            if (res.status === 429) {
                console.warn(`[FootballData] Rate limited (429)! Waiting 60s...`);
                await new Promise(resolve => setTimeout(resolve, 60000));
                return apiFetch(endpoint, params, ttl, retryCount + 1);
            }
 
            if (!res.ok) {
                // Check if it's a 403 (could mean key issue or restricted league)
                if (res.status === 403) {
                    console.error(`[FootballData] 403 Forbidden - Check API key permissions for ${endpoint}`);
                }
                console.error(`[FootballData] API returned ${res.status} for ${endpoint}`);
                return null;
            }
 
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(`[FootballData] Fetch failed for ${endpoint}:`, err.message);
            return null;
        }
    }

    // ── Normalization ────────────────────────────────────────
    function normalizeMatches(data) {
        if (!data || !data.matches) return [];
        return data.matches.map(m => {
            const statusMap = {
                'FINISHED': 'FT',
                'IN_PLAY': 'LIVE',
                'PAUSED': 'HT',
                'SCHEDULED': 'NS',
                'TIMED': 'NS',
                'POSTPONED': 'PST',
                'CANCELLED': 'CANC',
                'SUSPENDED': 'SUSP'
            };

            return {
                fixture: {
                    id: m.id,
                    date: m.utcDate,
                    timestamp: Math.floor(new Date(m.utcDate).getTime() / 1000),
                    status: { short: statusMap[m.status] || 'NS', elapsed: null } // Free tier doesn't usually provide elapsed minute
                },
                league: {
                    id: m.competition?.id,
                    name: m.competition?.name,
                    logo: m.competition?.emblem || null
                },
                teams: {
                    home: { id: m.homeTeam?.id, name: m.homeTeam?.name, logo: m.homeTeam?.crest || null },
                    away: { id: m.awayTeam?.id, name: m.awayTeam?.name, logo: m.awayTeam?.crest || null }
                },
                goals: {
                    home: m.score?.fullTime?.home ?? null,
                    away: m.score?.fullTime?.away ?? null
                }
            };
        });
    }

    function normalizeStandings(data, leagueId) {
        if (!data || !data.standings || data.standings.length === 0) return [];
        
        // Football-Data.org returns multiple types (TOTAL, HOME, AWAY). We want TOTAL.
        const totalStandings = data.standings.find(s => s.type === 'TOTAL') || data.standings[0];
        if (!totalStandings || !totalStandings.table) return [];

        return [{
            league: {
                id: leagueId,
                standings: [totalStandings.table.map(s => ({
                    rank: s.position,
                    team: { name: s.team.name, logo: s.team.crest || null },
                    all: { played: s.playedGames, win: s.won, draw: s.draw, lose: s.lost },
                    points: s.points,
                    goalsDiff: s.goalDifference
                }))]
            }
        }];
    }

    function normalizeScorers(data) {
        if (!data || !data.scorers) return [];
        return data.scorers.map(s => ({
            player: { name: s.player.name, photo: null },
            statistics: [{
                team: { name: s.team.name, logo: s.team.crest || null },
                goals: { total: s.goals || 0 }
            }]
        }));
    }

    // ── Public Data Fetchers ─────────────────────────────────
    async function fetchFixturesByDate(dateStr) {
        const data = await apiFetch('matches', { 
            dateFrom: dateStr, 
            dateTo: dateStr,
            competitions: ALLOWED_LEAGUES.join(',')
        });
        return normalizeMatches(data);
    }

    async function fetchLiveFixtures() {
        const data = await apiFetch('matches', { status: 'IN_PLAY' });
        return normalizeMatches(data);
    }

    async function fetchStandings(leagueId) {
        const data = await apiFetch(`competitions/${leagueId}/standings`, { season: getCurrentSeason() });
        return normalizeStandings(data, leagueId);
    }

    async function fetchTopScorers(leagueId) {
        const data = await apiFetch(`competitions/${leagueId}/scorers`, { season: getCurrentSeason() });
        return normalizeScorers(data);
    }

    // Detail functions - Limited in Free Tier, often 403. UI will use Fallback if these return null.
    async function fetchFixtureLineups(matchId) { return null; }
    async function fetchFixtureEvents(matchId) { return null; }
    async function fetchFixtureStatistics(matchId) { return null; }

    async function fetchPlayerById(playerId) {
        const data = await apiFetch(`persons/${playerId}`);
        return data ? [{ player: data, statistics: [] }] : null;
    }

    async function searchPlayerByName(name) { return []; } 

    async function fetchTournamentBracket(leagueId) {
        return { source: 'none', fixtures: [] };
    }

    async function fetchTransfers() { return []; }

    // ── Public Interface ─────────────────────────────────────
    return {
        fetchTodayFixtures: () => fetchFixturesByDate(todayDate()),
        fetchYesterdayFixtures: () => fetchFixturesByDate(yesterdayDate()),
        fetchTomorrowFixtures: () => fetchFixturesByDate(tomorrowDate()),
        fetchLiveFixtures,
        fetchFixturesByDate,
        fetchStandings,
        fetchTopScorers,
        fetchTournamentBracket,
        fetchFixtureLineups,
        fetchFixtureEvents,
        fetchFixtureStatistics,
        fetchPlayerById,
        searchPlayerByName,
        fetchTransfers,
        ALLOWED_LEAGUES,
        filterByAllowedLeagues: (fixts) => {
            if (!Array.isArray(fixts)) return [];
            return fixts.filter(f => ALLOWED_LEAGUES.includes(f?.league?.id));
        },
        transformFixture: (fixture) => {
            if (!fixture || !fixture.fixture) return null;
            const f = fixture.fixture;
            const teams = fixture.teams;
            const goals = fixture.goals;
            const league = fixture.league;
            const short = f.status?.short || '';
            let status = 'Upcoming', statusKey = 'upcoming', time = '';
            
            if (['LIVE', '1H', '2H', 'HT', 'ET', 'P'].includes(short)) {
                status = 'Live'; statusKey = 'live'; time = 'LIVE';
            } else if (['FT', 'AET', 'PEN'].includes(short)) {
                status = 'Finished'; statusKey = 'finished'; time = 'FT';
            } else {
                const d = new Date(f.date);
                time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            return {
                id: f.id, league: league?.name, leagueLogo: league?.logo, leagueId: league?.id,
                homeTeam: teams?.home?.name, homeLogo: teams?.home?.logo, homeId: teams?.home?.id, homeScore: goals?.home,
                awayTeam: teams?.away?.name, awayLogo: teams?.away?.logo, awayId: teams?.away?.id, awayScore: goals?.away,
                status, statusKey, time, date: new Date(f.date).toLocaleDateString()
            };
        },
        fixtureToNews: (fixture, lang) => {
            const m = FootballAPI.transformFixture(fixture);
            if (!m || m.homeScore === null) return null;
            let category = lang === 'ar' ? 'نتائج' : 'Results';
            return { category, title: `${m.homeTeam} vs ${m.awayTeam}`, description: `Ended ${m.homeScore}-${m.awayScore}`, date: m.date, icon: '⚽', type: 'results' };
        },
        showLoading: (container) => {
            if (container) container.innerHTML = '<div class="api-loading"><div class="loading-spinner"></div><p>Loading...</p></div>';
        },
        showError: (container, lang) => {
            if (container) container.innerHTML = `<div class="api-error-toast"><p>${lang === 'ar' ? 'خطأ في التحميل' : 'Load Error'}</p></div>`;
        },
        todayDate, yesterdayDate, tomorrowDate
    };
})();
