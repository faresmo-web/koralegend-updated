// ============================================================
// Matches Page — API-Sports Integration
// ============================================================

// Fallback static data
const matchesFallback = {
    en: {
        today: [
            { league: 'Premier League', homeTeam: 'Liverpool', homeLogo: '🔴', homeScore: 3, awayTeam: 'Manchester City', awayLogo: '🔵', awayScore: 1, status: 'Finished', statusKey: 'finished', time: 'FT' },
            { league: 'Premier League', homeTeam: 'Arsenal', homeLogo: '🔴', homeScore: 2, awayTeam: 'Tottenham', awayLogo: '⚪', awayScore: 0, status: 'Live', statusKey: 'live', time: "75'" },
            { league: 'La Liga', homeTeam: 'Real Madrid', homeLogo: '⚪', homeScore: 2, awayTeam: 'Barcelona', awayLogo: '🔴', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' }
        ],
        yesterday: [
            { league: 'Champions League', homeTeam: 'Bayern Munich', homeLogo: '🔴', homeScore: 3, awayTeam: 'Paris SG', awayLogo: '🔵', awayScore: 0, status: 'Finished', statusKey: 'finished', time: 'FT' },
            { league: 'Saudi Pro League', homeTeam: 'Al Nassr', homeLogo: '💛', homeScore: 4, awayTeam: 'Al Hilal', awayLogo: '🔵', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' }
        ],
        tomorrow: [
            { league: 'Premier League', homeTeam: 'Chelsea', homeLogo: '🔵', awayTeam: 'Manchester United', awayLogo: '🔴', date: 'Tomorrow', time: '17:30', statusKey: 'upcoming' },
            { league: 'La Liga', homeTeam: 'Atletico Madrid', homeLogo: '🔴', awayTeam: 'Sevilla', awayLogo: '🔴', date: 'Tomorrow', time: '20:00', statusKey: 'upcoming' },
            { league: 'Saudi Pro League', homeTeam: 'Al Ittihad', homeLogo: '⚫', awayTeam: 'Al Ahli', awayLogo: '💚', date: 'Tomorrow', time: '19:00', statusKey: 'upcoming' }
        ]
    },
    ar: {
        today: [
            { league: 'الدوري الإنجليزي', homeTeam: 'ليفربول', homeLogo: '🔴', homeScore: 3, awayTeam: 'مانشستر سيتي', awayLogo: '🔵', awayScore: 1, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
            { league: 'الدوري الإنجليزي', homeTeam: 'أرسنال', homeLogo: '🔴', homeScore: 2, awayTeam: 'توتنهام', awayLogo: '⚪', awayScore: 0, status: 'مباشر', statusKey: 'live', time: "75'" },
            { league: 'الدوري الإسباني', homeTeam: 'ريال مدريد', homeLogo: '⚪', homeScore: 2, awayTeam: 'برشلونة', awayLogo: '🔴', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' }
        ],
        yesterday: [
            { league: 'دوري أبطال أوروبا', homeTeam: 'بايرن ميونخ', homeLogo: '🔴', homeScore: 3, awayTeam: 'باريس سان جيرمان', awayLogo: '🔵', awayScore: 0, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
            { league: 'دوري روشن السعودي', homeTeam: 'النصر', homeLogo: '💛', homeScore: 4, awayTeam: 'الهلال', awayLogo: '🔵', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' }
        ],
        tomorrow: [
            { league: 'الدوري الإنجليزي', homeTeam: 'تشيلسي', homeLogo: '🔵', awayTeam: 'مانشستر يونايتد', awayLogo: '🔴', date: 'غداً', time: '17:30', statusKey: 'upcoming' },
            { league: 'الدوري الإسباني', homeTeam: 'أتلتيكو مدريد', homeLogo: '🔴', awayTeam: 'إشبيلية', awayLogo: '🔴', date: 'غداً', time: '20:00', statusKey: 'upcoming' },
            { league: 'دوري روشن السعودي', homeTeam: 'الاتحاد', homeLogo: '⚫', awayTeam: 'الأهلي', awayLogo: '💚', date: 'غداً', time: '19:00', statusKey: 'upcoming' }
        ]
    }
};

// League ID mapping for API-Sports
const leagueIdMap = {
    'premier': [39],           // Premier League
    'laliga': [140],           // La Liga
    'spl': [307],              // Saudi Pro League
    'ucl': [2],                // Champions League
    'egyptian': [233],         // Egyptian Premier League
    'africa': [12, 6]          // CAF Champions League + Africa Cup of Nations
};

// Filters
let selectedLeague = 'all';
let selectedDate = 'today';

document.addEventListener('DOMContentLoaded', function() {
    const leagueFilter = document.getElementById('leagueFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (leagueFilter) {
        leagueFilter.addEventListener('change', function(e) {
            selectedLeague = e.target.value;
            loadMatchesContent();
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function(e) {
            selectedDate = e.target.value;
            loadMatchesContent();
        });
    }
});

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
            .filter(Boolean); // Remove any null transformations

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
        // Filter fallback by league name
        if (selectedLeague !== 'all') {
            matches = matches.filter(m => matchesLeagueFilter(m.league, selectedLeague));
        }
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

    // Grouping by league
    const grouped = matches.reduce((acc, m) => {
        if (!acc[m.league]) acc[m.league] = [];
        acc[m.league].push(m);
        return acc;
    }, {});

    Object.entries(grouped).forEach(([leagueName, leagueMatches], groupIndex) => {
        const leagueSection = document.createElement('div');
        leagueSection.className = 'league-group';
        leagueSection.style.animation = 'slideUp 0.6s ease-out backwards';
        leagueSection.style.animationDelay = `${groupIndex * 0.1}s`;

        leagueSection.innerHTML = `
            <h3 class="league-group-title">${leagueName}</h3>
            <div class="matches-grid"></div>
        `;

        const grid = leagueSection.querySelector('.matches-grid');
        leagueMatches.forEach((match, i) => {
            const card = createMatchCardDetailed(match, selectedDate);
            card.style.animationDelay = `${(groupIndex * 0.1) + (i * 0.05)}s`;
            grid.appendChild(card);
        });

        container.appendChild(leagueSection);
    });
}

function matchesLeagueFilter(league, filter) {
    const leagueMap = {
        'premier': ['Premier League', 'الدوري الإنجليزي'],
        'laliga': ['La Liga', 'الدوري الإسباني'],
        'spl': ['Saudi Pro League', 'دوري روشن السعودي'],
        'ucl': ['Champions League', 'دوري أبطال أوروبا'],
        'egyptian': ['Egyptian Premier League', 'الدوري المصري'],
        'africa': ['CAF Champions League', 'دوري أبطال أفريقيا', 'Africa Cup of Nations', 'كأس أمم أفريقيا']
    };
    return leagueMap[filter]?.includes(league) || false;
}

function createMatchCardDetailed(match, dateType) {
    const card = document.createElement('div');
    card.className = 'match-card';
    if (match.statusKey === 'live') card.classList.add('match-card--live');
    card.style.animation = 'slideUp 0.6s ease-out backwards';

    const homeLogo = renderTeamLogo(match.homeLogo);
    const awayLogo = renderTeamLogo(match.awayLogo);
    
    if (match.statusKey === 'upcoming' || dateType === 'tomorrow') {
        card.innerHTML = `
            <div class="match-league">${match.league}</div>
            <div class="match-teams">
                <div class="team">
                    <div class="team-logo">${homeLogo}</div>
                    <div class="team-name">${match.homeTeam}</div>
                </div>
                <div class="match-score">
                    <span class="match-vs">VS</span>
                </div>
                <div class="team">
                    <div class="team-logo">${awayLogo}</div>
                    <div class="team-name">${match.awayTeam}</div>
                </div>
            </div>
            <div class="match-date">${match.date || ''} - ${match.time || ''}</div>
            <div style="text-align: center;">
                <span class="match-status status-upcoming">${currentLang === 'en' ? 'Upcoming' : 'قادمة'}</span>
            </div>
        `;
    } else {
        const statusClass = match.statusKey === 'live' ? 'status-live' : 'status-finished';
        const statusText = match.statusKey === 'live'
            ? (currentLang === 'en' ? 'Live' : 'مباشر')
            : (currentLang === 'en' ? 'Finished' : 'انتهت');
        
        card.innerHTML = `
            <div class="match-league">${match.league}</div>
            <div class="match-teams">
                <div class="team">
                    <div class="team-logo">${homeLogo}</div>
                    <div class="team-name">${match.homeTeam}</div>
                </div>
                <div class="match-score">
                    <span>${match.homeScore ?? 0}</span>
                    <span class="match-vs">-</span>
                    <span>${match.awayScore ?? 0}</span>
                </div>
                <div class="team">
                    <div class="team-logo">${awayLogo}</div>
                    <div class="team-name">${match.awayTeam}</div>
                </div>
            </div>
            <div class="match-time">${match.time || 'FT'}</div>
            <div style="text-align: center;">
                <span class="match-status ${statusClass}">${match.status || statusText}</span>
            </div>
        `;
    }
    
    return card;
}