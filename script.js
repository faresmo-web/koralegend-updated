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
        { league: 'Premier League', homeTeam: 'Liverpool', homeLogo: '🔴', homeScore: 3, awayTeam: 'Manchester City', awayLogo: '🔵', awayScore: 1, status: 'Finished', statusKey: 'finished', time: 'FT' },
        { league: 'La Liga', homeTeam: 'Real Madrid', homeLogo: '⚪', homeScore: 2, awayTeam: 'Barcelona', awayLogo: '🔴', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' },
        { league: 'Saudi Pro League', homeTeam: 'Al Nassr', homeLogo: '💛', homeScore: 4, awayTeam: 'Al Hilal', awayLogo: '🔵', awayScore: 2, status: 'Finished', statusKey: 'finished', time: 'FT' }
    ],
    ar: [
        { league: 'الدوري الإنجليزي', homeTeam: 'ليفربول', homeLogo: '🔴', homeScore: 3, awayTeam: 'مانشستر سيتي', awayLogo: '🔵', awayScore: 1, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
        { league: 'الدوري الإسباني', homeTeam: 'ريال مدريد', homeLogo: '⚪', homeScore: 2, awayTeam: 'برشلونة', awayLogo: '🔴', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' },
        { league: 'دوري روشن السعودي', homeTeam: 'النصر', homeLogo: '💛', homeScore: 4, awayTeam: 'الهلال', awayLogo: '🔵', awayScore: 2, status: 'انتهت', statusKey: 'finished', time: 'نهاية' }
    ]
};

const fallbackUpcoming = {
    en: [
        { league: 'Champions League', homeTeam: 'Bayern Munich', homeLogo: '🔴', awayTeam: 'Paris SG', awayLogo: '🔵', date: 'Tomorrow', time: '20:00', statusKey: 'upcoming' },
        { league: 'Premier League', homeTeam: 'Arsenal', homeLogo: '🔴', awayTeam: 'Chelsea', awayLogo: '🔵', date: 'Tomorrow', time: '17:30', statusKey: 'upcoming' },
        { league: 'Saudi Pro League', homeTeam: 'Al Ittihad', homeLogo: '⚫', awayTeam: 'Al Ahli', awayLogo: '💚', date: 'Tomorrow', time: '19:00', statusKey: 'upcoming' }
    ],
    ar: [
        { league: 'دوري أبطال أوروبا', homeTeam: 'بايرن ميونخ', homeLogo: '🔴', awayTeam: 'باريس سان جيرمان', awayLogo: '🔵', date: 'غداً', time: '20:00', statusKey: 'upcoming' },
        { league: 'الدوري الإنجليزي', homeTeam: 'أرسنال', homeLogo: '🔴', awayTeam: 'تشيلسي', awayLogo: '🔵', date: 'غداً', time: '17:30', statusKey: 'upcoming' },
        { league: 'دوري روشن السعودي', homeTeam: 'الاتحاد', homeLogo: '⚫', awayTeam: 'الأهلي', awayLogo: '💚', date: 'غداً', time: '19:00', statusKey: 'upcoming' }
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

    const raw = await FootballAPI.fetchTodayFixtures();
    let matches;

    if (raw && raw.length > 0) {
        const filtered = FootballAPI.filterByAllowedLeagues(raw);
        matches = filtered
            .map(f => FootballAPI.transformFixture(f))
            .filter(m => m.statusKey === 'finished' || m.statusKey === 'live')
            .slice(0, 6);
    }

    if (!matches || matches.length === 0) {
        matches = fallbackResults[currentLang];
    }

    container.innerHTML = '';
    matches.forEach((match, i) => {
        const card = createMatchCard(match, match.statusKey === 'live' ? 'live' : 'result');
        card.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(card);
    });
}

// ── Upcoming Matches (API → fallback) ────────────────────
async function loadUpcomingMatches() {
    const container = document.getElementById('upcomingMatches');
    if (!container) return;

    FootballAPI.showLoading(container);

    const raw = await FootballAPI.fetchTomorrowFixtures();
    let matches;

    if (raw && raw.length > 0) {
        const filtered = FootballAPI.filterByAllowedLeagues(raw);
        matches = filtered
            .map(f => FootballAPI.transformFixture(f))
            .filter(m => m.statusKey === 'upcoming')
            .slice(0, 6);
    }

    if (!matches || matches.length === 0) {
        matches = fallbackUpcoming[currentLang];
    }

    container.innerHTML = '';
    matches.forEach((match, i) => {
        const card = createMatchCard(match, 'upcoming');
        card.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(card);
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
        newsItems = fallbackNews[currentLang];
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