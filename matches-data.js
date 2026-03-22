// ============================================================
// Matches Page — Yallakora-Style Table Rendering
// ============================================================

// Fallback static data
const matchesFallback = {
    en: {
        today: [
            { league: 'Premier League', homeTeam: 'Liverpool', homeId: 40, homeLogo: 'https://media.api-sports.io/football/teams/40.png', homeScore: 3, awayTeam: 'Manchester City', awayId: 50, awayLogo: 'https://media.api-sports.io/football/teams/50.png', awayScore: 1, status: 'Finished', statusKey: 'finished', time: 'FT' },
            { league: 'Premier League', homeTeam: 'Arsenal', homeId: 42, homeLogo: 'https://media.api-sports.io/football/teams/42.png', homeScore: 2, awayTeam: 'Tottenham', awayId: 47, awayLogo: 'https://media.api-sports.io/football/teams/47.png', awayScore: 0, status: 'Live', statusKey: 'live', time: "75'" },
            { league: 'La Liga', homeTeam: 'Real Madrid', homeId: 541, homeLogo: 'https://media.api-sports.io/football/teams/541.png', homeScore: 2, awayTeam: 'Barcelona', awayId: 529, awayLogo: 'https://media.api-sports.io/football/teams/529.png', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' },
            { league: 'Egyptian League', homeTeam: 'Al Ahly', homeId: 1032, homeLogo: 'https://media.api-sports.io/football/teams/1032.png', homeScore: 1, awayTeam: 'Zamalek', awayId: 1033, awayLogo: 'https://media.api-sports.io/football/teams/1033.png', awayScore: 0, status: 'Finished', statusKey: 'finished', time: 'FT' },
            { league: 'CAF Champions League', homeTeam: 'Pyramids FC', homeId: 7244, homeLogo: 'https://media.api-sports.io/football/teams/7244.png', homeScore: 2, awayTeam: 'Armee Royale', awayId: 960, awayLogo: 'https://media.api-sports.io/football/teams/960.png', awayScore: 0, status: 'Live', statusKey: 'live', time: "60'" }
        ],
        yesterday: [
            { league: 'Champions League', homeTeam: 'Bayern Munich', homeId: 157, homeLogo: 'https://media.api-sports.io/football/teams/157.png', homeScore: 3, awayTeam: 'Paris SG', awayId: 85, awayLogo: 'https://media.api-sports.io/football/teams/85.png', awayScore: 0, status: 'Finished', statusKey: 'finished', time: 'FT' },
            { league: 'Saudi Pro League', homeTeam: 'Al Nassr', homeId: 2939, homeLogo: 'https://media.api-sports.io/football/teams/2939.png', homeScore: 4, awayTeam: 'Al Hilal', awayId: 2930, awayLogo: 'https://media.api-sports.io/football/teams/2930.png', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' }
        ],
        tomorrow: [
            { league: 'Premier League', homeTeam: 'Chelsea', homeId: 49, homeLogo: 'https://media.api-sports.io/football/teams/49.png', awayTeam: 'Manchester United', awayId: 33, awayLogo: 'https://media.api-sports.io/football/teams/33.png', date: 'Tomorrow', time: '17:30', statusKey: 'upcoming' },
            { league: 'La Liga', homeTeam: 'Atletico Madrid', homeId: 530, homeLogo: 'https://media.api-sports.io/football/teams/530.png', awayTeam: 'Sevilla', awayId: 536, awayLogo: 'https://media.api-sports.io/football/teams/536.png', date: 'Tomorrow', time: '20:00', statusKey: 'upcoming' },
            { league: 'Egyptian League', homeTeam: 'Ghazl El Mahala', homeId: 7252, homeLogo: 'https://media.api-sports.io/football/teams/7252.png', awayTeam: 'El Bank El Ahly', awayId: 18538, awayLogo: 'https://media.api-sports.io/football/teams/18538.png', date: 'Tomorrow', time: '08:00', statusKey: 'upcoming' },
            { league: 'Saudi Pro League', homeTeam: 'Al Ittihad', homeId: 2931, homeLogo: 'https://media.api-sports.io/football/teams/2931.png', awayTeam: 'Al Ahli', awayId: 2934, awayLogo: 'https://media.api-sports.io/football/teams/2934.png', date: 'Tomorrow', time: '19:00', statusKey: 'upcoming' }
        ]
    },
    ar: {
        today: [
            { league: 'الدوري الإنجليزي', homeTeam: 'ليفربول', homeId: 40, homeLogo: 'https://media.api-sports.io/football/teams/40.png', homeScore: 3, awayTeam: 'مانشستر سيتي', awayId: 50, awayLogo: 'https://media.api-sports.io/football/teams/50.png', awayScore: 1, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
            { league: 'الدوري الإنجليزي', homeTeam: 'أرسنال', homeId: 42, homeLogo: 'https://media.api-sports.io/football/teams/42.png', homeScore: 2, awayTeam: 'توتنهام', awayId: 47, awayLogo: 'https://media.api-sports.io/football/teams/47.png', awayScore: 0, status: 'مباشر', statusKey: 'live', time: "75'" },
            { league: 'الدوري الإسباني', homeTeam: 'ريال مدريد', homeId: 541, homeLogo: 'https://media.api-sports.io/football/teams/541.png', homeScore: 2, awayTeam: 'برشلونة', awayId: 529, awayLogo: 'https://media.api-sports.io/football/teams/529.png', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
            { league: 'الدوري المصري', homeTeam: 'الأهلي', homeId: 1032, homeLogo: 'https://media.api-sports.io/football/teams/1032.png', homeScore: 1, awayTeam: 'الزمالك', awayId: 1033, awayLogo: 'https://media.api-sports.io/football/teams/1033.png', awayScore: 0, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
            { league: 'دوري أبطال أفريقيا', homeTeam: 'بيراميدز', homeId: 7244, homeLogo: 'https://media.api-sports.io/football/teams/7244.png', homeScore: 2, awayTeam: 'الجيش الملكي', awayId: 960, awayLogo: 'https://media.api-sports.io/football/teams/960.png', awayScore: 0, status: 'مباشر', statusKey: 'live', time: "60'" }
        ],
        yesterday: [
            { league: 'دوري أبطال أوروبا', homeTeam: 'بايرن ميونخ', homeId: 157, homeLogo: 'https://media.api-sports.io/football/teams/157.png', homeScore: 3, awayTeam: 'باريس سان جيرمان', awayId: 85, awayLogo: 'https://media.api-sports.io/football/teams/85.png', awayScore: 0, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
            { league: 'دوري روشن السعودي', homeTeam: 'النصر', homeId: 2939, homeLogo: 'https://media.api-sports.io/football/teams/2939.png', homeScore: 4, awayTeam: 'الهلال', awayId: 2930, awayLogo: 'https://media.api-sports.io/football/teams/2930.png', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' }
        ],
        tomorrow: [
            { league: 'الدوري الإنجليزي', homeTeam: 'تشيلسي', homeId: 49, homeLogo: 'https://media.api-sports.io/football/teams/49.png', awayTeam: 'مانشستر يونايتد', awayId: 33, awayLogo: 'https://media.api-sports.io/football/teams/33.png', date: 'غداً', time: '17:30', statusKey: 'upcoming' },
            { league: 'الدوري الإسباني', homeTeam: 'أتلتيكو مدريد', homeId: 530, homeLogo: 'https://media.api-sports.io/football/teams/530.png', awayTeam: 'إشبيلية', awayId: 536, awayLogo: 'https://media.api-sports.io/football/teams/536.png', date: 'غداً', time: '20:00', statusKey: 'upcoming' },
            { league: 'الدوري المصري', homeTeam: 'غزل المحلة', homeId: 7252, homeLogo: 'https://media.api-sports.io/football/teams/7252.png', awayTeam: 'البنك الأهلي', awayId: 18538, awayLogo: 'https://media.api-sports.io/football/teams/18538.png', date: 'غداً', time: '08:00', statusKey: 'upcoming' },
            { league: 'دوري روشن السعودي', homeTeam: 'الاتحاد', homeId: 2931, homeLogo: 'https://media.api-sports.io/football/teams/2931.png', awayTeam: 'الأهلي', awayId: 2934, awayLogo: 'https://media.api-sports.io/football/teams/2934.png', date: 'غداً', time: '19:00', statusKey: 'upcoming' }
        ]
    }
};

// League logos and country info
const leagueMetadata = {
    'Premier League': { name: { en: 'Premier League', ar: 'الدوري الإنجليزي' }, logo: 'https://media.api-sports.io/football/leagues/39.png', country: { en: 'England', ar: 'إنجلترا' }, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    'الدوري الإنجليزي': { name: { en: 'Premier League', ar: 'الدوري الإنجليزي' }, logo: 'https://media.api-sports.io/football/leagues/39.png', country: { en: 'England', ar: 'إنجلترا' }, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    39: { name: { en: 'Premier League', ar: 'الدوري الإنجليزي' }, logo: 'https://media.api-sports.io/football/leagues/39.png', country: { en: 'England', ar: 'إنجلترا' }, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },

    'La Liga': { name: { en: 'La Liga', ar: 'الدوري الإسباني' }, logo: 'https://media.api-sports.io/football/leagues/140.png', country: { en: 'Spain', ar: 'إسبانيا' }, flag: '🇪🇸' },
    'الدوري الإسباني': { name: { en: 'La Liga', ar: 'الدوري الإسباني' }, logo: 'https://media.api-sports.io/football/leagues/140.png', country: { en: 'Spain', ar: 'إسبانيا' }, flag: '🇪🇸' },
    140: { name: { en: 'La Liga', ar: 'الدوري الإسباني' }, logo: 'https://media.api-sports.io/football/leagues/140.png', country: { en: 'Spain', ar: 'إسبانيا' }, flag: '🇪🇸' },

    'Saudi Pro League': { name: { en: 'Saudi Pro League', ar: 'دوري روشن السعودي' }, logo: 'https://media.api-sports.io/football/leagues/307.png', country: { en: 'Saudi Arabia', ar: 'السعودية' }, flag: '🇸🇦' },
    'دوري روشن السعودي': { name: { en: 'Saudi Pro League', ar: 'دوري روشن السعودي' }, logo: 'https://media.api-sports.io/football/leagues/307.png', country: { en: 'Saudi Arabia', ar: 'السعودية' }, flag: '🇸🇦' },
    307: { name: { en: 'Saudi Pro League', ar: 'دوري روشن السعودي' }, logo: 'https://media.api-sports.io/football/leagues/307.png', country: { en: 'Saudi Arabia', ar: 'السعودية' }, flag: '🇸🇦' },

    'Champions League': { name: { en: 'Champions League', ar: 'دوري أبطال أوروبا' }, logo: 'https://media.api-sports.io/football/leagues/2.png', country: { en: 'Europe', ar: 'أوروبا' }, flag: '🇪🇺' },
    'دوري أبطال أوروبا': { name: { en: 'Champions League', ar: 'دوري أبطال أوروبا' }, logo: 'https://media.api-sports.io/football/leagues/2.png', country: { en: 'Europe', ar: 'أوروبا' }, flag: '🇪🇺' },
    2: { name: { en: 'Champions League', ar: 'دوري أبطال أوروبا' }, logo: 'https://media.api-sports.io/football/leagues/2.png', country: { en: 'Europe', ar: 'أوروبا' }, flag: '🇪🇺' },

    'Egyptian League': { name: { en: 'Egyptian Premier League', ar: 'الدوري المصري' }, logo: 'https://media.api-sports.io/football/leagues/233.png', country: { en: 'Egypt', ar: 'مصر' }, flag: '🇪🇬' },
    'Egyptian Premier League': { name: { en: 'Egyptian Premier League', ar: 'الدوري المصري' }, logo: 'https://media.api-sports.io/football/leagues/233.png', country: { en: 'Egypt', ar: 'مصر' }, flag: '🇪🇬' },
    'الدوري المصري': { name: { en: 'Egyptian Premier League', ar: 'الدوري المصري' }, logo: 'https://media.api-sports.io/football/leagues/233.png', country: { en: 'Egypt', ar: 'مصر' }, flag: '🇪🇬' },
    233: { name: { en: 'Egyptian Premier League', ar: 'الدوري المصري' }, logo: 'https://media.api-sports.io/football/leagues/233.png', country: { en: 'Egypt', ar: 'مصر' }, flag: '🇪🇬' },

    'CAF Champions League': { name: { en: 'CAF Champions League', ar: 'دوري أبطال أفريقيا' }, logo: 'https://media.api-sports.io/football/leagues/12.png', country: { en: 'Africa', ar: 'أفريقيا' }, flag: '🌍' },
    'دوري أبطال أفريقيا': { name: { en: 'CAF Champions League', ar: 'دوري أبطال أفريقيا' }, logo: 'https://media.api-sports.io/football/leagues/12.png', country: { en: 'Africa', ar: 'أفريقيا' }, flag: '🌍' },
    12: { name: { en: 'CAF Champions League', ar: 'دوري أبطال أفريقيا' }, logo: 'https://media.api-sports.io/football/leagues/12.png', country: { en: 'Africa', ar: 'أفريقيا' }, flag: '🌍' },

    'CAF Confederation Cup': { name: { en: 'CAF Confederation Cup', ar: 'الكونفدرالية الأفريقية' }, logo: 'https://media.api-sports.io/football/leagues/6.png', country: { en: 'Africa', ar: 'أفريقيا' }, flag: '🌍' },
    'الكونفدرالية الأفريقية': { name: { en: 'CAF Confederation Cup', ar: 'الكونفدرالية الأفريقية' }, logo: 'https://media.api-sports.io/football/leagues/6.png', country: { en: 'Africa', ar: 'أفريقيا' }, flag: '🌍' },
    6: { name: { en: 'CAF Confederation Cup', ar: 'الكونفدرالية الأفريقية' }, logo: 'https://media.api-sports.io/football/leagues/6.png', country: { en: 'Africa', ar: 'أفريقيا' }, flag: '🌍' }
};

// League ID mapping for API-Sports
const leagueIdMap = {
    'premier': [39],
    'laliga': [140],
    'spl': [307],
    'ucl': [2],
    'egyptian': [233],
    'africa': [12, 6]
};

// Filters state
let selectedLeague = 'all';
let selectedDate = 'today';
let selectedStatusFilter = 'all';

// ── Date titles ──
const dateTitles = {
    today:     { en: "Today's Matches",       ar: "مباريات اليوم" },
    yesterday: { en: "Yesterday's Matches",    ar: "مباريات أمس" },
    tomorrow:  { en: "Tomorrow's Matches",     ar: "مباريات غداً" }
};

// ── Init filters on DOM ready ──
document.addEventListener('DOMContentLoaded', function() {
    // Date navigation arrows
    const prevBtn = document.getElementById('datePrev');
    const nextBtn = document.getElementById('dateNext');
    const dateOrder = ['yesterday', 'today', 'tomorrow'];

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const idx = dateOrder.indexOf(selectedDate);
            if (idx > 0) {
                selectedDate = dateOrder[idx - 1];
                updateDateTitle();
                loadMatchesContent();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const idx = dateOrder.indexOf(selectedDate);
            if (idx < dateOrder.length - 1) {
                selectedDate = dateOrder[idx + 1];
                updateDateTitle();
                loadMatchesContent();
            }
        });
    }

    // Status filter tabs
    document.querySelectorAll('.yk-filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.yk-filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedStatusFilter = tab.dataset.filter;
            loadMatchesContent();
        });
    });

    // League filter tabs
    document.querySelectorAll('.yk-league-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.yk-league-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedLeague = tab.dataset.league;
            loadMatchesContent();
        });
    });
});

function updateDateTitle() {
    const titleEl = document.getElementById('matchesDateTitle');
    if (titleEl) {
        const titles = dateTitles[selectedDate] || dateTitles.today;
        titleEl.textContent = currentLang === 'en' ? titles.en : titles.ar;
        titleEl.setAttribute('data-en', titles.en);
        titleEl.setAttribute('data-ar', titles.ar);
    }
}

// ── Main loader ──
async function loadMatchesContent() {
    const container = document.getElementById('matchesList');
    if (!container) return;

    if (typeof FootballAPI !== 'undefined') {
        FootballAPI.showLoading(container);
    }

    // Determine which date to fetch
    let dateStr;
    if (selectedDate === 'today') dateStr = FootballAPI.todayDate();
    else if (selectedDate === 'yesterday') dateStr = FootballAPI.yesterdayDate();
    else dateStr = FootballAPI.tomorrowDate();

    const raw = await FootballAPI.fetchFixturesByDate(dateStr);
    let matches = [];

    if (raw && Array.isArray(raw) && raw.length > 0) {
        const filteredRaw = FootballAPI.filterByAllowedLeagues(raw);
        matches = filteredRaw
            .map(f => FootballAPI.transformFixture(f))
            .filter(Boolean);

        // Apply league filter
        if (selectedLeague !== 'all' && leagueIdMap[selectedLeague]) {
            const ids = leagueIdMap[selectedLeague];
            matches = matches.filter(m => ids.includes(m.leagueId));
        }
    }

    // Fallback if API returns nothing
    if (!matches || matches.length === 0) {
        const fb = matchesFallback[currentLang]?.[selectedDate] || [];
        matches = fb;
        if (selectedLeague !== 'all') {
            matches = matches.filter(m => matchesLeagueFilter(m.league, selectedLeague));
        }
    }

    // Apply status filter
    if (selectedStatusFilter !== 'all') {
        matches = matches.filter(m => m.statusKey === selectedStatusFilter);
    }

    container.innerHTML = '';

    if (matches.length === 0) {
        if (typeof renderEmptyState === 'function') {
            renderEmptyState(container, 'No matches found for the selected filters.', 'لا توجد مباريات تطابق الفلاتر المختارة.');
        } else {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <h3>${currentLang === 'en' ? 'No matches found' : 'لا توجد مباريات'}</h3>
                </div>
            `;
        }
        return;
    }

    // Group by league ID (primary) or name (secondary) to avoid name collisions
    const grouped = matches.reduce((acc, m) => {
        const key = m.leagueId || m.league;
        if (!acc[key]) {
            acc[key] = {
                id: m.leagueId,
                name: m.league,
                matches: []
            };
        }
        acc[key].matches.push(m);
        return acc;
    }, {});

    // Render each league section
    Object.entries(grouped).forEach(([leagueKey, groupData], groupIndex) => {
        const section = createLeagueSection(leagueKey, groupData.matches, groupIndex);
        container.appendChild(section);
    });
}

// ── League name → filter key map ──
function matchesLeagueFilter(league, filter) {
    const leagueMap = {
        'premier': ['Premier League', 'الدوري الإنجليزي'],
        'laliga': ['La Liga', 'الدوري الإسباني'],
        'spl': ['Saudi Pro League', 'دوري روشن السعودي'],
        'ucl': ['Champions League', 'دوري أبطال أوروبا'],
        'egyptian': ['Egyptian Premier League', 'Egyptian League', 'الدوري المصري'],
        'africa': ['CAF Champions League', 'دوري أبطال أفريقيا', 'CAF Confederation Cup', 'الكونفدرالية الأفريقية']
    };
    return leagueMap[filter]?.includes(league) || false;
}

// ── Create league section (header + match rows) ──
function createLeagueSection(leagueKey, matches, index) {
    const section = document.createElement('div');
    section.className = 'yk-league-section';
    section.style.animationDelay = `${index * 0.08}s`;

    // Try finding metadata by ID (string or number) or name
    const meta = leagueMetadata[leagueKey] || leagueMetadata[matches[0]?.league] || {};
    const leagueName = meta.name ? (meta.name[currentLang] || meta.name.en) : (matches[0]?.league || leagueKey);

    const countryText = meta.country ? (currentLang === 'en' ? meta.country.en : meta.country.ar) : '';
    const leagueLogoSrc = meta.logo || matches[0]?.leagueLogo;

    const leagueLogo = leagueLogoSrc
        ? `<img src="${leagueLogoSrc}" alt="${leagueName}" class="yk-league-logo" onerror="this.outerHTML='🏆'">`
        : '<span style="font-size:1.5rem;">🏆</span>';

    section.innerHTML = `
        <div class="yk-league-header">
            ${leagueLogo}
            <div class="yk-league-info">
                <span class="yk-league-name">${leagueName}</span>
                ${countryText ? `<span class="yk-league-country">${meta.flag || ''} ${countryText}</span>` : ''}
            </div>
        </div>
    `;

    matches.forEach(match => {
        const row = createMatchRow(match);
        section.appendChild(row);
    });

    return section;
}

// ── Create a single match row ──
function createMatchRow(match) {
    const row = document.createElement('div');
    row.className = 'yk-match-row';
    if (match.statusKey === 'live') row.classList.add('yk-match-row--live');

    // Team logos
    const homeLogoHtml = renderYkTeamLogo(match.homeLogo);
    const awayLogoHtml = renderYkTeamLogo(match.awayLogo);

    // Center block content
    let centerHtml = '';
    if (match.statusKey === 'upcoming') {
        centerHtml = `
            <div class="yk-score-block">
                <span class="yk-match-time">${match.time || 'TBD'} ${currentLang === 'ar' ? 'م' : ''}</span>
                <span class="yk-match-status yk-status-upcoming">${currentLang === 'en' ? 'Upcoming' : 'لم تبدأ'}</span>
            </div>
        `;
    } else if (match.statusKey === 'live') {
        centerHtml = `
            <div class="yk-score-block">
                <div class="yk-score">
                    <span>${match.homeScore ?? 0}</span>
                    <span class="yk-score-divider">-</span>
                    <span>${match.awayScore ?? 0}</span>
                </div>
                <span class="yk-match-minute">${match.time || ''}</span>
            </div>
        `;
    } else {
        // Finished
        centerHtml = `
            <div class="yk-score-block">
                <div class="yk-score">
                    <span>${match.homeScore ?? 0}</span>
                    <span class="yk-score-divider">-</span>
                    <span>${match.awayScore ?? 0}</span>
                </div>
                <span class="yk-match-status yk-status-finished">${currentLang === 'en' ? 'FT' : 'انتهت'}</span>
            </div>
        `;
    }

    row.innerHTML = `
        <div class="yk-team-home">
            <span class="yk-team-name">${match.homeTeam}</span>
            ${homeLogoHtml}
        </div>
        ${centerHtml}
        <div class="yk-team-away">
            ${awayLogoHtml}
            <span class="yk-team-name">${match.awayTeam}</span>
        </div>
    `;

    // Click to open match detail
    row.addEventListener('click', () => {
        if (typeof openMatchDetail === 'function') {
            openMatchDetail(match);
        }
    });

    return row;
}

// ── Render a team logo for yk rows ──
function renderYkTeamLogo(logo) {
    if (logo && logo.startsWith('http')) {
        return `<img src="${logo}" alt="team" class="yk-team-logo-img" onerror="this.outerHTML='<span class=\\'yk-team-emoji\\'>⚽</span>'">`;
    }
    return `<span class="yk-team-emoji">${logo || '⚽'}</span>`;
}