// Legends Data
const legendsDatabase = {
    en: {
        all: [
            {
                name: 'Pelé',
                position: 'Forward',
                nationality: 'Brazilian',
                icon: '👑',
                bio: 'Widely regarded as one of the greatest players of all time, Pelé revolutionized football with his extraordinary skill, vision, and goal-scoring ability.',
                achievements: [
                    '3× FIFA World Cup winner (1958, 1962, 1970)',
                    '1,283 career goals in 1,363 games',
                    '6× Brazilian league champion',
                    'FIFA Player of the Century'
                ],
                type: 'international'
            },
            {
                name: 'Diego Maradona',
                position: 'Attacking Midfielder',
                nationality: 'Argentine',
                icon: '⚽',
                bio: 'A magician with the ball at his feet, Maradona is remembered for his incredible dribbling skills, creativity, and leadership on the pitch.',
                achievements: [
                    'FIFA World Cup winner 1986',
                    '2× Serie A champion with Napoli',
                    'FIFA Goal of the Century',
                    'Argentine Football Legend'
                ],
                type: 'international'
            },
            {
                name: 'Cristiano Ronaldo',
                position: 'Forward',
                nationality: 'Portuguese',
                icon: '🌟',
                bio: 'One of the most complete players in history, known for his athleticism, goal-scoring records, and incredible work ethic.',
                achievements: [
                    '5× UEFA Champions League winner',
                    '5× Ballon d\'Or winner',
                    '800+ career goals',
                    'UEFA European Championship winner'
                ],
                type: 'international'
            },
            {
                name: 'Lionel Messi',
                position: 'Forward',
                nationality: 'Argentine',
                icon: '🐐',
                bio: 'Arguably the greatest player ever, Messi combines extraordinary dribbling, vision, and finishing with remarkable consistency.',
                achievements: [
                    '8× Ballon d\'Or winner',
                    'FIFA World Cup winner 2022',
                    '4× UEFA Champions League winner',
                    '800+ career goals'
                ],
                type: 'international'
            },
            {
                name: 'Majed Abdullah',
                position: 'Forward',
                nationality: 'Saudi Arabian',
                icon: '👑',
                bio: 'The Arabian Jewel, one of the greatest Asian footballers of all time and a Saudi Arabian legend.',
                achievements: [
                    '3× Asian Footballer of the Year',
                    'Saudi League top scorer 6 times',
                    'Led Al-Nassr to multiple titles',
                    'International goal-scoring record'
                ],
                type: 'local'
            },
            {
                name: 'Sami Al-Jaber',
                position: 'Forward',
                nationality: 'Saudi Arabian',
                icon: '⭐',
                bio: 'A prolific striker and one of Saudi Arabia\'s most decorated players, known for his clinical finishing.',
                achievements: [
                    '4× FIFA World Cup participant',
                    'Saudi League top scorer 5 times',
                    'Asian Cup winner',
                    '156 international appearances'
                ],
                type: 'local'
            }
        ]
    },
    ar: {
        all: [
            {
                name: 'بيليه',
                position: 'مهاجم',
                nationality: 'برازيلي',
                icon: '👑',
                bio: 'يعتبر على نطاق واسع واحداً من أعظم اللاعبين على الإطلاق، أحدث بيليه ثورة في كرة القدم بمهاراته الاستثنائية ورؤيته وقدرته على تسجيل الأهداف.',
                achievements: [
                    'بطل كأس العالم 3 مرات (1958، 1962، 1970)',
                    '1,283 هدف في 1,363 مباراة',
                    'بطل الدوري البرازيلي 6 مرات',
                    'لاعب القرن من الفيفا'
                ],
                type: 'international'
            },
            {
                name: 'دييغو مارادونا',
                position: 'صانع ألعاب',
                nationality: 'أرجنتيني',
                icon: '⚽',
                bio: 'ساحر بالكرة، يُذكر مارادونا بمهاراته المذهلة في المراوغة والإبداع والقيادة في الملعب.',
                achievements: [
                    'بطل كأس العالم 1986',
                    'بطل الدوري الإيطالي مع نابولي مرتين',
                    'هدف القرن من الفيفا',
                    'أسطورة كرة القدم الأرجنتينية'
                ],
                type: 'international'
            },
            {
                name: 'كريستيانو رونالدو',
                position: 'مهاجم',
                nationality: 'برتغالي',
                icon: '🌟',
                bio: 'واحد من أكثر اللاعبين اكتمالاً في التاريخ، معروف بقدراته البدنية وأرقامه القياسية وأخلاقيات العمل المذهلة.',
                achievements: [
                    'بطل دوري أبطال أوروبا 5 مرات',
                    'الكرة الذهبية 5 مرات',
                    'أكثر من 800 هدف',
                    'بطل أوروبا'
                ],
                type: 'international'
            },
            {
                name: 'ليونيل ميسي',
                position: 'مهاجم',
                nationality: 'أرجنتيني',
                icon: '🐐',
                bio: 'يمكن القول أنه أعظم لاعب على الإطلاق، يجمع ميسي بين المراوغة الاستثنائية والرؤية والتسديد مع الاتساق الملحوظ.',
                achievements: [
                    'الكرة الذهبية 8 مرات',
                    'بطل كأس العالم 2022',
                    'بطل دوري أبطال أوروبا 4 مرات',
                    'أكثر من 800 هدف'
                ],
                type: 'international'
            },
            {
                name: 'ماجد عبدالله',
                position: 'مهاجم',
                nationality: 'سعودي',
                icon: '👑',
                bio: 'الجوهرة العربية، واحد من أعظم لاعبي آسيا على الإطلاق وأسطورة سعودية.',
                achievements: [
                    'لاعب آسيا 3 مرات',
                    'هداف الدوري السعودي 6 مرات',
                    'قاد النصر لعدة بطولات',
                    'رقم قياسي في التسجيل الدولي'
                ],
                type: 'local'
            },
            {
                name: 'سامي الجابر',
                position: 'مهاجم',
                nationality: 'سعودي',
                icon: '⭐',
                bio: 'مهاجم غزير الإنتاج وأحد أكثر اللاعبين السعوديين تتويجاً، معروف بتسديداته الدقيقة.',
                achievements: [
                    'مشارك في 4 بطولات كأس عالم',
                    'هداف الدوري السعودي 5 مرات',
                    'بطل كأس آسيا',
                    '156 مباراة دولية'
                ],
                type: 'local'
            }
        ]
    }
};

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
    
    if (legends.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1 / -1;">
                <h3>${currentLang === 'en' ? 'No legends found' : 'لا توجد أساطير'}</h3>
            </div>
        `;
        return;
    }
    
    legends.forEach((legend, index) => {
        const card = document.createElement('div');
        card.className = 'legend-card';
        card.style.animation = 'slideUp 0.6s ease-out backwards';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const achievementsList = legend.achievements
            .map(achievement => `<li>${achievement}</li>`)
            .join('');
        
        card.innerHTML = `
            <div class="legend-image">${legend.icon}</div>
            <div class="legend-content">
                <h3 class="legend-name">${legend.name}</h3>
                <div class="legend-position">${legend.position} • ${legend.nationality}</div>
                <p class="legend-bio">${legend.bio}</p>
                <div class="legend-achievements">
                    <h4 class="achievement-title">${currentLang === 'en' ? 'Achievements' : 'الإنجازات'}</h4>
                    <ul class="achievement-list">
                        ${achievementsList}
                    </ul>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}