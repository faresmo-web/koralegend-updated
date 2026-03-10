// ============================================================
// News Page — API-Sports Integration
// ============================================================

// Fallback static news data
const newsFallback = {
    en: [
        { category: 'Transfer', title: 'Star Player Signs with Manchester United', description: 'In a shocking move, the talented midfielder has joined the Red Devils on a five-year contract worth £80 million.', date: '2 hours ago', icon: '📰', type: 'transfers' },
        { category: 'International', title: 'World Cup Qualifiers: Exciting Matches Ahead', description: 'National teams prepare for crucial qualifying matches that will determine World Cup participants.', date: '5 hours ago', icon: '🌍', type: 'international' },
        { category: 'Local', title: 'Derby Match Ends in Dramatic Fashion', description: 'Last-minute goal secures victory in the most anticipated match of the season between city rivals.', date: '1 day ago', icon: '⚽', type: 'local' },
        { category: 'Transfer', title: 'Record Breaking Transfer Fee Announced', description: 'European giant breaks world record with £150 million signing of young superstar from South America.', date: '3 hours ago', icon: '💰', type: 'transfers' },
        { category: 'International', title: 'UEFA Champions League Draw Revealed', description: 'The draw for the Champions League knockout stages has produced some mouth-watering fixtures.', date: '6 hours ago', icon: '🏆', type: 'international' },
        { category: 'Local', title: 'Young Academy Star Makes First Team Debut', description: 'Local club celebrates as 17-year-old academy graduate scores on professional debut.', date: '12 hours ago', icon: '⭐', type: 'local' }
    ],
    ar: [
        { category: 'انتقالات', title: 'نجم كبير ينضم لمانشستر يونايتد', description: 'في خطوة مفاجئة، انضم لاعب الوسط الموهوب للشياطين الحمر بعقد لمدة خمس سنوات بقيمة 80 مليون جنيه.', date: 'منذ ساعتين', icon: '📰', type: 'transfers' },
        { category: 'دولية', title: 'تصفيات كأس العالم: مباريات مثيرة قادمة', description: 'المنتخبات الوطنية تستعد لمباريات حاسمة ستحدد المشاركين في كأس العالم.', date: 'منذ 5 ساعات', icon: '🌍', type: 'international' },
        { category: 'محلية', title: 'الديربي ينتهي بشكل دراماتيكي', description: 'هدف في الدقائق الأخيرة يحسم المباراة الأكثر انتظاراً في الموسم بين الغريمين.', date: 'منذ يوم', icon: '⚽', type: 'local' },
        { category: 'انتقالات', title: 'رسوم انتقال قياسية يتم الإعلان عنها', description: 'عملاق أوروبي يحطم الرقم القياسي العالمي بصفقة 150 مليون جنيه لنجم شاب من أمريكا الجنوبية.', date: 'منذ 3 ساعات', icon: '💰', type: 'transfers' },
        { category: 'دولية', title: 'الكشف عن قرعة دوري أبطال أوروبا', description: 'أسفرت قرعة دور الإقصاء من دوري الأبطال عن مواجهات مثيرة للغاية.', date: 'منذ 6 ساعات', icon: '🏆', type: 'international' },
        { category: 'محلية', title: 'نجم شاب من الأكاديمية يظهر لأول مرة', description: 'النادي المحلي يحتفل بتسجيل خريج الأكاديمية البالغ من العمر 17 عاماً في أول ظهور احترافي.', date: 'منذ 12 ساعة', icon: '⭐', type: 'local' }
    ]
};

let selectedCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            selectedCategory = this.getAttribute('data-category');
            loadNewsContent();
        });
    });
});

async function loadNewsContent() {
    const container = document.getElementById('newsGrid');
    if (!container) return;
    
    FootballAPI.showLoading(container);

    let newsItems = [];

    // Fetch today's fixtures and generate news from results
    const todayRaw = await FootballAPI.fetchTodayFixtures();
    if (todayRaw && todayRaw.length > 0) {
        const filteredRaw = FootballAPI.filterByAllowedLeagues(todayRaw);
        const finished = filteredRaw.filter(f => {
            const s = f.fixture?.status?.short || '';
            return ['FT', 'AET', 'PEN'].includes(s);
        });
        const live = filteredRaw.filter(f => {
            const s = f.fixture?.status?.short || '';
            return ['1H', '2H', 'HT', 'ET', 'P', 'BT', 'LIVE'].includes(s);
        });

        // Generate news from finished games
        const resultNews = finished
            .map(f => FootballAPI.fixtureToNews(f, currentLang))
            .filter(Boolean);
        
        // Generate news from live games
        const liveNews = live.map(f => {
            const m = FootballAPI.transformFixture(f);
            if (currentLang === 'ar') {
                return {
                    category: 'مباشر',
                    title: `${m.homeTeam} ${m.homeScore ?? 0} - ${m.awayScore ?? 0} ${m.awayTeam}`,
                    description: `مباراة جارية الآن في ${m.league} - الدقيقة ${m.time}`,
                    date: currentLang === 'ar' ? 'الآن' : 'Now',
                    icon: '🔴',
                    type: 'local',
                    homeLogo: m.homeLogo,
                    awayLogo: m.awayLogo
                };
            } else {
                return {
                    category: 'Live',
                    title: `${m.homeTeam} ${m.homeScore ?? 0} - ${m.awayScore ?? 0} ${m.awayTeam}`,
                    description: `Match in progress in ${m.league} - Minute ${m.time}`,
                    date: 'Now',
                    icon: '🔴',
                    type: 'local',
                    homeLogo: m.homeLogo,
                    awayLogo: m.awayLogo
                };
            }
        });

        newsItems = [...liveNews, ...resultNews];
    }

    // Try to add transfer news
    try {
        const transfers = await FootballAPI.fetchTransfers();
        if (transfers && transfers.length > 0) {
            const transferNews = transfers
                .slice(0, 3)
                .map(t => FootballAPI.transferToNews(t, currentLang))
                .filter(Boolean);
            newsItems = [...newsItems, ...transferNews];
        }
    } catch (e) {
        // Silently fail — transfers are optional
    }

    // Fallback to static data if no API data
    if (newsItems.length === 0) {
        newsItems = newsFallback[currentLang];
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
        newsItems = newsItems.filter(item => {
            if (selectedCategory === 'local') return item.type === 'local' || item.type === 'results';
            if (selectedCategory === 'international') return item.type === 'international' || item.type === 'results';
            if (selectedCategory === 'transfers') return item.type === 'transfers';
            return true;
        });
    }
    
    container.innerHTML = '';
    
    if (newsItems.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1 / -1;">
                <h3>${currentLang === 'en' ? 'No news found' : 'لا توجد أخبار'}</h3>
            </div>
        `;
        return;
    }
    
    newsItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animation = 'slideUp 0.6s ease-out backwards';
        card.style.animationDelay = `${index * 0.1}s`;

        // Show team logos if available from API
        let newsImageContent = item.icon;
        if (item.homeLogo && item.homeLogo.startsWith && item.homeLogo.startsWith('http')) {
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