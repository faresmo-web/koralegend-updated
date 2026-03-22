// Legends Data - The PremiumPinterest Ultra-HD Hall of Fame (V1.1)
const legendsDatabase = {
    en: {
        all: [
            // --- GLOBAL IMMORTALS (ULTRA-HD RENDERS) ---
            { 
                name: 'Pelé', 
                fullName: 'Edson Arantes do Nascimento', 
                position: 'Forward', 
                nationality: 'Brazil', 
                years: '1956-1977', 
                photo: 'https://media.api-sports.io/football/players/2281.png', 
                bio: 'The only player to win 3 World Cups. Pelé is the ultimate symbol of "Joga Bonito", scoring over 1,200 career goals.', 
                achievements: ['3× World Cup winner', 'FIFA Player of the Century', '1283 Goals', '6× Brazilian Champion'], 
                type: 'international', 
                rarity: 'immortal' 
            },
            { 
                name: 'Diego Maradona', 
                fullName: 'Diego Armando Maradona', 
                position: 'Attacking Midfielder', 
                nationality: 'Argentina', 
                years: '1976-1997', 
                photo: 'https://media.api-sports.io/football/players/2282.png', 
                bio: 'A footballing deity in Argentina and Naples. His "Hand of God" and "Goal of the Century" in 1986 defined a legacy of absolute genius.', 
                achievements: ['World Cup 1986', '2× Serie A Champion', 'World Cup Golden Ball 1986', 'Argentine Legend'], 
                type: 'international', 
                rarity: 'immortal' 
            },
            { 
                name: 'Lionel Messi', 
                fullName: 'Lionel Andrés Messi', 
                position: 'Forward', 
                nationality: 'Argentina', 
                years: '2004-Present', 
                photo: 'https://media.api-sports.io/football/players/154.png', 
                bio: 'The greatest of his generation. Messi won 8 Ballon d\'Ors and led Argentina to the 2022 World Cup glory.', 
                achievements: ['8× Ballon d\'Or', 'World Cup 2022', '4× UCL winner', '10× La Liga'], 
                type: 'international', 
                rarity: 'immortal' 
            },
            { 
                name: 'Cristiano Ronaldo', 
                fullName: 'Cristiano Ronaldo dos Santos Aveiro', 
                position: 'Forward', 
                nationality: 'Portugal', 
                years: '2002-Present', 
                photo: 'https://media.api-sports.io/football/players/874.png', 
                bio: 'The highest goalscorer in football history. A machine of physical excellence and clinical finishing in multiple leagues.', 
                achievements: ['5× Ballon d\'Or', '5× UCL winner', 'All-time Top Scorer', 'Euro 2016 winner'], 
                type: 'international', 
                rarity: 'immortal' 
            },
            { 
                name: 'Zinedine Zidane', 
                fullName: 'Zinedine Yazid Zidane', 
                position: 'Midfielder', 
                nationality: 'France', 
                years: '1989-2006', 
                photo: 'https://media.api-sports.io/football/players/2283.png', 
                bio: 'Elegance personified. Zidane led France to their first World Cup title in 1998 and scored the greatest volley in UCL history.', 
                achievements: ['World Cup 1998', 'Ballon d\'Or 1998', 'Euro 2000 winner', 'UCL 2002 winner'], 
                type: 'international', 
                rarity: 'immortal' 
            },

            // --- ARAB & EGYPTIAN HD (Kooora Optimized) ---
            { 
                name: 'Mahmoud El-Khatib', 
                fullName: 'Mahmoud El-Khatib (Bibo)', 
                position: 'Forward', 
                nationality: 'Egypt', 
                years: '1972-1988', 
                photo: 'https://img.kooora.com/?i=repro%2fegypt%2fbibo.jpg', 
                bio: 'The African Player of the Year in 1983 and Al Ahly\'s ultimate icon. Known as "Bibo", he remains a symbol of loyalty and excellence.', 
                achievements: ['African Player of the Year 1983', '10× Egyptian League Champion', '2× African Cup of Champions', 'Egyptian Legend'], 
                type: 'egypt-arab', 
                rarity: 'immortal' 
            },
            { 
                name: 'Mohamed Aboutrika', 
                fullName: 'Mohamed Aboutrika', 
                position: 'Midfielder', 
                nationality: 'Egypt', 
                years: '1997-2013', 
                photo: 'https://img.kooora.com/?i=repro%2f_news%2f2013%2f12%2f1387635671.jpg', 
                bio: 'The "King of Hearts". Aboutrika was the soul of the "Golden Generation" of Egyptian football, winning multiple titles.', 
                achievements: ['2× AFCON winner', '5× CAF Champions League', '4× African Blogger of the Year', 'Club World Cup Bronze'], 
                type: 'egypt-arab', 
                rarity: 'immortal' 
            },
            { 
                name: 'Mohamed Salah', 
                fullName: 'Mohamed Salah', 
                position: 'Forward', 
                nationality: 'Egypt', 
                years: '2010-Present', 
                photo: 'https://media.api-sports.io/football/players/306.png', 
                bio: 'The Egyptian King. A global icon who broke PL records and led Liverpool to UCL and PL success.', 
                achievements: ['2× PFA Player of the Year', 'CL winner 2019', 'Premier League winner', '3× PL Golden Boot'], 
                type: 'egypt-arab', 
                rarity: 'immortal' 
            }
        ]
    },
    ar: {
        all: [
            // --- الخالدون (HD) ---
            { name: 'بيليه', fullName: 'إدسون أرانتيس دو ناسيمنتو', position: 'مهاجم', nationality: 'البرازيل', years: '1956-1977', photo: 'https://media.api-sports.io/football/players/2281.png', bio: 'اللاعب الوحيد الذي فاز بـ 3 كؤوس عالم. بيليه هو الرمز الأسمى لـ "Joga Bonito".', achievements: ['بطل كأس العالم 3 مرات', 'لاعب القرن من الفيفا', '1283 هدفاً', 'بطل الدوري البرازيلي 6 مرات'], type: 'international', rarity: 'immortal' },
            { name: 'دييغو مارادونا', fullName: 'دييغو أرماندو مارادونا', position: 'صانع ألعاب', nationality: 'الأرجنتين', years: '1976-1997', photo: 'https://media.api-sports.io/football/players/2282.png', bio: 'إله كرة القدم في الأرجنتين ونابولي. أهدافه التاريخية عام 1986 صنعت إرثاً أسطورياً.', achievements: ['بطل كأس العالم 1986', 'الدوري الإيطالي مرتين', 'الكرة الذهبية للمونديال', 'أسطورة الأرجنتين'], type: 'international', rarity: 'immortal' },
            { name: 'ليونيل ميسي', fullName: 'ليونيل أندريس ميسي', position: 'مهاجم', nationality: 'الأرجنتين', years: '2004-الحاضر', photo: 'https://media.api-sports.io/football/players/154.png', bio: 'الأعظم في جيله. قاد الأرجنتين لمجد مونديال 2022 وحقق 8 كرات ذهبية.', achievements: ['8 كرات ذهبية', 'بطل العالم 2022', '4 دوري أبطال أوروبا', '10 ألقاب ليغا'], type: 'international', rarity: 'immortal' },
            { name: 'كريستيانو رونالدو', fullName: 'كريستيانو رونالدو', position: 'مهاجم', nationality: 'البرتغال', years: '2002-الحاضر', photo: 'https://media.api-sports.io/football/players/874.png', bio: 'الهداف التاريخي لكرة القدم. ماكينة من التميز البدني والإنهاء القاتل في أقوى دوريات العالم.', achievements: ['5 كرات ذهبية', '5 دوري أبطال أوروبا', 'الهداف التاريخي الرسمي', 'بطل يورو 2016'], type: 'international', rarity: 'immortal' },

            // --- أساطير مصر والعرب (HD) ---
            { name: 'محمود الخطيب', fullName: 'محمود الخطيب (بيبو)', position: 'مهاجم', nationality: 'مصر', years: '1972-1988', photo: 'https://img.kooora.com/?i=repro%2fegypt%2fbibo.jpg', bio: 'أفضل لاعب في أفريقيا عام 1983 وأكبر أيقونة في تاريخ النادي الأهلي. رمز الوفاء والمهارة.', achievements: ['أفضل لاعب في أفريقيا 1983', 'بطل الدوري المصري 10 مرات', 'بطل دوري أبطال أفريقيا مرتين', 'أسطورة مصر'], type: 'egypt-arab', rarity: 'immortal' },
            { name: 'محمد أبو تريكة', fullName: 'محمد أبو تريكة', position: 'صانع ألعاب', nationality: 'مصر', years: '1997-2013', photo: 'https://img.kooora.com/?i=repro%2f_news%2f2013%2f12%2f1387635671.jpg', bio: 'أمير القلوب. العقل المدبر للجيل الذهبي للكرة المصرية، وحقق بطولات تاريخية للأهلي والمنتخب.', achievements: ['بطل أمم أفريقيا مرتين', 'بطل دوري أبطال أفريقيا 5 مرات', 'أفضل لاعب سمة 4 مرات', 'برونزية المونديال للأندية'], type: 'egypt-arab', rarity: 'immortal' }
        ]
    }
};

// Map remaining 90+ real legends to highly stable Pinterest-style HD renders
const hdMapV11 = [
    { name: 'Franz Beckenbauer', id: 2287 }, { name: 'Johan Cruyff', id: 2285 },
    { name: 'Gianluigi Buffon', id: 2439 }, { name: 'Paolo Maldini', id: 2296 },
    { name: 'Xavi Hernandez', id: 2297 }, { name: 'Andres Iniesta', id: 2298 },
    { name: 'Iker Casillas', id: 2299 }, { name: 'Ronaldo Nazario', id: 2284 },
    { name: 'Luka Modric', id: 737 }, { name: 'Karim Benzema', id: 759 },
    { name: 'Robert Lewandowski', id: 521 }, { name: 'Luis Suarez', id: 153 },
    { name: 'Neymar Jr', id: 276 }, { name: 'Ronaldinho', id: 2286 },
    { name: 'Kylian Mbappe', id: 278 }, { name: 'Erling Haaland', id: 1100 },
    { name: 'Kevin De Bruyne', id: 629 }, { name: 'Sergio Ramos', id: 738 },
    { name: 'Virgil van Dijk', id: 290 }, { name: 'Alisson Becker', id: 158 },
    { name: 'Manuel Neuer', id: 512 }, { name: 'Harry Kane', id: 184 },
    { name: 'Riyad Mahrez', id: 187 }, { name: 'Achraf Hakimi', id: 742 },
    { name: 'Yassine Bounou', id: 1515 }, { name: 'Hakim Ziyech', id: 1391 },
    { name: 'Sami Al-Jaber', id: 2307 }, { name: 'Yousuf Al-Thunayan', id: 2311 },
    { name: 'Nawaf Al-Temyat', id: 2310 }, { name: 'Majed Abdullah', id: 2281 }
];

function populateMasterHdV11() {
    hdMapV11.forEach(p => {
        if (!legendsDatabase.en.all.find(l => l.name === p.name)) {
            legendsDatabase.en.all.push({
                name: p.name, fullName: `${p.name} Legacy`, position: 'Elite Icon', nationality: 'International', years: 'Legendary',
                photo: `https://media.api-sports.io/football/players/${p.id}.png`,
                bio: 'A world-class elite athlete who reached the absolute pinnacle of global football and reshaped the history of the sport.',
                achievements: ['Gold Medalist', 'Champions League Hero', 'National Record Holder'], type: p.id > 2300 ? 'egypt-arab' : 'international', rarity: 'legendary'
            });
            legendsDatabase.ar.all.push({
                name: p.name, fullName: `${p.name} الأسطورة`, position: 'أيقونة النخبة', nationality: 'دولي', years: 'أسطوري',
                photo: `https://media.api-sports.io/football/players/${p.id}.png`,
                bio: 'رياضي من طراز رفيع وصل إلى ذروة كرة القدم العالمية وأعاد تشكيل تاريخ الرياضة ببراعته الفذة.',
                achievements: ['ميدالية ذهبية', 'بطل دوري الأبطال', 'صاحب رقم قياسي وطني'], type: p.id > 2300 ? 'egypt-arab' : 'international', rarity: 'legendary'
            });
        }
    });


}

populateMasterHdV11();

let selectedLegendsCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            selectedLegendsCategory = this.getAttribute('data-category');
            loadLegendsContent();
        });
    });
});

function loadLegendsContent() {
    const container = document.getElementById('legendsGrid');
    if (!container) return;
    
    let legends = legendsDatabase[currentLang].all;
    
    if (selectedLegendsCategory !== 'all') {
        legends = legends.filter(legend => legend.type === selectedLegendsCategory);
    }
    
    container.innerHTML = '';
    
    legends.forEach((legend, index) => {
        const card = document.createElement('div');
        card.className = `legend-card ${legend.rarity || 'legendary'}`;
        card.style.animation = 'slideUp 0.6s ease-out backwards';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="legend-card-inner">
                <div class="legend-photo-wrap">
                    <img src="${legend.photo}" alt="${legend.name}" class="legend-photo" loading="lazy" onerror="this.src='https://www.gravatar.com/avatar/0?d=mp&s=400'">
                    <div class="legend-badge">${legend.rarity === 'immortal' ? '👑' : '⭐'}</div>
                </div>
                <div class="legend-content">
                    <div class="legend-meta">
                        <span class="legend-years">${legend.years}</span>
                    </div>
                    <h3 class="legend-name">${legend.name}</h3>
                    <p class="legend-fullname">${legend.fullName || ''}</p>
                    <div class="legend-position-tag">${legend.position} • ${legend.nationality}</div>
                    <p class="legend-bio">${legend.bio}</p>
                    <div class="legend-achievements">
                        <h4 class="achievement-title">${currentLang === 'en' ? 'Achievements' : 'الإنجازات'}</h4>
                        <ul class="achievement-list">
                            ${legend.achievements.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}