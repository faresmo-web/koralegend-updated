// ============================================================
// Football API Service Layer — API-Sports v3
// ============================================================

const FootballAPI = (() => {
    const BASE_URL = 'https://v3.football.api-sports.io';
    const API_KEY = '9fccff2cb2df2727ab9424e52546cffb';
    const TSDB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    // TheSportsDB League IDs
    const TSDB_LEAGUE_IDS = {
        39: 4328,   // Premier League
        140: 4335,  // La Liga
        307: 4668,  // Saudi Pro League
        2: 4480,    // UEFA Champions League
        233: 4829   // Egyptian Premier League
    };

    // Allowed league IDs — only these leagues will be displayed
    const ALLOWED_LEAGUES = [
        39,   // Premier League (England)
        140,  // La Liga (Spain)
        307,  // Saudi Pro League
        2,    // UEFA Champions League
        233,  // Egyptian Premier League
        12,   // CAF Champions League (Africa clubs)
        6     // Africa Cup of Nations (national teams)
    ];

    /**
     * Filter API fixtures array to only include allowed leagues.
     */
    function filterByAllowedLeagues(fixtures) {
        if (!fixtures || !Array.isArray(fixtures)) return [];
        return fixtures.filter(f => ALLOWED_LEAGUES.includes(f.league?.id));
    }

    // ── Helpers ──────────────────────────────────────────────

    function todayDate() {
        return new Date().toISOString().slice(0, 10);
    }

    function yesterdayDate() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().slice(0, 10);
    }

    function tomorrowDate() {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().slice(0, 10);
    }

    // ── Cache ────────────────────────────────────────────────

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
        try {
            localStorage.setItem('fapi_' + key, JSON.stringify({ data, ts: Date.now() }));
        } catch { /* quota exceeded — ignore */ }
    }

    // ── Core Fetch ───────────────────────────────────────────

    async function apiFetch(endpoint, params = {}) {
        const qs = new URLSearchParams(params).toString();
        const url = `${BASE_URL}/${endpoint}?${qs}`;
        return await baseFetch(url, { 'x-apisports-key': API_KEY });
    }

    async function tsdbFetch(endpoint, params = {}) {
        const qs = new URLSearchParams(params).toString();
        const url = `${TSDB_BASE_URL}/${endpoint}?${qs}`;
        return await baseFetch(url);
    }

    async function baseFetch(url, headers = {}) {
        // Use full URL as cache key to avoid collisions
        const cacheKey = btoa(url);
        const cached = cacheGet(cacheKey);
        if (cached) return cached;

        try {
            const res = await fetch(url, { method: 'GET', headers });
            if (!res.ok) throw new Error(`API ${res.status}`);
            const json = await res.json();
            
            // API-Sports specific error check
            if (json.errors && Object.keys(json.errors).length > 0 && url.includes('api-sports')) {
                console.warn('API-Sports errors:', json.errors);
                throw new Error('API returned errors');
            }

            const result = json.response || json.table || json; 
            cacheSet(cacheKey, result);
            return result;
        } catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    }

    // ── Public Methods ───────────────────────────────────────

    /**
     * Fetch fixtures for a given date string (YYYY-MM-DD).
     * Returns array of fixture objects or null on error.
     */
    async function fetchFixturesByDate(dateStr) {
        return await apiFetch('fixtures', { date: dateStr });
    }

    /** Fetch today's fixtures */
    async function fetchTodayFixtures() {
        return await fetchFixturesByDate(todayDate());
    }

    /** Fetch yesterday's fixtures */
    async function fetchYesterdayFixtures() {
        return await fetchFixturesByDate(yesterdayDate());
    }

    /** Fetch tomorrow's fixtures */
    async function fetchTomorrowFixtures() {
        return await fetchFixturesByDate(tomorrowDate());
    }

    /** Fetch live fixtures */
    async function fetchLiveFixtures() {
        return await apiFetch('fixtures', { live: 'all' });
    }

    /** Fetch recent transfers (latest 20) */
    async function fetchTransfers() {
        // We get transfers for some popular teams
        const teams = [33, 34, 40, 42, 47, 49, 50, 529, 530, 541]; // top PL/La Liga teams
        const randomTeam = teams[Math.floor(Math.random() * teams.length)];
        return await apiFetch('transfers', { team: randomTeam });
    }

    /**
     * Calculate current football season year.
     * E.g., in March 2026, we are in the 2025/26 season (year 2025).
     * In August 2026, we start the 2026/27 season (year 2026).
     */
    function getCurrentSeasonYear() {
        const now = new Date();
        const month = now.getMonth(); // 0-indexed
        return month < 6 ? now.getFullYear() - 1 : now.getFullYear();
    }

    /** Fetch standings for a league */
    async function fetchStandings(leagueId) {
        const tsdbId = TSDB_LEAGUE_IDS[leagueId];
        const year = getCurrentSeasonYear();
        
        if (tsdbId) {
            const seasonStr = `${year}-${year + 1}`;
            console.log(`Fetching standings from TheSportsDB for league ${tsdbId}, season ${seasonStr}`);
            let data = await tsdbFetch('lookuptable.php', { l: tsdbId, s: seasonStr });
            
            // TSDB Fallback to previous season if requested one is empty
            if (!data || !Array.isArray(data) || data.length === 0) {
                const prevSeason = `${year - 1}-${year}`;
                console.log(`TSDB fallback to season ${prevSeason}`);
                data = await tsdbFetch('lookuptable.php', { l: tsdbId, s: prevSeason });
            }

            if (data && Array.isArray(data)) {
                // Transform TSDB format to a normalized format
                return [{
                    league: { id: leagueId, season: year, standings: [data.map(t => ({
                        rank: parseInt(t.intRank),
                        team: { name: t.strTeam, logo: t.strBadge || 'https://www.thesportsdb.com/images/media/team/badge/placeholder.png' },
                        all: { played: parseInt(t.intPlayed), win: parseInt(t.intWin), draw: parseInt(t.intDraw), lose: parseInt(t.intLoss) },
                        points: parseInt(t.intPoints),
                        group: t.strGroup
                    }))] }
                }];
            }
        }

        // Fallback to API-Sports if TSDB fails or isn't supported for this league
        let data = await apiFetch('standings', { league: leagueId, season: year });
        if (!data || data.length === 0) {
            console.log(`API-Sports fallback to season ${year - 1} for standings...`);
            data = await apiFetch('standings', { league: leagueId, season: year - 1 });
        }
        return data;
    }

    /** Fetch top scorers for a league */
    async function fetchTopScorers(leagueId) {
        const year = getCurrentSeasonYear();
        let data = await apiFetch('players/topscorers', { league: leagueId, season: year });
        if (!data || data.length === 0) {
            console.log(`Falling back to previous season for scorers...`);
            data = await apiFetch('players/topscorers', { league: leagueId, season: year - 1 });
        }
        return data;
    }

    // ── Data Transformers ────────────────────────────────────

    /**
     * Transform API fixture to our match card format.
     */
    function transformFixture(fixture) {
        const f = fixture.fixture;
        const teams = fixture.teams;
        const goals = fixture.goals;
        const league = fixture.league;

        // Determine status
        let status, statusKey, time;
        const shortStatus = f.status?.short || '';

        if (['1H', '2H', 'HT', 'ET', 'P', 'BT', 'LIVE'].includes(shortStatus)) {
            status = 'Live';
            statusKey = 'live';
            time = f.status?.elapsed ? `${f.status.elapsed}'` : 'LIVE';
        } else if (['FT', 'AET', 'PEN'].includes(shortStatus)) {
            status = 'Finished';
            statusKey = 'finished';
            time = 'FT';
        } else {
            // Not started / scheduled
            status = 'Upcoming';
            statusKey = 'upcoming';
            const matchDate = new Date(f.date);
            time = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        return {
            id: f.id,
            league: league.name || '',
            leagueLogo: league.logo || '',
            leagueId: league.id,
            homeTeam: teams.home.name,
            homeLogo: teams.home.logo,
            homeScore: goals.home ?? null,
            awayTeam: teams.away.name,
            awayLogo: teams.away.logo,
            awayScore: goals.away ?? null,
            status,
            statusKey,
            time,
            date: new Date(f.date).toLocaleDateString(),
            timestamp: f.timestamp
        };
    }

    /**
     * Generate news item from a finished fixture.
     */
    function fixtureToNews(fixture, lang) {
        const m = transformFixture(fixture);
        if (m.homeScore === null) return null;

        const totalGoals = m.homeScore + m.awayScore;
        let icon = '⚽';
        let category, title, description;

        if (lang === 'ar') {
            category = 'نتائج';
            if (m.homeScore === m.awayScore) {
                title = `تعادل مثير بين ${m.homeTeam} و ${m.awayTeam}`;
                description = `انتهت المباراة بالتعادل ${m.homeScore}-${m.awayScore} في ${m.league}.`;
            } else {
                const winner = m.homeScore > m.awayScore ? m.homeTeam : m.awayTeam;
                const loser = m.homeScore > m.awayScore ? m.awayTeam : m.homeTeam;
                title = `${winner} يتغلب على ${loser}`;
                description = `فاز ${winner} بنتيجة ${m.homeScore}-${m.awayScore} في مباراة ضمن ${m.league}.`;
            }
            if (totalGoals >= 5) { icon = '🔥'; category = 'مباراة مثيرة'; }
        } else {
            category = 'Results';
            if (m.homeScore === m.awayScore) {
                title = `Thrilling Draw: ${m.homeTeam} vs ${m.awayTeam}`;
                description = `The match ended ${m.homeScore}-${m.awayScore} in ${m.league}.`;
            } else {
                const winner = m.homeScore > m.awayScore ? m.homeTeam : m.awayTeam;
                const loser = m.homeScore > m.awayScore ? m.awayTeam : m.homeTeam;
                title = `${winner} Defeats ${loser}`;
                description = `${winner} won ${m.homeScore}-${m.awayScore} in a ${m.league} clash.`;
            }
            if (totalGoals >= 5) { icon = '🔥'; category = 'Thriller'; }
        }

        return {
            category,
            title,
            description,
            date: m.date,
            icon,
            type: 'results',
            leagueId: m.leagueId,
            homeLogo: m.homeLogo,
            awayLogo: m.awayLogo
        };
    }

    /**
     * Generate news from transfer data.
     */
    function transferToNews(transfer, lang) {
        const t = transfer.transfers?.[0];
        if (!t) return null;
        const playerName = transfer.player?.name || 'Unknown';
        const teamIn = t.teams?.in?.name || '';
        const teamOut = t.teams?.out?.name || '';

        if (lang === 'ar') {
            return {
                category: 'انتقالات',
                title: `${playerName} ينتقل إلى ${teamIn}`,
                description: `${playerName} ينتقل من ${teamOut} إلى ${teamIn}.`,
                date: t.date || '',
                icon: '💰',
                type: 'transfers'
            };
        } else {
            return {
                category: 'Transfer',
                title: `${playerName} Joins ${teamIn}`,
                description: `${playerName} moves from ${teamOut} to ${teamIn}.`,
                date: t.date || '',
                icon: '💰',
                type: 'transfers'
            };
        }
    }

    // ── Loading / Error UI Helpers ───────────────────────────

    function showLoading(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="api-loading">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading...</p>
            </div>
        `;
    }

    function showError(container, lang) {
        if (!container) return;
        const msg = lang === 'ar' ? 'حدث خطأ في تحميل البيانات' : 'Failed to load data';
        container.innerHTML = `
            <div class="api-error-toast">
                <span>⚠️</span>
                <p>${msg}</p>
            </div>
        `;
    }

    // ── Date Helpers (exposed) ───────────────────────────────

    return {
        ALLOWED_LEAGUES,
        filterByAllowedLeagues,
        fetchTodayFixtures,
        fetchYesterdayFixtures,
        fetchTomorrowFixtures,
        fetchLiveFixtures,
        fetchFixturesByDate,
        fetchTransfers,
        fetchStandings,
        fetchTopScorers,
        transformFixture,
        fixtureToNews,
        transferToNews,
        showLoading,
        showError,
        todayDate,
        yesterdayDate,
        tomorrowDate
    };
})();
