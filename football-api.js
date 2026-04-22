// ============================================================
// Football API Service Layer — Multi-Provider Support
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
        return new Date().getMonth() < 6 ? new Date().getFullYear() - 1 : new Date().getFullYear();
    }

    function cacheGet(key) {
        try {
            const raw = localStorage.getItem('fapi_' + key);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed.ts) {
                if (Date.now() - parsed.ts > TTL_FIXTURES) {
                    localStorage.removeItem('fapi_' + key);
                    return null;
                }
                return parsed.data;
            }
            if (Date.now() > parsed.expiresAt) {
                localStorage.removeItem('fapi_' + key);
                return null;
            }
            return parsed.data;
        } catch { return null; }
    }

    function cacheSet(key, data, ttl) {
        try { 
            const expiresAt = Date.now() + (ttl || TTL_FIXTURES);
            localStorage.setItem('fapi_' + key, JSON.stringify({ data, expiresAt })); 
        } catch {}
    }

    function isLimitReached(provider) {
        try {
            const resetTime = localStorage.getItem('fapi_limit_' + provider);
            if (resetTime && Date.now() < parseInt(resetTime)) return true;
            if (resetTime) localStorage.removeItem('fapi_limit_' + provider);
        } catch {}
        return false;
    }

    /**
     * --- API KEY ROTATION HELPERS ---
     */
    function getCurrentKey(keys) {
        if (!keys || !Array.isArray(keys)) return null;
        // Find the first key in the pool that hasn't hit its limit today
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const limitReset = localStorage.getItem('fapi_limit_key_' + key);
            if (!limitReset || Date.now() > parseInt(limitReset)) {
                return { key, index: i };
            }
        }
        return null; // All keys exhausted
    }

    function setKeyLimitReached(key) {
        try {
            // Block this specific key until Midnight UTC
            const now = new Date();
            const tomorrowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0);
            localStorage.setItem('fapi_limit_key_' + key, tomorrowUTC.toString());
            console.warn(`[API] Key ${key.substring(0, 6)}... reached limit. Key blocked until reset.`);
        } catch {}
    }

    async function baseFetch(url, headers = {}, providerName = 'primary', ttl = null, currentKey = null) {
        if (providerName === 'primary' && PRIMARY_API.name === 'API-Football' && !currentKey) {
            console.warn(`[API] No active API-Football Keys available in the pool!`);
            return { _fallback: true, reason: 'no-keys-available' };
        }
        
        if (providerName !== 'primary' && isLimitReached(providerName)) {
            console.warn(`[API] ${providerName} is currently blocked due to limits.`);
            return { _fallback: true, reason: 'rate-limit-blocked', provider: providerName };
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
            console.error(`[API] Fetch error for ${providerName}:`, err);
            return { _fallback: true, error: err.message, provider: providerName };
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

    // ── Public API ───────────────────────────────────────────

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
            primary: { endpoint: 'livescores', params: {} },
            secondary: { endpoint: 'matches', params: { status: 'LIVE' } },
            tertiary: { endpoint: 'fixtures', params: { live: 'all' } },
            ttl: TTL_LIVE
        });
        if (result?.data && PRIMARY_API.name === 'iSportsAPI') return normalizeISportsMatches(result.data);
        if (result?.matches) return normalizeFBDMatches(result.matches);
        if (result?.response) return result.response;
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
            secondary: null,
            ttl: TTL_STANDINGS
        });
        if (result?.response) return result.response;
        return [];
    }

    async function fetchTournamentBracket(leagueId) {
        const year = getCurrentSeason();
        const fbdCode = FBD_LEAGUE_CODES[leagueId];
        
        const result = await smartFetch({
            primary: { endpoint: 'fixtures', params: { league: leagueId, season: year } },
            secondary: fbdCode ? { endpoint: `competitions/${fbdCode}/matches`, params: { season: year } } : null,
            ttl: TTL_STANDINGS
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
        fetchCountries,
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
