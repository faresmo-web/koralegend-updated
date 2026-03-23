// Language Management
let currentLang = 'en';

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', switchLanguage);
    }
    
    // Initialize language
    const savedLang = localStorage.getItem('language') || 'en';
    if (savedLang === 'ar') {
        switchLanguage();
    }
    
    // Load page-specific content
    loadPageContent();
});

// Preloader removal
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Ensure the preloader stays for at least 300ms for visual effect
        setTimeout(() => {
            preloader.classList.add('fade-out');
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 800);
        }, 300);
    }
});

function switchLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLang);
    
    // Update HTML attributes
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-en and data-ar attributes
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        const text = currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ar');
        if (element.tagName === 'INPUT' || element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update language toggle active state
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Reload page-specific content
    loadPageContent();
}

function loadPageContent() {
    // Determine which page we're on and load appropriate content
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('index.html') || path.endsWith('/index') || path === '/' || path === '' || path.endsWith('/index/')) {
        loadHomeContent();
    } else if (path.includes('matches.html') || path.endsWith('/matches')) {
        if (typeof loadMatchesContent === 'function') {
            loadMatchesContent();
        }
    } else if (path.includes('news.html') || path.endsWith('/news')) {
        if (typeof loadNewsContent === 'function') {
            loadNewsContent();
        }
    } else if (path.includes('legends.html') || path.endsWith('/legends')) {
        if (typeof loadLegendsContent === 'function') {
            loadLegendsContent();
        }
    } else if (path.includes('leagues.html') || path.endsWith('/leagues')) {
        if (typeof loadLeaguesContent === 'function') {
            loadLeaguesContent();
        }
    }
}

// Home Page Content
function loadHomeContent() {
    loadTodayResults();
    loadUpcomingMatches();
    loadBreakingNews();
}

// ── Empty State UI Helper ────────────────────────────────
function renderEmptyState(container, messageEn, messageAr) {
    if (!container) return;
    const message = currentLang === 'en' ? messageEn : messageAr;
    container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--card-bg); border-radius: 1.5rem; border: 1px solid rgba(255,255,255,0.05); animation: slideUp 0.8s ease-out; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
            <div class="empty-icon" style="font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.2; filter: grayscale(1);">⚽</div>
            <p class="empty-text" style="font-size: 1.2rem; color: var(--text-secondary); font-family: var(--font-display); letter-spacing: 1px; max-width: 400px; line-height: 1.5;">${message}</p>
        </div>
    `;
}

// ── Helper: render a team logo (img or emoji fallback) ───
function renderTeamLogo(logo) {
    if (logo && logo.startsWith('http')) {
        return `<img src="${logo}" alt="team logo" class="team-logo-img" onerror="this.outerHTML='⚽'">`;
    }
    return logo || '⚽';
}

// ── Helper: create match card (supports API & static data) ───
function createMatchCard(match, type) {
    const card = document.createElement('div');
    card.className = 'match-card';
    if (match.statusKey === 'live') card.classList.add('match-card--live');
    card.style.animation = 'slideUp 0.6s ease-out backwards';

    const homeLogo = renderTeamLogo(match.homeLogo);
    const awayLogo = renderTeamLogo(match.awayLogo);

    if (type === 'result' || type === 'live') {
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
    } else {
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
    }

    return card;
}

// ── Fallback static data (used when API fails) ───────────
const fallbackResults = {
    en: [
        { league: 'Premier League', homeTeam: 'Liverpool', homeLogo: 'https://media.api-sports.io/football/teams/40.png', homeScore: 3, awayTeam: 'Manchester City', awayLogo: 'https://media.api-sports.io/football/teams/50.png', awayScore: 1, status: 'Finished', statusKey: 'finished', time: 'FT' },
        { league: 'La Liga', homeTeam: 'Real Madrid', homeLogo: 'https://media.api-sports.io/football/teams/541.png', homeScore: 2, awayTeam: 'Barcelona', awayLogo: 'https://media.api-sports.io/football/teams/529.png', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' },
        { league: 'Saudi Pro League', homeTeam: 'Al Nassr', homeLogo: 'https://media.api-sports.io/football/teams/2939.png', homeScore: 4, awayTeam: 'Al Hilal', awayLogo: 'https://media.api-sports.io/football/teams/2930.png', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' }
    ],
    ar: [
        { league: 'الدوري الإنجليزي', homeTeam: 'ليفربول', homeLogo: 'https://media.api-sports.io/football/teams/40.png', homeScore: 3, awayTeam: 'مانشستر سيتي', awayLogo: 'https://media.api-sports.io/football/teams/50.png', awayScore: 1, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
        { league: 'الدوري الإسباني', homeTeam: 'ريال مدريد', homeLogo: 'https://media.api-sports.io/football/teams/541.png', homeScore: 2, awayTeam: 'برشلونة', awayLogo: 'https://media.api-sports.io/football/teams/529.png', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
        { league: 'دوري روشن السعودي', homeTeam: 'النصر', homeLogo: 'https://media.api-sports.io/football/teams/2939.png', homeScore: 4, awayTeam: 'الهلال', awayLogo: 'https://media.api-sports.io/football/teams/2930.png', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' }
    ]
};

const fallbackUpcoming = {
    en: [
        { league: 'Champions League', homeTeam: 'Bayern Munich', homeLogo: 'https://media.api-sports.io/football/teams/157.png', awayTeam: 'Paris SG', awayLogo: 'https://media.api-sports.io/football/teams/85.png', date: 'Tomorrow', time: '20:00', statusKey: 'upcoming' },
        { league: 'Premier League', homeTeam: 'Arsenal', homeLogo: 'https://media.api-sports.io/football/teams/42.png', awayTeam: 'Chelsea', awayLogo: 'https://media.api-sports.io/football/teams/49.png', date: 'Tomorrow', time: '17:30', statusKey: 'upcoming' },
        { league: 'Saudi Pro League', homeTeam: 'Al Ittihad', homeLogo: 'https://media.api-sports.io/football/teams/2931.png', awayTeam: 'Al Ahli', awayLogo: 'https://media.api-sports.io/football/teams/2931.png', date: 'Tomorrow', time: '19:00', statusKey: 'upcoming' }
    ],
    ar: [
        { league: 'دوري أبطال أوروبا', homeTeam: 'بايرن ميونخ', homeLogo: 'https://media.api-sports.io/football/teams/157.png', awayTeam: 'باريس سان جيرمان', awayLogo: 'https://media.api-sports.io/football/teams/85.png', date: 'غداً', time: '20:00', statusKey: 'upcoming' },
        { league: 'الدوري الإنجليزي', homeTeam: 'أرسنال', homeLogo: 'https://media.api-sports.io/football/teams/42.png', awayTeam: 'تشيلسي', awayLogo: 'https://media.api-sports.io/football/teams/49.png', date: 'غداً', time: '17:30', statusKey: 'upcoming' },
        { league: 'دوري روشن السعودي', homeTeam: 'الاتحاد', homeLogo: 'https://media.api-sports.io/football/teams/2931.png', awayTeam: 'الأهلي', awayLogo: 'https://media.api-sports.io/football/teams/2931.png', date: 'غداً', time: '19:00', statusKey: 'upcoming' }
    ]
};

const fallbackNews = {
    en: [
        { category: 'Transfer', title: 'Star Player Signs with Manchester United', description: 'In a shocking move, the talented midfielder has joined the Red Devils on a five-year contract.', date: '2 hours ago', icon: '📰' },
        { category: 'International', title: 'World Cup Qualifiers: Exciting Matches Ahead', description: 'National teams prepare for crucial qualifying matches that will determine World Cup participants.', date: '5 hours ago', icon: '🌍' },
        { category: 'Local', title: 'Derby Match Ends in Dramatic Fashion', description: 'Last-minute goal secures victory in the most anticipated match of the season.', date: '1 day ago', icon: '⚽' }
    ],
    ar: [
        { category: 'انتقالات', title: 'نجم كبير ينضم لمانشستر يونايتد', description: 'في خطوة مفاجئة، انضم لاعب الوسط الموهوب للشياطين الحمر بعقد لمدة خمس سنوات.', date: 'منذ ساعتين', icon: '📰' },
        { category: 'دولية', title: 'تصفيات كأس العالم: مباريات مثيرة قادمة', description: 'المنتخبات الوطنية تستعد لمباريات حاسمة ستحدد المشاركين في كأس العالم.', date: 'منذ 5 ساعات', icon: '🌍' },
        { category: 'محلية', title: 'الديربي ينتهي بشكل دراماتيكي', description: 'هدف في الدقائق الأخيرة يحسم المباراة الأكثر انتظاراً في الموسم.', date: 'منذ يوم', icon: '⚽' }
    ]
};

// ── Today's Results (API → fallback) ─────────────────────
async function loadTodayResults() {
    const container = document.getElementById('todayResults');
    if (!container) return;

    FootballAPI.showLoading(container);

    let raw = await FootballAPI.fetchTodayFixtures();
    let matches = [];

    // If today is empty, try to fetch recent results from the last 3 days
    if (!raw || raw.length === 0 || raw._fallback) {
        console.log('[Home] Today is empty, fetching recent results...');
        const d = new Date();
        const dateTo = d.toISOString().slice(0, 10);
        d.setDate(d.getDate() - 3);
        const dateFrom = d.toISOString().slice(0, 10);
        // We use fetchFixturesByDate but we'll modify it to support ranges if possible, or just fetch yesterday
        raw = await FootballAPI.fetchFixturesByDate(FootballAPI.yesterdayDate());
    }

    if (raw && Array.isArray(raw) && raw.length > 0) {
        const filtered = FootballAPI.filterByAllowedLeagues(raw);
        matches = filtered
            .map(f => FootballAPI.transformFixture(f))
            .filter(m => m && (m.statusKey === 'finished' || m.statusKey === 'live'))
            .slice(0, 15);
    }
    
    if (matches.length === 0) {
        renderEmptyState(container, 'No matches found for today.', 'لا توجد مباريات حاسمة لهذا اليوم.');
        return;
    }

    // Grouping by league
    const grouped = matches.reduce((acc, m) => {
        if (!acc[m.league]) acc[m.league] = [];
        acc[m.league].push(m);
        return acc;
    }, {});

    container.innerHTML = '';
    Object.entries(grouped).forEach(([leagueName, leagueMatches], groupIndex) => {
        const leagueSection = document.createElement('div');
        leagueSection.className = 'league-group';
        leagueSection.style.animation = 'slideUp 0.6s ease-out backwards';
        leagueSection.style.animationDelay = `${groupIndex * 0.1}s`;

        leagueSection.innerHTML = `
            <h3 class="league-group-title">${leagueName}</h3>
            <div class="results-grid"></div>
        `;

        const grid = leagueSection.querySelector('.results-grid');
        leagueMatches.forEach((match, i) => {
            const card = createMatchCard(match, match.statusKey === 'live' ? 'live' : 'result');
            card.style.animationDelay = `${(groupIndex * 0.1) + (i * 0.05)}s`;
            grid.appendChild(card);
        });

        container.appendChild(leagueSection);
    });
}


// ── Upcoming Matches (API → fallback) ────────────────────
async function loadUpcomingMatches() {
    const container = document.getElementById('upcomingMatches');
    if (!container) return;

    FootballAPI.showLoading(container);

    const raw = await FootballAPI.fetchTomorrowFixtures();
    let matches = [];

    if (raw && Array.isArray(raw) && raw.length > 0) {
        const filtered = FootballAPI.filterByAllowedLeagues(raw);
        matches = filtered
            .map(f => FootballAPI.transformFixture(f))
            .filter(m => m && m.statusKey === 'upcoming')
            .slice(0, 10);
    }
    
    if (matches.length === 0) {
        renderEmptyState(container, 'No upcoming matches scheduled for tomorrow.', 'لا توجد مباريات قادمة مجدولة لغدٍ.');
        return;
    }

    // Grouping by league
    const grouped = matches.reduce((acc, m) => {
        if (!acc[m.league]) acc[m.league] = [];
        acc[m.league].push(m);
        return acc;
    }, {});

    container.innerHTML = '';
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
            const card = createMatchCard(match, 'upcoming');
            card.style.animationDelay = `${(groupIndex * 0.1) + (i * 0.05)}s`;
            grid.appendChild(card);
        });

        container.appendChild(leagueSection);
    });
}

// ── Breaking News (generated from API results → fallback) ─
async function loadBreakingNews() {
    const container = document.getElementById('breakingNews');
    if (!container) return;

    FootballAPI.showLoading(container);

    let newsItems = [];

    // Try to generate news from today's finished fixtures
    const raw = await FootballAPI.fetchTodayFixtures();
    if (raw && raw.length > 0) {
        const filteredRaw = FootballAPI.filterByAllowedLeagues(raw);
        const finished = filteredRaw.filter(f => {
            const s = f.fixture?.status?.short || '';
            return ['FT', 'AET', 'PEN'].includes(s);
        });

        newsItems = finished
            .map(f => FootballAPI.fixtureToNews(f, currentLang))
            .filter(Boolean)
            .slice(0, 6);
    }

    if (newsItems.length === 0) {
        renderEmptyState(container, 'No breaking news at the moment.', 'لا توجد أخبار عاجلة في الوقت الحالي.');
        return;
    }

    container.innerHTML = '';
    newsItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animation = 'slideUp 0.6s ease-out backwards';
        card.style.animationDelay = `${index * 0.1}s`;

        // If we have team logos from API, show them in news image
        let newsImageContent = item.icon;
        if (item.homeLogo && item.homeLogo.startsWith('http')) {
            newsImageContent = `
                <img src="${item.homeLogo}" class="news-team-logo" alt="home" onerror="this.style.display='none'">
                <span style="font-size:1.5rem;margin:0 0.5rem;">VS</span>
                <img src="${item.awayLogo}" class="news-team-logo" alt="away" onerror="this.style.display='none'">
            `;
        }

        card.innerHTML = `
            <div class="news-image">${newsImageContent}</div>
            <div class="news-content">
                <span class="news-category">${item.category}</span>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-description">${item.description}</p>
                <div class="news-date">${item.date}</div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Utility Functions
function formatDate(date) {
    return currentLang === 'en' 
        ? date.toLocaleDateString('en-US') 
        : date.toLocaleDateString('ar-SA');
}

function formatTime(time) {
    return time;
}