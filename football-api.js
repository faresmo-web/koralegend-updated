// ============================================================
// Football API Service Layer — Football-Data.org Integration
// ============================================================

const FootballAPI = (() => {
    const PRIMARY_API = {
        name: 'iSportsAPI',
        baseUrl: 'http://api.isportsapi.com/sport/football',
        key: 'qb8xMQa4PsMojRK5',
        param: 'api_key',
        proxies: [
            'https://corsproxy.io/?url=',
            'https://api.allorigins.win/raw?url=',
            'https://proxy.cors.sh/',
            'https://thingproxy.freeboard.io/fetch/'
        ],
        currentProxyIndex: 0
    };

    const SECONDARY_API = {
        name: 'Football-Data.org',
        baseUrl: 'https://api.football-data.org/v4',
        key: '07245a5da7754673b21dcc575d373dc4', // New Key Provided
        header: 'X-Auth-Token',
        // --- Multi-Proxy Support for FBD ---
        proxies: [
            'https://corsproxy.io/?url=',
            'https://api.allorigins.win/raw?url=',
            'https://thingproxy.freeboard.io/fetch/'
        ],
        currentProxyIndex: 0
    };

    const TERTIARY_API = {
        name: 'API-Football',
        baseUrl: 'https://v3.football.api-sports.io',
        // --- API KEY POOLING (Fallback) ---
        keys: [
            'fe30776653c535b8d1958319c5d5a439', // Key 1
        ], 
        header: 'x-apisports-key',
        proxies: [
            'https://corsproxy.io/?url=',
            'https://api.allorigins.win/raw?url=',
            'https://thingproxy.freeboard.io/fetch/'
        ],
        currentProxyIndex: 0
    };

    function setLimitReached(provider) {
        try {
            const now = new Date();
            const tomorrowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0);
            localStorage.setItem('fapi_limit_' + provider, tomorrowUTC.toString());
            window.dispatchEvent(new CustomEvent('fapi_limit_reached', { detail: { provider } }));
        } catch {}
    }

    const TSDB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
    
    // --- Optimized TTL (Time To Live) to save requests ---
    const TTL_LIVE = 1 * 60 * 1000;       // 1 minute (Live matches)
    const TTL_FIXTURES = 4 * 60 * 60 * 1000;  // 4 hours (Today/Tomorrow schedule)
    const TTL_STANDINGS = 24 * 60 * 60 * 1000; // 24 hours (Leagues/Standings)

    const TSDB_LEAGUE_IDS = {
        39: 4328, 140: 4335, 307: 4668, 2: 4480, 233: 4829
    };

    const ALLOWED_LEAGUES = [39, 140, 307, 2, 233, 12, 6];
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

        // Apply CORS Proxy for all providers except TSDB (which usually allows CORS or is used as last resort)
        let finalUrl = url;
        const isTSDB = url.includes('thesportsdb.com');
        
        if (!isTSDB) {
            // iSportsAPI might be strict about parameters, so we can skip cache buster for it if needed
            const isiSports = url.includes('isportsapi.com');
            const cacheBuster = (url.includes('?') ? '&' : '?') + `_t=${Date.now()}`;
            const urlWithBuster = isiSports ? url : (url + cacheBuster);
            
            // Use proxies from the corresponding provider config
            let providerConfig = null;
            if (providerName === 'primary') providerConfig = PRIMARY_API;
            else if (providerName === 'secondary') providerConfig = SECONDARY_API;
            else if (providerName === 'tertiary') providerConfig = TERTIARY_API;

            if (providerConfig && providerConfig.proxies) {
                const proxyBase = providerConfig.proxies[providerConfig.currentProxyIndex];
                finalUrl = proxyBase + encodeURIComponent(urlWithBuster);
                console.log(`[API] Proxying ${providerName} (${providerConfig.name}) via ${proxyBase}`);
            }
        }

        const cacheKey = btoa(url.substring(0, 240)); 
        const cached = cacheGet(cacheKey);
        
        // Only return from cache if it's NOT a fallback/error object
        if (cached && !cached._fallback) return cached;

        // 1. Prepare Headers (Exclude FBD token if it should be in URL for proxy)
        let finalHeaders = { ...headers };
        const isFBD = url.includes('api.football-data.org');
        if (isFBD) {
            const token = finalHeaders['X-Auth-Token'] || PRIMARY_API.key || SECONDARY_API.key;
            // Move token to URL to avoid CORS preflight header issues
            finalUrl += (finalUrl.includes('?') ? '&' : '?') + `X-Auth-Token=${token}`;
            delete finalHeaders['X-Auth-Token'];
            console.log(`[API] Moved token to URL for ${providerName} to bypass CORS header blocking.`);
        }

        try {
            const res = await fetch(finalUrl, { method: 'GET', headers: finalHeaders });
            
            if (res.status === 429 || res.status >= 500) {
                console.warn(`[API] ${providerName} hit error ${res.status}:`, url);
                // Rotate proxy for next attempt
                let providerConfig = null;
                if (providerName === 'primary') providerConfig = PRIMARY_API;
                else if (providerName === 'secondary') providerConfig = SECONDARY_API;
                else if (providerName === 'tertiary') providerConfig = TERTIARY_API;
                
                if (providerConfig && providerConfig.proxies) {
                    providerConfig.currentProxyIndex = (providerConfig.currentProxyIndex + 1) % providerConfig.proxies.length;
                    console.log(`[API] Rotated proxy for ${providerName} to index ${providerConfig.currentProxyIndex} (${providerConfig.proxies[providerConfig.currentProxyIndex]})`);
                }
                
                if (res.status === 429) setLimitReached(providerName);
                return { _fallback: true, status: res.status, provider: providerName };
            }

            if (res.status === 403 || res.status === 401) {
                console.warn(`[API] ${providerName} error ${res.status}:`, url);
                return { _fallback: true, status: res.status, provider: providerName };
            }

            if (!res.ok) throw new Error(`API returned ${res.status}`);
            const json = await res.json();
            
            // iSports error check (code 2 = Not Purchased)
            if (url.includes('isportsapi.com') && json.code !== 0) {
                console.warn(`[API] iSports returned error code ${json.code}: ${json.message}`);
                return { _fallback: true, reason: 'api-error', code: json.code, message: json.message };
            }

            // API-Sports error check (covers limit, subscription, and account suspension)
            if (json.errors && Object.keys(json.errors).length > 0 && url.includes('api-sports')) {
                const errStr = JSON.stringify(json.errors).toLowerCase();
                console.warn(`[API] API-Sports internal error:`, json.errors);
                
                if (errStr.includes('suspended') || errStr.includes('limit') || errStr.includes('access') || errStr.includes('reached') || errStr.includes('inactive')) {
                    if (currentKey) {
                        setKeyLimitReached(currentKey);
                    } else {
                        setLimitReached(providerName);
                    }
                    return { _fallback: true, reason: 'api-blocked', details: json.errors };
                }
            }

            // Successfully fetched data
            cacheSet(cacheKey, json, ttl);
            return json;
        } catch (err) {
            console.error(`[FootballData] Fetch failed for ${endpoint}:`, err.message);
            return null;
        }
    }

    /**
     * Tries primary, falls back to secondary if primary indicates _fallback
     */
    async function smartFetch(options) {
        const { primary, secondary, tertiary, ttl } = options;
        let result = null;

        // 1. Try PRIMARY_API (iSportsAPI)
        if (primary && PRIMARY_API.name === 'iSportsAPI' && PRIMARY_API.key) {
            const params = { ...primary.params, [PRIMARY_API.param]: PRIMARY_API.key };
            const qs = new URLSearchParams(params).toString();
            const url = `${PRIMARY_API.baseUrl}/${primary.endpoint}${qs ? '?' + qs : ''}`;
            result = await baseFetch(url, {}, 'primary', ttl);
            if (result && !result._fallback && result.code === 0) {
                console.log(`[API] Success from Primary: ${PRIMARY_API.name}`);
                return result;
            }
        }
        
        // 2. Try SECONDARY_API (Football-Data.org)
        if (secondary && SECONDARY_API.name === 'Football-Data.org' && SECONDARY_API.key) {
            const qs = new URLSearchParams(secondary.params || {}).toString();
            const url = `${SECONDARY_API.baseUrl}/${secondary.endpoint}${qs ? '?' + qs : ''}`;
            result = await baseFetch(url, { [SECONDARY_API.header]: SECONDARY_API.key }, 'secondary', ttl);
            
            if (result && !result._fallback) {
                console.log(`[API] Success from Secondary: ${SECONDARY_API.name}`);
                return result;
            }
            
            // If failed (maybe proxy issue or limit), rotate proxy for next time
            if (result && result._fallback) {
                console.warn(`[LiveCenter] Secondary Proxy failed. Rotating...`);
                SECONDARY_API.currentProxyIndex = (SECONDARY_API.currentProxyIndex + 1) % SECONDARY_API.proxies.length;
            }
        }

        // 3. Try TERTIARY_API (API-Football with Pooling Support)
        if (tertiary && TERTIARY_API.name === 'API-Football' && TERTIARY_API.keys.length > 0) {
            // Find the active key for fallback
            const poolInfo = getCurrentKey(TERTIARY_API.keys); 
            if (poolInfo) {
                const { key } = poolInfo;
                const qs = new URLSearchParams(tertiary.params || {}).toString();
                const url = `${TERTIARY_API.baseUrl}/${tertiary.endpoint}${qs ? '?' + qs : ''}`;
                result = await baseFetch(url, { [TERTIARY_API.header]: key }, 'tertiary', ttl, key);
                if (result && !result._fallback) {
                    console.log(`[API] Success from Tertiary: ${TERTIARY_API.name}`);
                    return result;
                }
            }
        }

        console.warn(`[API] All primary/secondary/tertiary providers failed. Falling back to TSDB/Static.`);
        return { _fallback: true };
    }

    // ── Normalization Helpers ────────────────────────────────

    function normalizeFBDMatches(matches) {
        if (!matches || !Array.isArray(matches)) return [];
        return matches.map(m => {
            const leagueId = FBD_ID_MAP[m.competition.id] || m.competition.id;
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

    function normalizeISportsMatches(data) {
        if (!data || !Array.isArray(data)) return [];
        return data.map(m => {
            // iSports matchTime is usually "YYYY-MM-DD HH:mm:ss" in UTC or local
            const date = m.matchTime ? m.matchTime.replace(' ', 'T') : new Date().toISOString();
            return {
                fixture: {
                    id: m.matchId,
                    date: date,
                    timestamp: m.matchTime ? Math.floor(new Date(date).getTime() / 1000) : null,
                    status: { short: m.status === 'FT' ? 'FT' : (m.status === 'Live' ? 'LIVE' : 'NS') }
                },
                league: { id: m.leagueId, name: m.leagueName },
                teams: {
                    home: { name: m.homeName, logo: m.homeIcon || null },
                    away: { name: m.awayName, logo: m.awayIcon || null }
                },
                goals: { home: m.homeScore, away: m.awayScore }
            };
        });
    }

    function normalizeISportsMatches(data) {
        if (!data || !Array.isArray(data)) return [];
        return data.map(m => {
            // iSports matchTime is usually "YYYY-MM-DD HH:mm:ss" in UTC or local
            const date = m.matchTime ? m.matchTime.replace(' ', 'T') : new Date().toISOString();
            return {
                fixture: {
                    id: m.matchId,
                    date: date,
                    timestamp: m.matchTime ? Math.floor(new Date(date).getTime() / 1000) : null,
                    status: { short: m.status === 'FT' ? 'FT' : (m.status === 'Live' ? 'LIVE' : 'NS') }
                },
                league: { id: m.leagueId, name: m.leagueName },
                teams: {
                    home: { name: m.homeName, logo: m.homeIcon || null },
                    away: { name: m.awayName, logo: m.awayIcon || null }
                },
                goals: { home: m.homeScore, away: m.awayScore }
            };
        });
    }

    // ── Public Data Fetchers ─────────────────────────────────
    async function fetchFixturesByDate(dateStr) {
        const result = await smartFetch({
            primary: { endpoint: 'schedule', params: { date: dateStr } },
            secondary: { endpoint: 'matches', params: { dateFrom: dateStr, dateTo: dateStr } },
            tertiary: { endpoint: 'fixtures', params: { date: dateStr } },
            ttl: dateStr === todayDate() ? TTL_FIXTURES : TTL_STANDINGS
        });
        if (result?.data && PRIMARY_API.name === 'iSportsAPI') return normalizeISportsMatches(result.data);
        if (result?.matches) return normalizeFBDMatches(result.matches);
        if (result?.response) return result.response;
        
        // TSDB Fallback
        const url = `${TSDB_BASE_URL}/eventsday.php?d=${dateStr}`;
        const tsdb = await baseFetch(url);
        if (tsdb?.events) return normalizeTSDBMatches(tsdb.events);

        return [];
    }

    async function fetchLiveFixtures() {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures', params: { live: 'all' } },
            secondary: { endpoint: 'matches', params: { status: 'LIVE' } },
            ttl: TTL_LIVE
        });
        if (result?.response) return result.response;
        if (result?.matches) return normalizeFBDMatches(result.matches);
        return [];
    }

    async function fetchStandings(leagueId) {
        const year = getCurrentSeason();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];

        const result = await smartFetch({
            primary: { endpoint: 'standings', params: { leagueId: leagueId } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/standings`, params: { season: year } } : null,
            tertiary: { endpoint: 'standings', params: { league: leagueId, season: year } },
            ttl: TTL_STANDINGS
        });

        // 1. Success from iSportsAPI
        if (result?.data && PRIMARY_API.name === 'iSportsAPI') {
            return [{
                league: { id: leagueId, season: year, standings: [result.data.map(t => ({
                    rank: t.rank || t.position,
                    team: { name: t.teamName || t.name, logo: t.teamIcon || t.logo },
                    all: { played: t.played || t.playedGames, win: t.win || t.won, draw: t.draw, lose: t.loss || t.lost },
                    points: t.points, goalsDiff: t.goalDifference || t.goalDiff
                }))] }
            }];
        }

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

        // 3. Success from API-Sports (now tertiary)
        if (result?.response) return result.response;

        // 4. Last Resort: TSDB
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
            primary: { endpoint: 'topscorers', params: { leagueId: leagueId } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/scorers`, params: { season: year } } : null,
            tertiary: { endpoint: 'players/topscorers', params: { league: leagueId, season: year } },
            ttl: TTL_STANDINGS
        });

        // 1. Success from iSportsAPI
        if (result?.data && PRIMARY_API.name === 'iSportsAPI') {
            return result.data.map(s => ({
                player: { name: s.playerName || s.name, photo: s.playerIcon || s.photo },
                statistics: [{ team: { name: s.teamName || s.team, logo: s.teamIcon || s.logo }, goals: { total: s.goals } }]
            }));
        }

        // 2. Success from Football-Data (now secondary)
        if (result?.scorers) {
            return result.scorers.map(s => ({
                player: { name: s.player.name, photo: null },
                statistics: [{ team: { name: s.team.name, logo: s.team.crest }, goals: { total: s.goals } }]
            }));
        }

        // 3. Success from API-Sports (now tertiary)
        if (result?.response) return result.response;

        // 4. TSDB Fallback for scorers
        const tsdbId = TSDB_LEAGUE_IDS[leagueId];
        if (tsdbId) {
            // TSDB doesn't have a direct "top scorers" endpoint for all leagues in free version, 
            // but we can try to look at players in teams or general sports data.
            // For now, we return empty if primary/secondary fail as TSDB scorers is high-tier or limited.
        }

        return [];
    }

    async function fetchCountries() {
        const result = await smartFetch({
            primary: { endpoint: 'country', params: {} },
            secondary: null,
            tertiary: null,
            ttl: TTL_STANDINGS // Cache for 24 hours
        });
        if (result?.data) return result.data;
        return [];
    }

    // ── Match Detail Endpoints ──────────────────────────────
    async function fetchFixtureLineups(fixtureId) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures/lineups', params: { fixture: fixtureId } },
            secondary: null,
            ttl: TTL_FIXTURES
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchFixtureEvents(fixtureId) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures/events', params: { fixture: fixtureId } },
            secondary: null,
            ttl: TTL_FIXTURES
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchFixtureStatistics(fixtureId) {
        const result = await smartFetch({
            primary: { endpoint: 'fixtures/statistics', params: { fixture: fixtureId } },
            secondary: null,
            ttl: TTL_FIXTURES
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchPlayerStats(playerId, season) {
        const result = await smartFetch({
            primary: { endpoint: 'players', params: { id: playerId, season: season } },
            secondary: null,
            ttl: TTL_STANDINGS
        });
        if (result?.response) return result.response;
        return [];
    }

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
        fetchCountries,
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
