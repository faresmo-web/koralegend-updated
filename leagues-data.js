// Leagues Data
const leaguesDatabase = {
    en: {
        premier: {
            name: 'Premier League',
            standings: [
                { rank: 1, team: 'Liverpool', icon: '🔴', played: 20, won: 15, drawn: 3, lost: 2, points: 48 },
                { rank: 2, team: 'Manchester City', icon: '🔵', played: 20, won: 14, drawn: 4, lost: 2, points: 46 },
                { rank: 3, team: 'Arsenal', icon: '🔴', played: 20, won: 13, drawn: 5, lost: 2, points: 44 },
                { rank: 4, team: 'Aston Villa', icon: '🔴', played: 20, won: 12, drawn: 3, lost: 5, points: 39 },
                { rank: 5, team: 'Tottenham', icon: '⚪', played: 20, won: 11, drawn: 4, lost: 5, points: 37 },
                { rank: 6, team: 'Manchester United', icon: '🔴', played: 20, won: 10, drawn: 5, lost: 5, points: 35 }
            ],
            scorers: [
                { rank: 1, name: 'Mohamed Salah', team: 'Liverpool', goals: 18 },
                { rank: 2, name: 'Erling Haaland', team: 'Man City', goals: 17 },
                { rank: 3, name: 'Bukayo Saka', team: 'Arsenal', goals: 14 },
                { rank: 4, name: 'Son Heung-min', team: 'Tottenham', goals: 13 },
                { rank: 5, name: 'Ollie Watkins', team: 'Aston Villa', goals: 12 }
            ]
        },
        laliga: {
            name: 'La Liga',
            standings: [
                { rank: 1, team: 'Real Madrid', icon: '⚪', played: 20, won: 16, drawn: 2, lost: 2, points: 50 },
                { rank: 2, team: 'Barcelona', icon: '🔴', played: 20, won: 14, drawn: 4, lost: 2, points: 46 },
                { rank: 3, team: 'Atletico Madrid', icon: '🔴', played: 20, won: 13, drawn: 3, lost: 4, points: 42 },
                { rank: 4, team: 'Girona', icon: '🔴', played: 20, won: 11, drawn: 5, lost: 4, points: 38 },
                { rank: 5, team: 'Athletic Bilbao', icon: '🔴', played: 20, won: 10, drawn: 4, lost: 6, points: 34 },
                { rank: 6, team: 'Real Sociedad', icon: '🔵', played: 20, won: 9, drawn: 6, lost: 5, points: 33 }
            ],
            scorers: [
                { rank: 1, name: 'Jude Bellingham', team: 'Real Madrid', goals: 16 },
                { rank: 2, name: 'Robert Lewandowski', team: 'Barcelona', goals: 15 },
                { rank: 3, name: 'Antoine Griezmann', team: 'Atletico', goals: 13 },
                { rank: 4, name: 'Artem Dovbyk', team: 'Girona', goals: 12 },
                { rank: 5, name: 'Álvaro Morata', team: 'Atletico', goals: 11 }
            ]
        },
        spl: {
            name: 'Saudi Pro League',
            standings: [
                { rank: 1, team: 'Al Hilal', icon: '🔵', played: 18, won: 16, drawn: 1, lost: 1, points: 49 },
                { rank: 2, team: 'Al Nassr', icon: '💛', played: 18, won: 13, drawn: 3, lost: 2, points: 42 },
                { rank: 3, team: 'Al Ittihad', icon: '⚫', played: 18, won: 12, drawn: 4, lost: 2, points: 40 },
                { rank: 4, team: 'Al Ahli', icon: '💚', played: 18, won: 11, drawn: 2, lost: 5, points: 35 },
                { rank: 5, team: 'Al Shabab', icon: '⚪', played: 18, won: 9, drawn: 5, lost: 4, points: 32 },
                { rank: 6, team: 'Al Taawoun', icon: '🔵', played: 18, won: 8, drawn: 4, lost: 6, points: 28 }
            ],
            scorers: [
                { rank: 1, name: 'Cristiano Ronaldo', team: 'Al Nassr', goals: 22 },
                { rank: 2, name: 'Aleksandar Mitrovic', team: 'Al Hilal', goals: 18 },
                { rank: 3, name: 'Karim Benzema', team: 'Al Ittihad', goals: 15 },
                { rank: 4, name: 'Roberto Firmino', team: 'Al Ahli', goals: 13 },
                { rank: 5, name: 'Malcom', team: 'Al Hilal', goals: 12 }
            ]
        },
        ucl: {
            name: 'Champions League',
            standings: [
                { rank: 1, team: 'Bayern Munich', icon: '🔴', played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
                { rank: 2, team: 'Real Madrid', icon: '⚪', played: 6, won: 5, drawn: 0, lost: 1, points: 15 },
                { rank: 3, team: 'Manchester City', icon: '🔵', played: 6, won: 4, drawn: 2, lost: 0, points: 14 },
                { rank: 4, team: 'Inter Milan', icon: '🔵', played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
                { rank: 5, team: 'Arsenal', icon: '🔴', played: 6, won: 4, drawn: 0, lost: 2, points: 12 },
                { rank: 6, team: 'Barcelona', icon: '🔴', played: 6, won: 3, drawn: 2, lost: 1, points: 11 }
            ],
            scorers: [
                { rank: 1, name: 'Harry Kane', team: 'Bayern', goals: 8 },
                { rank: 2, name: 'Jude Bellingham', team: 'Real Madrid', goals: 7 },
                { rank: 3, name: 'Erling Haaland', team: 'Man City', goals: 7 },
                { rank: 4, name: 'Kylian Mbappé', team: 'PSG', goals: 6 },
                { rank: 5, name: 'Lautaro Martínez', team: 'Inter', goals: 6 }
            ]
        }
    },
    ar: {
        premier: {
            name: 'الدوري الإنجليزي',
            standings: [
                { rank: 1, team: 'ليفربول', icon: '🔴', played: 20, won: 15, drawn: 3, lost: 2, points: 48 },
                { rank: 2, team: 'مانشستر سيتي', icon: '🔵', played: 20, won: 14, drawn: 4, lost: 2, points: 46 },
                { rank: 3, team: 'أرسنال', icon: '🔴', played: 20, won: 13, drawn: 5, lost: 2, points: 44 },
                { rank: 4, team: 'أستون فيلا', icon: '🔴', played: 20, won: 12, drawn: 3, lost: 5, points: 39 },
                { rank: 5, team: 'توتنهام', icon: '⚪', played: 20, won: 11, drawn: 4, lost: 5, points: 37 },
                { rank: 6, team: 'مانشستر يونايتد', icon: '🔴', played: 20, won: 10, drawn: 5, lost: 5, points: 35 }
            ],
            scorers: [
                { rank: 1, name: 'محمد صلاح', team: 'ليفربول', goals: 18 },
                { rank: 2, name: 'إيرلينج هالاند', team: 'مانشستر سيتي', goals: 17 },
                { rank: 3, name: 'بوكايو ساكا', team: 'أرسنال', goals: 14 },
                { rank: 4, name: 'سون هيونغ مين', team: 'توتنهام', goals: 13 },
                { rank: 5, name: 'أولي واتكينز', team: 'أستون فيلا', goals: 12 }
            ]
        },
        laliga: {
            name: 'الدوري الإسباني',
            standings: [
                { rank: 1, team: 'ريال مدريد', icon: '⚪', played: 20, won: 16, drawn: 2, lost: 2, points: 50 },
                { rank: 2, team: 'برشلونة', icon: '🔴', played: 20, won: 14, drawn: 4, lost: 2, points: 46 },
                { rank: 3, team: 'أتلتيكو مدريد', icon: '🔴', played: 20, won: 13, drawn: 3, lost: 4, points: 42 },
                { rank: 4, team: 'جيرونا', icon: '🔴', played: 20, won: 11, drawn: 5, lost: 4, points: 38 },
                { rank: 5, team: 'أتلتيك بلباو', icon: '🔴', played: 20, won: 10, drawn: 4, lost: 6, points: 34 },
                { rank: 6, team: 'ريال سوسيداد', icon: '🔵', played: 20, won: 9, drawn: 6, lost: 5, points: 33 }
            ],
            scorers: [
                { rank: 1, name: 'جود بيلينجهام', team: 'ريال مدريد', goals: 16 },
                { rank: 2, name: 'روبرت ليفاندوفسكي', team: 'برشلونة', goals: 15 },
                { rank: 3, name: 'أنطوان جريزمان', team: 'أتلتيكو', goals: 13 },
                { rank: 4, name: 'أرتيم دوفبيك', team: 'جيرونا', goals: 12 },
                { rank: 5, name: 'ألفارو موراتا', team: 'أتلتيكو', goals: 11 }
            ]
        },
        spl: {
            name: 'دوري روشن السعودي',
            standings: [
                { rank: 1, team: 'الهلال', icon: '🔵', played: 18, won: 16, drawn: 1, lost: 1, points: 49 },
                { rank: 2, team: 'النصر', icon: '💛', played: 18, won: 13, drawn: 3, lost: 2, points: 42 },
                { rank: 3, team: 'الاتحاد', icon: '⚫', played: 18, won: 12, drawn: 4, lost: 2, points: 40 },
                { rank: 4, team: 'الأهلي', icon: '💚', played: 18, won: 11, drawn: 2, lost: 5, points: 35 },
                { rank: 5, team: 'الشباب', icon: '⚪', played: 18, won: 9, drawn: 5, lost: 4, points: 32 },
                { rank: 6, team: 'التعاون', icon: '🔵', played: 18, won: 8, drawn: 4, lost: 6, points: 28 }
            ],
            scorers: [
                { rank: 1, name: 'كريستيانو رونالدو', team: 'النصر', goals: 22 },
                { rank: 2, name: 'ألكساندر ميتروفيتش', team: 'الهلال', goals: 18 },
                { rank: 3, name: 'كريم بنزيما', team: 'الاتحاد', goals: 15 },
                { rank: 4, name: 'روبرتو فيرمينو', team: 'الأهلي', goals: 13 },
                { rank: 5, name: 'مالكوم', team: 'الهلال', goals: 12 }
            ]
        },
        ucl: {
            name: 'دوري أبطال أوروبا',
            standings: [
                { rank: 1, team: 'بايرن ميونخ', icon: '🔴', played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
                { rank: 2, team: 'ريال مدريد', icon: '⚪', played: 6, won: 5, drawn: 0, lost: 1, points: 15 },
                { rank: 3, team: 'مانشستر سيتي', icon: '🔵', played: 6, won: 4, drawn: 2, lost: 0, points: 14 },
                { rank: 4, team: 'إنتر ميلان', icon: '🔵', played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
                { rank: 5, team: 'أرسنال', icon: '🔴', played: 6, won: 4, drawn: 0, lost: 2, points: 12 },
                { rank: 6, team: 'برشلونة', icon: '🔴', played: 6, won: 3, drawn: 2, lost: 1, points: 11 }
            ],
            scorers: [
                { rank: 1, name: 'هاري كين', team: 'بايرن', goals: 8 },
                { rank: 2, name: 'جود بيلينجهام', team: 'ريال مدريد', goals: 7 },
                { rank: 3, name: 'إيرلينج هالاند', team: 'مانشستر سيتي', goals: 7 },
                { rank: 4, name: 'كيليان مبابي', team: 'باريس', goals: 6 },
                { rank: 5, name: 'لاوتارو مارتينيز', team: 'إنتر', goals: 6 }
            ]
        }
    }
};

const leagueIdMap = {
    'premier': 39,
    'laliga': 140,
    'spl': 307,
    'ucl': 2,
    'egypt': 233,
    'caf': 12
};

let selectedLeague = 'premier';

document.addEventListener('DOMContentLoaded', function() {
    const leagueTabs = document.querySelectorAll('.league-tab');
    leagueTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            leagueTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            selectedLeague = this.getAttribute('data-league');
            loadLeaguesContent();
        });
    });
    
    // Initial load
    loadLeaguesContent();
});

async function loadLeaguesContent() {
    const leagueId = leagueIdMap[selectedLeague];
    
    // Show loading synchronously to give feedback
    FootballAPI.showLoading(document.getElementById('standingsTable'));
    FootballAPI.showLoading(document.getElementById('scorersList'));

    // Fetch data in parallel
    const [standingsResponse, scorersResponse] = await Promise.all([
        FootballAPI.fetchStandings(leagueId),
        FootballAPI.fetchTopScorers(leagueId)
    ]);

    loadStandingsTable(standingsResponse);
    loadTopScorers(scorersResponse);
}

function loadStandingsTable(apiData) {
    const container = document.getElementById('standingsTable');
    if (!container) return;
    
    let standings = [];
    let leagueName = '';
    let apiSeason = null;
    
    if (apiData && apiData.length > 0) {
        // Transform API Standings
        const league = apiData[0].league;
        leagueName = league.name;
        apiSeason = league.season;
        
        // Handle multi-group standings (like UCL)
        let rawStandings = league.standings[0];
        if (league.standings.length > 1) {
            rawStandings = league.standings.flat();
        }
        
        standings = rawStandings.map(s => ({
            rank: s.rank,
            team: s.team.name,
            icon: `<img src="${s.team.logo}" class="team-logo-mini" alt="${s.team.name}">`,
            played: s.all.played,
            won: s.all.win,
            drawn: s.all.draw,
            lost: s.all.lose,
            points: s.points,
            group: s.group
        }));
    } else {
        // Fallback
        const fallback = leaguesDatabase[currentLang][selectedLeague];
        if (fallback) {
            standings = fallback.standings;
            leagueName = fallback.name;
        }
    }

    if (standings.length === 0) {
        FootballAPI.showError(container, currentLang);
        return;
    }

    container.innerHTML = '';
    
    // Season Badge
    const badge = document.createElement('div');
    badge.className = 'season-badge';
    
    const currentCalculatedSeason = new Date().getMonth() < 6 ? new Date().getFullYear() - 1 : new Date().getFullYear();
    const displaySeason = apiSeason || 2024;
    const isFallback = displaySeason < currentCalculatedSeason;
    
    let seasonText = currentLang === 'en' ? `Season ${displaySeason}/${displaySeason+1}` : `موسم ${displaySeason}/${displaySeason+1}`;
    if (isFallback) {
        seasonText += currentLang === 'en' ? ' (API Limit)' : ' (حد الـ API)';
    }
    
    badge.innerHTML = seasonText;
    container.appendChild(badge);
    
    // Header
    const header = document.createElement('div');
    header.className = 'table-row table-header';
    header.innerHTML = `
        <div class="rank">#</div>
        <div>${currentLang === 'en' ? 'Team' : 'الفريق'}</div>
        <div class="stat">${currentLang === 'en' ? 'P' : 'لعب'}</div>
        <div class="stat">${currentLang === 'en' ? 'W' : 'فاز'}</div>
        <div class="stat">${currentLang === 'en' ? 'D' : 'تعادل'}</div>
        <div class="stat">${currentLang === 'en' ? 'Pts' : 'نقاط'}</div>
    `;
    container.appendChild(header);
    
    // Standings rows (limit to top 15 or so for better UI)
    standings.slice(0, 18).forEach((team, index) => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.style.animation = 'slideUp 0.4s ease-out backwards';
        row.style.animationDelay = `${index * 0.05}s`;
        
        row.innerHTML = `
            <div class="rank">${team.rank}</div>
            <div class="team-info">
                <span class="team-icon">${team.icon}</span>
                <div class="team-details">
                    <span class="team-name">${team.team}</span>
                    ${team.group ? `<span class="team-group">${team.group}</span>` : ''}
                </div>
            </div>
            <div class="stat">${team.played}</div>
            <div class="stat">${team.won}</div>
            <div class="stat">${team.drawn}</div>
            <div class="stat"><strong>${team.points}</strong></div>
        `;
        
        container.appendChild(row);
    });
}

function loadTopScorers(apiData) {
    const container = document.getElementById('scorersList');
    if (!container) return;
    
    let scorers = [];

    if (apiData && apiData.length > 0) {
        // Transform API Top Scorers
        scorers = apiData.slice(0, 10).map((s, index) => ({
            rank: index + 1,
            name: s.player.name,
            team: s.statistics[0].team.name,
            goals: s.statistics[0].goals.total
        }));
    } else {
        // Fallback
        const fallback = leaguesDatabase[currentLang][selectedLeague];
        if (fallback) scorers = fallback.scorers;
    }

    if (scorers.length === 0) {
        FootballAPI.showError(container, currentLang);
        return;
    }

    container.innerHTML = '';
    
    scorers.forEach((scorer, index) => {
        const item = document.createElement('div');
        item.className = 'scorer-item';
        item.style.animation = 'slideUp 0.4s ease-out backwards';
        item.style.animationDelay = `${index * 0.05}s`;
        
        item.innerHTML = `
            <div class="scorer-info">
                <div class="scorer-rank">${scorer.rank}</div>
                <div>
                    <div class="scorer-name">${scorer.name}</div>
                    <div class="scorer-team">${scorer.team}</div>
                </div>
            </div>
            <div class="scorer-goals">${scorer.goals}</div>
        `;
        
        container.appendChild(item);
    });
}