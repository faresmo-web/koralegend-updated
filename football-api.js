// ============================================================
// Football API Service Layer — Multi-Provider Support
// ============================================================

const FootballAPI = (() => {
    const PRIMARY_API = {
        name: 'API-Football',
        baseUrl: 'https://v3.football.api-sports.io',
        key: '9fccff2cb2df2727ab9424e52546cffb', // Restoring original API-Sports key
        header: 'x-apisports-key'
    };

    const SECONDARY_API = {
        name: 'Football-Data.org',
        baseUrl: 'https://api.football-data.org/v4',
        key: '6219455164e8e1a1c176cc8fe3dc2a90', // User's key for Football-Data
        header: 'X-Auth-Token'
    };

    const TSDB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    const TSDB_LEAGUE_IDS = {
        39: 4328, 140: 4335, 307: 4668, 2: 4480, 233: 4829
    };

    const ALLOWED_LEAGUES = [39, 140, 307, 2, 233, 12, 6];
    const FBD_LEAGUE_CODES = {
        39: 'PL', 140: 'PD', 2: 'CL'
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

    /**
     * core fetcher — returns RAW JSON or fallback object
     */
    async function baseFetch(url, headers = {}, providerName = 'primary') {
        const cacheKey = btoa(url.substring(0, 240)); 
        const cached = cacheGet(cacheKey);
        if (cached) return cached;

        try {
            const res = await fetch(url, { method: 'GET', headers });
            
            if (res.status === 429 || res.status === 403 || res.status === 401) {
                console.warn(`${providerName} error ${res.status}.`);
                return { _fallback: true, status: res.status };
            }

            if (!res.ok) throw new Error(`API returned ${res.status}`);
            const json = await res.json();
            
            // API-Sports error check
            if (json.errors && Object.keys(json.errors).length > 0 && url.includes('api-sports')) {
                const errStr = JSON.stringify(json.errors).toLowerCase();
                if (errStr.includes('limit') || errStr.includes('subscription')) {
                    return { _fallback: true, reason: 'limit' };
                }
            }

            cacheSet(cacheKey, json);
            return json;
        } catch (err) {
            console.error('Fetch error:', err);
            return { _fallback: true, error: err.message };
        }
    }

    /**
     * Tries primary, falls back to secondary if primary indicates _fallback
     */
    async function smartFetch(options) {
        const { primary, secondary } = options;

        if (activeProvider === 'primary') {
            const qs = new URLSearchParams(primary.params).toString();
            const url = `${PRIMARY_API.baseUrl}/${primary.endpoint}?${qs}`;
            const result = await baseFetch(url, { [PRIMARY_API.header]: PRIMARY_API.key }, 'primary');
            
            if (result && !result._fallback) return result;

            if (SECONDARY_API.key) {
                console.log('API-Football limit reached. Switching provider...');
                activeProvider = 'secondary';
            } else {
                return result; // return the error/fallback object
            }
        }

        if (activeProvider === 'secondary' && secondary) {
            const qs = new URLSearchParams(secondary.params).toString();
            const url = `${SECONDARY_API.baseUrl}/${secondary.endpoint}?${qs}`;
            const result = await baseFetch(url, { [SECONDARY_API.header]: SECONDARY_API.key }, 'secondary');
            return result;
        }
        return { _fallback: true };
    }

    // ── Normalization Helpers ────────────────────────────────

    function normalizeFBDMatches(matches) {
        if (!matches || !Array.isArray(matches)) return [];
        return matches.map(m => ({
            fixture: {
                id: m.id, date: m.utcDate,
                timestamp: Math.floor(new Date(m.utcDate).getTime() / 1000),
                status: { short: m.status === 'FINISHED' ? 'FT' : (m.status === 'IN_PLAY' ? 'LIVE' : 'NS') }
            },
            league: { id: null, name: m.competition?.name, logo: m.competition?.emblem },
            teams: {
                home: { name: m.homeTeam.name, logo: m.homeTeam.crest },
                away: { name: m.awayTeam.name, logo: m.awayTeam.crest }
            },
            goals: { home: m.score?.fullTime?.home, away: m.score?.fullTime?.away }
        }));
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
        const year = new Date().getMonth() < 6 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];

        const result = await smartFetch({
            primary: { endpoint: 'standings', params: { league: leagueId, season: year } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/standings`, params: { season: year } } : null
        });

        // 1. Primary Success
        if (result?.response) return result.response;

        // 2. Secondary Success
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
        const year = new Date().getMonth() < 6 ? new Date().getFullYear() - 1 : new Date().getFullYear();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];

        const result = await smartFetch({
            primary: { endpoint: 'players/topscorers', params: { league: leagueId, season: year } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/scorers`, params: { season: year } } : null
        });

        if (result?.response) return result.response;
        if (result?.scorers) {
            return result.scorers.map(s => ({
                player: { name: s.player.name, photo: s.player.photo },
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

    return {
        fetchTodayFixtures: () => fetchFixturesByDate(todayDate()),
        fetchYesterdayFixtures: () => fetchFixturesByDate(yesterdayDate()),
        fetchTomorrowFixtures: () => fetchFixturesByDate(tomorrowDate()),
        fetchLiveFixtures,
        fetchFixturesByDate,
        fetchStandings,
        fetchTopScorers,
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
                homeTeam: teams?.home?.name, homeLogo: teams?.home?.logo, homeScore: goals?.home,
                awayTeam: teams?.away?.name, awayLogo: teams?.away?.logo, awayScore: goals?.away,
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
