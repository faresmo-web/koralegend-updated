// ============================================================
// Football API Service Layer — Multi-Provider Support
// ============================================================

const FootballAPI = (() => {
    const PRIMARY_API = {
        name: 'API-Football',
        baseUrl: 'https://v3.football.api-sports.io',
        key: 'fe30776653c535b8d1958319c5d5a439', 
        header: 'x-apisports-key'
    };

    const SECONDARY_API = {
        name: 'Football-Data.org',
        baseUrl: 'https://api.football-data.org/v4',
        key: '90087ba1f5914a60b85555f80bfb2d72',
        header: 'X-Auth-Token'
    };

    const TSDB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    const TSDB_LEAGUE_IDS = {
        39: 4328, 140: 4335, 307: 4668, 2: 4480, 233: 4829
    };

    const ALLOWED_LEAGUES = [39, 140, 307, 2, 233, 12, 6, 61, 135, 78];
    const FBD_LEAGUE_CODES = {
        39: 'PL', 140: 'PD', 2: 'CL', 61: 'FL1', 135: 'SA', 78: 'BL1'
    };

    const FBD_ID_MAP = {
        2021: 39,  // Premier League
        2014: 140, // La Liga
        2001: 2,   // Champions League
        2015: 61,  // Ligue 1
        2019: 135, // Serie A
        2002: 78   // Bundesliga
    };

    const TSDB_NAME_TO_ID = {
        'English Premier League': 39,
        'Spanish La Liga': 140,
        'Saudi Arabian Pro League': 307,
        'UEFA Champions League': 2,
        'Egyptian Premier League': 233,
        'African Nations Cup': 6,
        'CAF Champions League': 12
    };

    let activeProvider = 'primary';

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
        return new Date().getMonth() < 6 ? new Date().getFullYear() - 1 : new Date().getFullYear();
    }

    function cacheGet(key) {
        try {
            const raw = localStorage.getItem('fapi_' + key);
            if (!raw) return null;
            const { data, ts } = JSON.parse(raw);
            if (Date.now() - ts > CACHE_TTL) {
                localStorage.removeItem('fapi_' + key);
                return null;
            }
            return data;
        } catch { return null; }
    }

    function cacheSet(key, data) {
        try { localStorage.setItem('fapi_' + key, JSON.stringify({ data, ts: Date.now() })); } catch {}
    }

    async function baseFetch(url, headers = {}, providerName = 'primary') {
        // Apply CORS Proxy for Football-Data.org (always in dev or if CORS suspected)
        let finalUrl = url;
        const isFBD = url.includes('api.football-data.org');
        
        if (isFBD) {
            finalUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
            console.log(`[API] Proxying ${providerName} request:`, url);
        }

        const cacheKey = btoa(url.substring(0, 240)); 
        const cached = cacheGet(cacheKey);
        
        // Only return from cache if it's NOT a fallback/error object
        if (cached && !cached._fallback) return cached;

        try {
            const res = await fetch(finalUrl, { method: 'GET', headers });
            
            if (res.status === 429 || res.status === 403 || res.status === 401) {
                console.warn(`[API] ${providerName} error ${res.status}:`, url);
                return { _fallback: true, status: res.status, provider: providerName };
            }

            if (!res.ok) throw new Error(`API returned ${res.status}`);
            const json = await res.json();
            
            // API-Sports error check (covers limit, subscription, and account suspension)
            if (json.errors && Object.keys(json.errors).length > 0 && url.includes('api-sports')) {
                const errStr = JSON.stringify(json.errors).toLowerCase();
                console.warn(`[API] API-Sports internal error:`, json.errors);
                
                if (errStr.includes('suspended') || errStr.includes('limit') || errStr.includes('access')) {
                    return { _fallback: true, reason: 'api-sports-blocked', details: json.errors };
                }
            }

            // Successfully fetched data
            cacheSet(cacheKey, json);
            return json;
        } catch (err) {
            console.error(`[API] Fetch error for ${providerName}:`, err);
            return { _fallback: true, error: err.message, provider: providerName };
        }
    }

    /**
     * Tries primary, falls back to secondary if primary indicates _fallback
     */
    async function smartFetch(options) {
        const { primary, secondary } = options;
        let result = null;

        // 1. Try Primary
        if (primary && PRIMARY_API.key) {
            const qs = new URLSearchParams(primary.params).toString();
            const url = `${PRIMARY_API.baseUrl}/${primary.endpoint}?${qs}`;
            result = await baseFetch(url, { [PRIMARY_API.header]: PRIMARY_API.key }, 'primary');
            if (result && !result._fallback) return result;
        }

        // 2. Try Secondary (immediately if primary fails or is skipped)
        if (secondary && SECONDARY_API.key) {
            const qs = new URLSearchParams(secondary.params).toString();
            const url = `${SECONDARY_API.baseUrl}/${secondary.endpoint}?${qs}`;
            result = await baseFetch(url, { [SECONDARY_API.header]: SECONDARY_API.key }, 'secondary');
            if (result && !result._fallback) return result;
        }

        return result || { _fallback: true };
    }

    // ── Normalization Helpers ────────────────────────────────

    function normalizeFBDMatches(matches) {
        if (!matches || !Array.isArray(matches)) return [];
        return matches.map(m => {
            const leagueId = FBD_ID_MAP[m.competition.id] || m.competition.id;
            return {
                fixture: {
                    id: m.id, date: m.utcDate, timestamp: Math.floor(new Date(m.utcDate).getTime() / 1000),
                    status: { short: m.status === 'FINISHED' ? 'FT' : (m.status === 'IN_PLAY' ? 'LIVE' : 'NS') }
                },
                league: { id: leagueId, name: m.competition.name },
                teams: {
                    home: { name: m.homeTeam.shortName || m.homeTeam.name, logo: m.homeTeam.crest },
                    away: { name: m.awayTeam.shortName || m.awayTeam.name, logo: m.awayTeam.crest }
                },
                goals: { home: m.score?.fullTime?.home, away: m.score?.fullTime?.away }
            };
        });
    }

    function normalizeTSDBMatches(events) {
        if (!events || !Array.isArray(events)) return [];
        return events.map(e => ({
            fixture: {
                id: e.idEvent, date: e.strTimestamp || `${e.dateEvent}T${e.strTime}`,
                timestamp: e.strTimestamp ? Math.floor(new Date(e.strTimestamp).getTime() / 1000) : null,
                status: { short: e.strStatus === 'Match Finished' ? 'FT' : 'NS' }
            },
            league: { id: TSDB_NAME_TO_ID[e.strLeague] || null, name: e.strLeague },
            teams: {
                home: { name: e.strHomeTeam, logo: e.strHomeTeamBadge },
                away: { name: e.strAwayTeam, logo: e.strAwayTeamBadge }
            },
            goals: { home: parseInt(e.intHomeScore), away: parseInt(e.intAwayScore) }
        }));
    }

    // ── Public API ───────────────────────────────────────────

    async function fetchFixturesByDate(dateStr) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures', params: { date: dateStr } },
            secondary: { endpoint: 'matches', params: { dateFrom: dateStr, dateTo: dateStr } }
        });
        if (result?.response) return result.response;
        if (result?.matches) return normalizeFBDMatches(result.matches);
        
        // TSDB Fallback
        const url = `${TSDB_BASE_URL}/eventsday.php?d=${dateStr}`;
        const tsdb = await baseFetch(url);
        if (tsdb?.events) return normalizeTSDBMatches(tsdb.events);

        return [];
    }

    async function fetchLiveFixtures() {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures', params: { live: 'all' } },
            secondary: { endpoint: 'matches', params: { status: 'LIVE' } }
        });
        if (result?.response) return result.response;
        if (result?.matches) return normalizeFBDMatches(result.matches);
        return [];
    }

    async function fetchStandings(leagueId) {
        const year = getCurrentSeason();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];

        const result = await smartFetch({
            primary: { endpoint: 'standings', params: { league: leagueId, season: year } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/standings`, params: { season: year } } : null
        });

        // 1. Success from API-Sports (now primary)
        if (result?.response) return result.response;

        // 2. Success from Football-Data (now secondary)
        if (result?.standings) {
            const table = result.standings.find(s => s.type === 'TOTAL')?.table;
            if (table) {
                return [{
                    league: { id: leagueId, season: year, standings: [table.map(t => ({
                        rank: t.position,
                        team: { name: t.team.name, logo: t.team.crest },
                        all: { played: t.playedGames, win: t.won, draw: t.draw, lose: t.lost },
                        points: t.points, goalsDiff: t.goalDifference
                    }))] }
                }];
            }
        }

        // 3. Last Resort: TSDB
        const tsdbId = TSDB_LEAGUE_IDS[leagueId];
        if (tsdbId) {
            const s = `${year}-${year+1}`;
            const url = `${TSDB_BASE_URL}/lookuptable.php?l=${tsdbId}&s=${s}`;
            const tsdb = await baseFetch(url);
            if (tsdb?.table) {
                return [{
                    league: { id: leagueId, season: year, standings: [tsdb.table.map(t => ({
                        rank: parseInt(t.intRank), team: { name: t.strTeam, logo: t.strBadge },
                        all: { played: parseInt(t.intPlayed), win: parseInt(t.intWin), draw: parseInt(t.intDraw), lose: parseInt(t.intLoss) },
                        points: parseInt(t.intPoints), goalsDiff: parseInt(t.intGoalDifference)
                    }))] }
                }];
            }
        }
        return [];
    }

    async function fetchTopScorers(leagueId) {
        const year = getCurrentSeason();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];

        const result = await smartFetch({
            primary: { endpoint: 'players/topscorers', params: { league: leagueId, season: year } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/scorers`, params: { season: year } } : null
        });

        // 1. Success from API-Sports (now primary)
        if (result?.response) return result.response;

        // 2. Success from Football-Data (now secondary)
        if (result?.scorers) {
            return result.scorers.map(s => ({
                player: { name: s.player.name, photo: null },
                statistics: [{ team: { name: s.team.name, logo: s.team.crest }, goals: { total: s.goals } }]
            }));
        }

        // TSDB Fallback for scorers
        const tsdbId = TSDB_LEAGUE_IDS[leagueId];
        if (tsdbId) {
            // TSDB doesn't have a direct "top scorers" endpoint for all leagues in free version, 
            // but we can try to look at players in teams or general sports data.
            // For now, we return empty if primary/secondary fail as TSDB scorers is high-tier or limited.
        }

        return [];
    }

    // ── Match Detail Endpoints ──────────────────────────────
    async function fetchFixtureLineups(fixtureId) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures/lineups', params: { fixture: fixtureId } },
            secondary: null
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchFixtureEvents(fixtureId) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures/events', params: { fixture: fixtureId } },
            secondary: null
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchFixtureStatistics(fixtureId) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures/statistics', params: { fixture: fixtureId } },
            secondary: null
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchPlayerStats(playerId, season) {
        const result = await smartFetch({
            primary: { endpoint: 'players', params: { id: playerId, season: season } },
            secondary: null
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchPlayerById(playerId) {
        const year = getCurrentSeason();
        let stats = await fetchPlayerStats(playerId, year);
        if (!stats || stats.length === 0) {
            // Fallback to previous season if current is empty
            stats = await fetchPlayerStats(playerId, year - 1);
        }
        return stats;
    }

    async function searchPlayerByName(name, teamId = null) {
        if (!name || name.length < 4) return [];
        const params = { search: name };
        if (teamId) params.team = teamId;
        const result = await smartFetch({
            primary: { endpoint: 'players', params },
            secondary: null
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchTournamentBracket(leagueId) {
        const year = getCurrentSeason();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];
        
        const result = await smartFetch({
            primary: { endpoint: 'fixtures', params: { league: leagueId, season: year } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/matches`, params: { season: year } } : null
        });

        const allowedRounds = ['Quarter-finals', 'Semi-finals', 'Final'];
        let fixtures = [];

        if (result?.response) {
            fixtures = result.response.filter(f => {
                const roundName = f.league.round || '';
                return allowedRounds.some(r => roundName.includes(r));
            });
            return {
                source: 'api-sports',
                fixtures: fixtures
            };
        }
        
        if (result?.matches) {
            fixtures = result.matches.filter(m => ['QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'].includes(m.stage));
            return {
                source: 'football-data',
                fixtures: fixtures
            };
        }

        return { source: 'none', fixtures: [] };
    }

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
        fetchPlayerStats,
        fetchPlayerById,
        searchPlayerByName,
        ALLOWED_LEAGUES,
        filterByAllowedLeagues: (fixts) => Array.isArray(fixts) ? fixts.filter(f => ALLOWED_LEAGUES.includes(f?.league?.id)) : [],
        transformFixture: (fixture) => {
            if (!fixture || !fixture.fixture) return null;
            const f = fixture.fixture;
            const teams = fixture.teams;
            const goals = fixture.goals;
            const league = fixture.league;
            const short = f.status?.short || '';
            let status = 'Upcoming', statusKey = 'upcoming', time = '';
            
            if (['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(short)) {
                status = 'Live'; statusKey = 'live'; time = f.status?.elapsed ? `${f.status.elapsed}'` : 'LIVE';
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
