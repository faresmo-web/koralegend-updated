// ============================================================
// Match Detail Modal — Pitch Lineup, Events, Stats
// ============================================================

// ── Fallback match detail data ──
const matchDetailFallback = {
    en: {
        'Liverpool-Manchester City': { /* ... existing Liverpool data ... */ },
        'Al Ahly-Zamalek': {
            formation: { home: '4-3-3', away: '4-2-3-1' },
            homeLineup: [
                { name: 'Mohamed El Shenawy', number: 1, pos: 'G' },
                { name: 'Mohamed Hany', number: 30, pos: 'D' }, { name: 'Ramy Rabia', number: 5, pos: 'D' }, { name: 'Mohamed Abdelmonem', number: 24, pos: 'D' }, { name: 'Ali MaâlouL', number: 21, pos: 'D' },
                { name: 'Marwan Attia', number: 13, pos: 'M' }, { name: 'Emam Ashour', number: 22, pos: 'M' }, { name: 'Afsha', number: 19, pos: 'M' },
                { name: 'Percy Tau', number: 10, pos: 'F' }, { name: 'Wessam Abou Ali', number: 9, pos: 'F' }, { name: 'Hussein El Shahat', number: 14, pos: 'F' }
            ],
            awayLineup: [
                { name: 'Mohamed Sobhy', number: 16, pos: 'G' },
                { name: 'Omar Gaber', number: 4, pos: 'D' }, { name: 'Hamza Mathlouthi', number: 24, pos: 'D' }, { name: 'Hossam Abdelmaguid', number: 36, pos: 'D' }, { name: 'Ahmed Fatouh', number: 29, pos: 'D' },
                { name: 'Nabil Dounga', number: 8, pos: 'M' }, { name: 'Abdallah El Said', number: 19, pos: 'M' },
                { name: 'Ahmed Zizo', number: 25, pos: 'M' }, { name: 'Nasser Maher', number: 10, pos: 'M' }, { name: 'Mostafa Shalaby', number: 11, pos: 'M' },
                { name: 'Seif Jaziri', number: 30, pos: 'F' }
            ],
            events: [{ minute: 45, type: 'Goal', team: 'home', player: 'Afsha', detail: 'Normal Goal' }],
            statistics: [{ label: 'Possession', home: '55%', away: '45%', homeVal: 55, awayVal: 45 }]
        },
        'Pyramids FC-FAR Rabat': {
            formation: { home: '4-3-3', away: '4-3-3' },
            homeLineup: [
                { name: 'Ahmed El Shenawy', number: 1, pos: 'G' },
                { name: 'Mohamed Chibi', number: 17, pos: 'D' }, { name: 'Ahmed Samy', number: 4, pos: 'D' }, { name: 'Osama Galal', number: 6, pos: 'D' }, { name: 'Karim Hafez', number: 29, pos: 'D' },
                { name: 'Blati Touré', number: 21, pos: 'M' }, { name: 'Walid El Karti', number: 18, pos: 'M' }, { name: 'Mohanad Lasheen', number: 20, pos: 'M' },
                { name: 'Mostafa Fathi', number: 11, pos: 'F' }, { name: 'Fiston Mayele', number: 9, pos: 'F' }, { name: 'Ramadan Sobhi', number: 10, pos: 'F' }
            ],
            awayLineup: [
                { name: 'Ayoub Lakred', number: 1, pos: 'G' },
                { name: 'Mohamed Moufid', number: 2, pos: 'D' }, { name: 'Diney Borges', number: 5, pos: 'D' }, { name: 'Anouar Tarkhatt', number: 15, pos: 'D' }, { name: 'Emmanuel Imanishimwe', number: 26, pos: 'D' },
                { name: 'Larbi Naji', number: 6, pos: 'M' }, { name: 'Mohamed Rabie Hrimat', number: 10, pos: 'M' }, { name: 'Zineadine Derrag', number: 34, pos: 'M' },
                { name: 'Reda Slim', number: 7, pos: 'F' }, { name: 'Hamza Igamane', number: 11, pos: 'F' }, { name: 'Ahmed Hammoudan', number: 17, pos: 'F' }
            ],
            events: [{ minute: 65, type: 'Goal', team: 'home', player: 'Fiston Mayele', detail: 'Normal Goal' }],
            statistics: [{ label: 'Possession', home: '52%', away: '48%', homeVal: 52, awayVal: 48 }]
        }
    },
    ar: {
        'الأهلي-الزمالك': {
            formation: { home: '4-3-3', away: '4-2-3-1' },
            homeLineup: [
                { enName: 'Mohamed El Shenawy', name: 'محمد الشناوي', number: 1, pos: 'G' },
                { enName: 'Mohamed Hany', name: 'محمد هاني', number: 30, pos: 'D' }, { enName: 'Ramy Rabia', name: 'رامي ربيعة', number: 5, pos: 'D' }, { enName: 'Mohamed Abdelmonem', name: 'محمد عبد المنعم', number: 24, pos: 'D' }, { enName: 'Ali Maaloul', name: 'علي معلول', number: 21, pos: 'D' },
                { enName: 'Marwan Attia', name: 'مروان عطية', number: 13, pos: 'M' }, { enName: 'Emam Ashour', name: 'إمام عاشور', number: 22, pos: 'M' }, { enName: 'Afsha', name: 'أفشة', number: 19, pos: 'M' },
                { enName: 'Percy Tau', name: 'بيرسي تاو', number: 10, pos: 'F' }, { enName: 'Wessam Abou Ali', name: 'وسام أبو علي', number: 9, pos: 'F' }, { enName: 'Hussein El Shahat', name: 'حسين الشحات', number: 14, pos: 'F' }
            ],
            awayLineup: [
                { enName: 'Mohamed Sobhy', name: 'محمد صبحي', number: 16, pos: 'G' },
                { enName: 'Omar Gaber', name: 'عمر جابر', number: 4, pos: 'D' }, { enName: 'Hamza Mathlouthi', name: 'حمزة المثلوثي', number: 24, pos: 'D' }, { enName: 'Hossam Abdelmaguid', name: 'حسام عبد المجيد', number: 36, pos: 'D' }, { enName: 'Ahmed Fatouh', name: 'أحمد فتوح', number: 29, pos: 'D' },
                { enName: 'Nabil Emad Dunga', name: 'نبيل دونجا', number: 8, pos: 'M' }, { enName: 'Abdallah El Said', name: 'عبد الله السعيد', number: 19, pos: 'M' },
                { enName: 'Ahmed Sayed Zizo', name: 'أحمد زيزو', number: 25, pos: 'M' }, { enName: 'Nasser Maher', name: 'ناصر ماهر', number: 10, pos: 'M' }, { enName: 'Mostafa Shalaby', name: 'مصطفى شلبي', number: 11, pos: 'M' },
                { enName: 'Seifeddine Jaziri', name: 'سيف الجزيري', number: 30, pos: 'F' }
            ],
            events: [{ minute: 45, type: 'Goal', team: 'home', player: 'أفشة', detail: 'هدف' }],
            statistics: [{ label: 'الاستحواذ', home: '55%', away: '45%', homeVal: 55, awayVal: 45 }]
        },
        'بيراميدز-الجيش الملكي': {
            formation: { home: '4-3-3', away: '4-3-3' },
            homeLineup: [
                { enName: 'Ahmed El Shenawy', name: 'أحمد الشناوي', number: 1, pos: 'G' },
                { enName: 'Mohamed Chibi', name: 'محمد شيبي', number: 17, pos: 'D' }, { enName: 'Ahmed Samy', name: 'أحمد سامي', number: 4, pos: 'D' }, { enName: 'Osama Galal', name: 'أسامة جلال', number: 6, pos: 'D' }, { enName: 'Karim Hafez', name: 'كريم حافظ', number: 29, pos: 'D' },
                { enName: 'Blati Touré', name: 'بلاتي توريه', number: 21, pos: 'M' }, { enName: 'Walid El Karti', name: 'وليد الكرتي', number: 18, pos: 'M' }, { enName: 'Mohanad Lasheen', name: 'مهند لاشين', number: 20, pos: 'M' },
                { enName: 'Mostafa Fathi', name: 'مصطفى فتحي', number: 11, pos: 'F' }, { enName: 'Fiston Mayele', name: 'فيستون ماييلي', number: 9, pos: 'F' }, { enName: 'Ramadan Sobhi', name: 'رمضان صبحي', number: 10, pos: 'F' }
            ],
            awayLineup: [
                { enName: 'Ayoub Lakred', name: 'أيوب لكرد', number: 1, pos: 'G' },
                { enName: 'Mohamed Moufid', name: 'محمد مفيد', number: 2, pos: 'D' }, { enName: 'Diney Borges', name: 'ديني بورغيس', number: 5, pos: 'D' }, { enName: 'Anouar Tarkhatt', name: 'أنور ترخات', number: 15, pos: 'D' }, { enName: 'Emmanuel Imanishimwe', name: 'إيمانويل إيمانشيموي', number: 26, pos: 'D' },
                { enName: 'Larbi Naji', name: 'العربي الناجي', number: 6, pos: 'M' }, { enName: 'Mohamed Rabie Hrimat', name: 'محمد ربيع حريمات', number: 10, pos: 'M' }, { enName: 'Zineadine Derrag', name: 'زين الدين دراج', number: 34, pos: 'M' },
                { enName: 'Achraf Bencharki', name: 'أشرف بن شرقي', number: 7, pos: 'F' }, { enName: 'Hamza Igamane', name: 'حمزة إغمان', number: 11, pos: 'F' }, { enName: 'Ahmed Hammoudan', name: 'أحمد حمودان', number: 17, pos: 'F' }
            ],
            events: [{ minute: 65, type: 'Goal', team: 'home', player: 'فيستون ماييلي', detail: 'هدف' }],
            statistics: [{ label: 'الاستحواذ', home: '52%', away: '48%', homeVal: 52, awayVal: 48 }]
        }
    }
};

// ── Formation position maps (percentage-based for pitch drawing) ──
const formationPositions = {
    '4-3-3': [
        { x: 50, y: 92 },   // GK
        { x: 15, y: 72 }, { x: 38, y: 76 }, { x: 62, y: 76 }, { x: 85, y: 72 }, // DEF
        { x: 25, y: 52 }, { x: 50, y: 56 }, { x: 75, y: 52 }, // MID
        { x: 20, y: 28 }, { x: 50, y: 24 }, { x: 80, y: 28 }  // FWD
    ],
    '4-4-2': [
        { x: 50, y: 92 },
        { x: 15, y: 72 }, { x: 38, y: 76 }, { x: 62, y: 76 }, { x: 85, y: 72 },
        { x: 15, y: 48 }, { x: 38, y: 52 }, { x: 62, y: 52 }, { x: 85, y: 48 },
        { x: 35, y: 26 }, { x: 65, y: 26 }
    ],
    '3-5-2': [
        { x: 50, y: 92 },
        { x: 25, y: 76 }, { x: 50, y: 78 }, { x: 75, y: 76 },
        { x: 10, y: 52 }, { x: 30, y: 52 }, { x: 50, y: 48 }, { x: 70, y: 52 }, { x: 90, y: 52 },
        { x: 35, y: 26 }, { x: 65, y: 26 }
    ],
    '4-2-3-1': [
        { x: 50, y: 92 },
        { x: 15, y: 72 }, { x: 38, y: 76 }, { x: 62, y: 76 }, { x: 85, y: 72 },
        { x: 35, y: 58 }, { x: 65, y: 58 },
        { x: 20, y: 40 }, { x: 50, y: 36 }, { x: 80, y: 40 },
        { x: 50, y: 20 }
    ],
    '3-4-3': [
        { x: 50, y: 92 },
        { x: 25, y: 76 }, { x: 50, y: 78 }, { x: 75, y: 76 },
        { x: 15, y: 52 }, { x: 40, y: 56 }, { x: 60, y: 56 }, { x: 85, y: 52 },
        { x: 20, y: 28 }, { x: 50, y: 24 }, { x: 80, y: 28 }
    ],
    '5-3-2': [
        { x: 50, y: 92 },
        { x: 10, y: 72 }, { x: 28, y: 76 }, { x: 50, y: 78 }, { x: 72, y: 76 }, { x: 90, y: 72 },
        { x: 25, y: 52 }, { x: 50, y: 48 }, { x: 75, y: 52 },
        { x: 35, y: 26 }, { x: 65, y: 26 }
    ],
    '4-1-4-1': [
        { x: 50, y: 92 },
        { x: 15, y: 72 }, { x: 38, y: 76 }, { x: 62, y: 76 }, { x: 85, y: 72 },
        { x: 50, y: 60 },
        { x: 15, y: 42 }, { x: 38, y: 44 }, { x: 62, y: 44 }, { x: 85, y: 42 },
        { x: 50, y: 22 }
    ]
};

// ── Open Match Detail Modal ──
async function openMatchDetail(match) {
    // Remove existing modal if any
    const existing = document.getElementById('matchDetailModal');
    if (existing) existing.remove();

    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'matchDetailModal';
    modal.className = 'md-modal-overlay';
    modal.innerHTML = `
        <div class="md-modal">
            <div class="md-modal-header">
                <button class="md-close-btn" id="mdCloseBtn">&times;</button>
            </div>
            <div class="md-modal-body" id="mdModalBody">
                <div class="api-loading"><div class="loading-spinner"></div><p>${currentLang === 'en' ? 'Loading match details...' : 'جاري تحميل تفاصيل المباراة...'}</p></div>
            </div>
            <div class="md-global-search">
                <input type="text" id="globalPlayerSearch" placeholder="${currentLang === 'en' ? 'Search any player (e.g. Messi)...' : 'ابحث عن أي لاعب (مثلاً ميسي)...'}">
                <button id="globalSearchBtn">🔍</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Search handler
    const doSearch = () => {
        const input = document.getElementById('globalPlayerSearch');
        const name = input.value.trim();
        if (name.length >= 4) {
             openPlayerDetail({ name: name }, { homeId: null, awayId: null }, 'global');
             input.value = '';
        }
    };

    document.getElementById('globalSearchBtn').addEventListener('click', doSearch);
    document.getElementById('globalPlayerSearch').addEventListener('keyup', (e) => { if(e.key==='Enter') doSearch(); });

    // Close handlers
    document.getElementById('mdCloseBtn').addEventListener('click', closeMatchDetail);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeMatchDetail(); });
    document.addEventListener('keydown', handleEsc);

    // Animate in
    requestAnimationFrame(() => modal.classList.add('md-modal-visible'));

    // Fetch match detail data
    const body = document.getElementById('mdModalBody');
    let lineups = [], events = [], statistics = [];
    let useFallback = false;
    let goalLink = '';

    if (match.id && typeof FootballAPI !== 'undefined') {
        try {
            [lineups, events, statistics] = await Promise.all([
                FootballAPI.fetchFixtureLineups(match.id),
                FootballAPI.fetchFixtureEvents(match.id),
                FootballAPI.fetchFixtureStatistics(match.id)
            ]);
            
            // Also fetch current goal links
            try {
                const linksRes = await fetch('/api/goal-links');
                if (linksRes.ok) {
                    const linksData = await linksRes.json();
                    goalLink = linksData[match.id] || '';
                }
            } catch(err) { /* ignore */ }
            
        } catch (e) {
            console.warn('[MatchDetail] API fetch failed:', e);
        }
    }

    // If no API data, use fallback ONLY if the match matches the fallback key
    if (!lineups || lineups.length === 0) {
        const keyEN = `${match.homeTeam}-${match.awayTeam}`;
        const fallbackEN = matchDetailFallback['en'] || {};
        const fallbackAR = matchDetailFallback['ar'] || {};
        
        // Try exact match or reverse match
        const data = fallbackEN[keyEN] || fallbackAR[keyEN] || null;

        if (data) {
            useFallback = true;
            lineups = buildFallbackLineups(data, match);
            events = data.events || [];
            statistics = data.statistics || [];
        } else {
            // No API data AND no specific fallback -> Show empty state / Error
            lineups = [];
            events = [];
            statistics = [];
        }
    }

    // Render the modal content
    renderMatchDetail(body, match, lineups, events, statistics, useFallback, goalLink);
}

function closeMatchDetail() {
    const modal = document.getElementById('matchDetailModal');
    if (modal) {
        modal.classList.remove('md-modal-visible');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    document.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) { if (e.key === 'Escape') closeMatchDetail(); }

// ── Build fallback lineup structure to match API format ──
function buildFallbackLineups(data, match) {
    return [
        {
            team: { name: match.homeTeam, logo: match.homeLogo },
            formation: data.formation?.home || '4-3-3',
            startXI: (data.homeLineup || []).map(p => ({ player: { name: p.name, number: p.number, pos: p.pos } }))
        },
        {
            team: { name: match.awayTeam, logo: match.awayLogo },
            formation: data.formation?.away || '4-3-3',
            startXI: (data.awayLineup || []).map(p => ({ player: { name: p.name, number: p.number, pos: p.pos } }))
        }
    ];
}

// ── Main render function ──
function renderMatchDetail(container, match, lineups, events, statistics, useFallback, goalLink = '') {
    const homeLogo = match.homeLogo?.startsWith('http') ? `<img src="${match.homeLogo}" alt="" class="md-team-logo">` : `<span class="md-team-emoji">${match.homeLogo || '⚽'}</span>`;
    const awayLogo = match.awayLogo?.startsWith('http') ? `<img src="${match.awayLogo}" alt="" class="md-team-logo">` : `<span class="md-team-emoji">${match.awayLogo || '⚽'}</span>`;

    const isFinished = match.statusKey === 'finished';
    const isLive = match.statusKey === 'live';

    let scoreHtml = '';
    if (isFinished || isLive) {
        scoreHtml = `
            <div class="md-score">
                <span>${match.homeScore ?? 0}</span>
                <span class="md-score-divider">-</span>
                <span>${match.awayScore ?? 0}</span>
            </div>
            <div class="md-match-status ${isLive ? 'md-status-live' : 'md-status-ft'}">${isLive ? match.time : (currentLang === 'en' ? 'Full Time' : 'انتهت')}</div>
        `;
    } else {
        scoreHtml = `
            <div class="md-match-time-big">${match.time || 'TBD'}</div>
            <div class="md-match-status md-status-upcoming">${currentLang === 'en' ? 'Not Started' : 'لم تبدأ'}</div>
        `;
    }

    // Tab navigation
    const tabs = [
        { id: 'lineup', en: 'Lineup', ar: 'التشكيلة' },
        { id: 'events', en: 'Events', ar: 'الأحداث' },
        { id: 'stats', en: 'Statistics', ar: 'الإحصائيات' }
    ];

    const tabsHtml = tabs.map((t, i) =>
        `<button class="md-tab ${i === 0 ? 'active' : ''}" data-tab="${t.id}">${currentLang === 'en' ? t.en : t.ar}</button>`
    ).join('');

    container.innerHTML = `
        <!-- Match Header -->
        <div class="md-match-header">
            <div class="md-league-badge">${match.league || ''}</div>
            <div class="md-teams-row">
                <div class="md-team-block">
                    ${homeLogo}
                    <span class="md-team-name">${match.homeTeam}</span>
                </div>
                <div class="md-score-block">
                    ${scoreHtml}
                </div>
                <div class="md-team-block">
                    ${awayLogo}
                    <span class="md-team-name">${match.awayTeam}</span>
                </div>
            </div>
            <div class="md-match-date">${match.date || ''}</div>
        </div>

        <!-- Tabs -->
        <div class="md-tabs">${tabsHtml}</div>

        <!-- Tab Content -->
        <div class="md-tab-content" id="mdTabContent">
            <!-- Will be filled by tab switch -->
        </div>
    `;

    // Tab switching
    container.querySelectorAll('.md-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.md-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTabContent(tab.dataset.tab, lineups, events, statistics, match, useFallback, goalLink);
        });
    });

    // Show first tab
    renderTabContent('lineup', lineups, events, statistics, match, useFallback, goalLink);
}

// ── Render tab content ──
function renderTabContent(tabId, lineups, events, statistics, match, useFallback, goalLink = '') {
    const content = document.getElementById('mdTabContent');
    if (!content) return;

    if (tabId === 'lineup') {
        renderLineupTab(content, lineups, match);
    } else if (tabId === 'events') {
        renderEventsTab(content, events, match, goalLink);
    } else if (tabId === 'stats') {
        renderStatsTab(content, statistics, useFallback);
    }
}

// ============================================================
// LINEUP TAB — Football Pitch with Players
// ============================================================
function renderLineupTab(container, lineups, match) {
    if (!lineups || lineups.length < 2) {
        container.innerHTML = `<div class="md-empty">${currentLang === 'en' ? 'Lineup not available' : 'التشكيلة غير متاحة'}</div>`;
        return;
    }

    const homeTeam = lineups[0];
    const awayTeam = lineups[1];
    const homeFormation = homeTeam.formation || '4-3-3';
    const awayFormation = awayTeam.formation || '4-3-3';
    const homePlayers = homeTeam.startXI || [];
    const awayPlayers = awayTeam.startXI || [];

    container.innerHTML = `
        <div class="md-formation-header">
            <span class="md-formation-label">${match.homeTeam} <strong>${homeFormation}</strong></span>
            <span class="md-formation-label"><strong>${awayFormation}</strong> ${match.awayTeam}</span>
        </div>
        <div class="md-pitch-container">
            <div class="md-pitch">
                <!-- Pitch markings (SVG) -->
                <svg class="md-pitch-svg" viewBox="0 0 100 140" preserveAspectRatio="none">
                    <!-- Field border -->
                    <rect x="2" y="2" width="96" height="136" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <!-- Center line -->
                    <line x1="2" y1="70" x2="98" y2="70" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <!-- Center circle -->
                    <circle cx="50" cy="70" r="12" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <circle cx="50" cy="70" r="0.8" fill="rgba(255,255,255,0.4)"/>
                    <!-- Penalty areas -->
                    <rect x="20" y="2" width="60" height="22" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <rect x="20" y="116" width="60" height="22" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <!-- Goal areas -->
                    <rect x="32" y="2" width="36" height="8" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <rect x="32" y="130" width="36" height="8" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <!-- Penalty spots -->
                    <circle cx="50" cy="17" r="0.6" fill="rgba(255,255,255,0.4)"/>
                    <circle cx="50" cy="123" r="0.6" fill="rgba(255,255,255,0.4)"/>
                    <!-- Penalty arcs -->
                    <path d="M 36 24 A 12 12 0 0 0 64 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <path d="M 36 116 A 12 12 0 0 1 64 116" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
                    <!-- Corner arcs -->
                    <path d="M 2 5 A 3 3 0 0 0 5 2" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
                    <path d="M 95 2 A 3 3 0 0 0 98 5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
                    <path d="M 2 135 A 3 3 0 0 1 5 138" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
                    <path d="M 95 138 A 3 3 0 0 1 98 135" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
                </svg>

                <!-- Away team (top half) -->
                <div class="md-pitch-half md-pitch-away" id="mdPitchAway"></div>
                <!-- Home team (bottom half) -->
                <div class="md-pitch-half md-pitch-home" id="mdPitchHome"></div>
            </div>
        </div>
    `;

    // Place players on pitch
    const homePositions = formationPositions[homeFormation] || formationPositions['4-3-3'];
    const awayPositions = formationPositions[awayFormation] || formationPositions['4-3-3'];

    const pitchHome = document.getElementById('mdPitchHome');
    const pitchAway = document.getElementById('mdPitchAway');

    homePlayers.forEach((p, i) => {
        const pos = homePositions[i] || { x: 50, y: 50 };
        const playerEl = createPitchPlayer(p.player || p, pos, 'home', match);
        pitchHome.appendChild(playerEl);
    });

    awayPlayers.forEach((p, i) => {
        const pos = awayPositions[i] || { x: 50, y: 50 };
        // Mirror Y for away team (they play on top half)
        const mirrorPos = { x: pos.x, y: 100 - pos.y };
        const playerEl = createPitchPlayer(p.player || p, mirrorPos, 'away', match);
        pitchAway.appendChild(playerEl);
    });
}

function createPitchPlayer(player, pos, side, match) {
    const el = document.createElement('div');
    el.className = `md-pitch-player md-player-${side}`;
    el.style.left = `${pos.x}%`;
    el.style.top = `${pos.y}%`;
    el.style.cursor = 'pointer';

    const fullName = player.name || '';

    el.innerHTML = `
        <div class="md-player-heat"></div>
        <div class="md-player-dot">
            <span class="md-player-number">${player.number || ''}</span>
        </div>
        <span class="md-player-name">${fullName}</span>
    `;

    // Click to see player details
    el.onclick = (e) => {
        e.stopPropagation();
        openPlayerDetail(player, match);
    };

    return el;
}

// ── Player Detail View ──
async function performGlobalSearch() {
    const input = document.getElementById('globalPlayerSearch');
    const name = input.value.trim();
    if (name.length < 4) return;
    
    // We don't have a specific team/match context for a global free-search, 
    // but we can pass a dummy match object or handle it in openPlayerDetail
    const dummyMatch = { homeId: null, awayId: null };
    openPlayerDetail({ name: name }, dummyMatch, 'global');
    input.value = '';
}

async function openPlayerDetail(player, match, side) {
    const pitchContainer = document.querySelector('.md-pitch-container');
    if (!pitchContainer) return;

    // Create backdrop and card
    let backdrop = document.getElementById('playerCardBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'playerCardBackdrop';
        backdrop.className = 'md-player-card-backdrop';
        pitchContainer.appendChild(backdrop);
    }
    backdrop.innerHTML = `
        <div class="md-player-card">
            <button class="md-player-card-close" onclick="closePlayerCard()">&times;</button>
            <div id="playerCardContent">
                <div class="api-loading"><div class="loading-spinner"></div></div>
            </div>
        </div>
    `;
    
    requestAnimationFrame(() => backdrop.classList.add('visible'));
    backdrop.onclick = (e) => { if (e.target === backdrop) closePlayerCard(); };

    // Fetch or Generate data
    const content = document.getElementById('playerCardContent');
    let stats = null;

    if (!stats && typeof FootballAPI !== 'undefined' && (player.name || player.enName)) {
        try {
            // Priority: Search by English Name if available (API-Sports is English-heavy)
            const searchName = (player.enName || player.name).replace(/[0-9.]/g, '').trim();
            if (searchName.length >= 4) {
                const teamId = (side === 'home') ? match.homeId : match.awayId;
                
                // 1. Search within team (Fast & Specific)
                let searchRes = await FootballAPI.searchPlayerByName(searchName, teamId);
                
                // 2. Global search fallback (If they moved teams or ID mismatch)
                if (!searchRes || searchRes.length === 0) {
                    console.log(`[API] Player not in squad. Searching globally: ${searchName}`);
                    searchRes = await FootballAPI.searchPlayerByName(searchName);
                }
                
                if (searchRes && searchRes.length > 0) {
                    const foundId = searchRes[0].player?.id;
                    if (foundId) {
                        const res = await FootballAPI.fetchPlayerById(foundId);
                        if (res && res.length > 0) stats = res[0];
                    }
                }
            }
        } catch (e) {
            console.error('Search error:', e);
        }
    }

    if (!stats) {
        stats = getFallbackPlayerStats(player.name);
    }
    
    renderPlayerCard(content, stats, player, match);
}

function closePlayerCard() {
    const backdrop = document.getElementById('playerCardBackdrop');
    if (backdrop) {
        backdrop.classList.remove('visible');
        setTimeout(() => backdrop.innerHTML = '', 300);
    }
}

function renderPlayerCard(container, data, player, match) {
    const p = data?.player || {};
    const s = data?.statistics?.[0] || {};
    
    const photo = p.photo || `https://media.api-sports.io/football/players/${p.id || 0}.png`;
    const teamLogo = s.team?.logo || (player.team === 'home' ? match.homeLogo : match.awayLogo);
    
    container.parentElement.style.setProperty('--player-team-logo', `url(${teamLogo})`);

    const ageLabel = currentLang === 'en' ? 'Age' : 'العمر';
    const natLabel = currentLang === 'en' ? 'Nationality' : 'الجنسية';
    const posLabel = currentLang === 'en' ? 'Position' : 'المركز';
    const statsTitle = currentLang === 'en' ? 'Season Statistics' : 'إحصائيات الموسم';
    const goalsLabel = currentLang === 'en' ? 'Goals' : 'أهداف';
    const assistsLabel = currentLang === 'en' ? 'Assists' : 'صناعة';
    const appsLabel = currentLang === 'en' ? 'Matches' : 'مباريات';
    const ratingLabel = currentLang === 'en' ? 'Rating' : 'تقييم';

    container.innerHTML = `
        <div class="md-pcard-header">
            <img src="${photo}" alt="" class="md-pcard-photo" onerror="this.src='https://www.gravatar.com/avatar/0?d=mp&s=120'">
            <div class="md-pcard-name-group">
                <span class="md-pcard-name">${p.name || player.name}</span>
                <div class="md-pcard-meta">
                    <span>#${player.number || p.number || ''}</span>
                    <span>${s.team?.name || ''}</span>
                    ${s.games?.rating ? `<span class="md-pcard-rating">${s.games.rating}</span>` : ''}
                </div>
            </div>
        </div>

        <div class="md-pcard-info-grid">
            <div class="md-pcard-info-item">
                <span class="md-pcard-info-label">${ageLabel}</span>
                <span class="md-pcard-info-value">${p.age || '—'}</span>
            </div>
            <div class="md-pcard-info-item">
                <span class="md-pcard-info-label">${natLabel}</span>
                <span class="md-pcard-info-value">${p.nationality || '—'}</span>
            </div>
            <div class="md-pcard-info-item">
                <span class="md-pcard-info-label">${posLabel}</span>
                <span class="md-pcard-info-value">${s.games?.position || player.pos || '—'}</span>
            </div>
        </div>

        <div>
            <div class="md-pcard-stats-title">${statsTitle}</div>
            <div class="md-pcard-stats-grid">
                <div class="md-pcard-stat-box">
                    <span class="md-pcard-stat-val">${s.games?.appearences || '0'}</span>
                    <span class="md-pcard-stat-lbl">${appsLabel}</span>
                </div>
                <div class="md-pcard-stat-box">
                    <span class="md-pcard-stat-val">${s.goals?.total || '0'}</span>
                    <span class="md-pcard-stat-lbl">${goalsLabel}</span>
                </div>
                <div class="md-pcard-stat-box">
                    <span class="md-pcard-stat-val">${s.goals?.assists || '0'}</span>
                    <span class="md-pcard-stat-lbl">${assistsLabel}</span>
                </div>
                <div class="md-pcard-stat-box">
                    <span class="md-pcard-stat-val">${s.games?.rating || '—'}</span>
                    <span class="md-pcard-stat-lbl">${ratingLabel}</span>
                </div>
            </div>
        </div>
        <div class="md-pcard-footer">
            ${data?._simulated ? 
                `<span class="md-pcard-source simulated">${currentLang === 'ar' ? 'بيانات تاريخية' : 'Historical Data'}</span>` : 
                `<span class="md-pcard-source live">${currentLang === 'ar' ? 'بيانات مباشرة من API' : 'Live API Data'}</span>`
            }
        </div>
    `;
}

function getFallbackPlayerStats(name) {
    const isAr = currentLang === 'ar';
    const fallbacks = {
        // Al Ahly
        'Mohamed El Shenawy': { player: { name: 'Mohamed El Shenawy', age: 35, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/2281.png' }, statistics: [{ team: { name: 'Al Ahly' }, games: { position: 'Goalkeeper', appearences: 32, rating: '7.5' }, goals: { total: 0, assists: 0 } }] },
        'محمد الشناوي': { player: { name: 'محمد الشناوي', age: 35, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/2281.png' }, statistics: [{ team: { name: 'الأهلي' }, games: { position: 'حارس مرمى', appearences: 32, rating: '7.5' }, goals: { total: 0, assists: 0 } }] },
        'Emam Ashour': { player: { name: 'Emam Ashour', age: 26, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/2293.png' }, statistics: [{ team: { name: 'Al Ahly' }, games: { position: 'Midfielder', appearences: 18, rating: '7.8' }, goals: { total: 5, assists: 4 } }] },
        'إمام عاشور': { player: { name: 'إمام عاشور', age: 26, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/2293.png' }, statistics: [{ team: { name: 'الأهلي' }, games: { position: 'وسط', appearences: 18, rating: '7.8' }, goals: { total: 5, assists: 4 } }] },
        'Percy Tau': { player: { name: 'Percy Tau', age: 30, nationality: 'South Africa', photo: 'https://media.api-sports.io/football/players/457.png' }, statistics: [{ team: { name: 'Al Ahly' }, games: { position: 'Forward', appearences: 22, rating: '7.6' }, goals: { total: 8, assists: 3 } }] },
        'بيرسي تاو': { player: { name: 'بيرسي تاو', age: 30, nationality: 'جنوب أفريقيا', photo: 'https://media.api-sports.io/football/players/457.png' }, statistics: [{ team: { name: 'الأهلي' }, games: { position: 'مهاجم', appearences: 22, rating: '7.6' }, goals: { total: 8, assists: 3 } }] },
        'Hussein El Shahat': { player: { name: 'Hussein El Shahat', age: 31, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/2292.png' }, statistics: [{ team: { name: 'Al Ahly' }, games: { position: 'Forward', appearences: 25, rating: '7.7' }, goals: { total: 7, assists: 6 } }] },
        'حسين الشحات': { player: { name: 'حسين الشحات', age: 31, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/2292.png' }, statistics: [{ team: { name: 'الأهلي' }, games: { position: 'مهاجم', appearences: 25, rating: '7.7' }, goals: { total: 7, assists: 6 } }] },
        'Kahraba': { player: { name: 'Mahmoud Kahraba', age: 30, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/2294.png' }, statistics: [{ team: { name: 'Al Ahly' }, games: { position: 'Forward', appearences: 20, rating: '7.4' }, goals: { total: 10, assists: 2 } }] },
        'كهربا': { player: { name: 'محمود كهربا', age: 30, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/2294.png' }, statistics: [{ team: { name: 'الأهلي' }, games: { position: 'مهاجم', appearences: 20, rating: '7.4' }, goals: { total: 10, assists: 2 } }] },
        
        // Zamalek
        'Ahmed Sayed Zizo': { player: { name: 'Ahmed Sayed Zizo', age: 28, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/2295.png' }, statistics: [{ team: { name: 'Zamalek' }, games: { position: 'Midfielder', appearences: 25, rating: '8.1' }, goals: { total: 12, assists: 12 } }] },
        'زيزو': { player: { name: 'أحمد سيد زيزو', age: 28, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/2295.png' }, statistics: [{ team: { name: 'الزمالك' }, games: { position: 'وسط', appearences: 25, rating: '8.1' }, goals: { total: 12, assists: 12 } }] },
        'Achraf Bencharki': { player: { name: 'Achraf Bencharki', age: 29, nationality: 'Morocco', photo: 'https://media.api-sports.io/football/players/2291.png' }, statistics: [{ team: { name: 'Zamalek/Al Rayyan' }, games: { position: 'Forward', appearences: 20, rating: '7.4' }, goals: { total: 8, assists: 5 } }] },
        'أشرف بن شرقي': { player: { name: 'أشرف بن شرقي', age: 29, nationality: 'المغرب', photo: 'https://media.api-sports.io/football/players/2291.png' }, statistics: [{ team: { name: 'الزمالك' }, games: { position: 'مهاجم', appearences: 20, rating: '7.4' }, goals: { total: 8, assists: 5 } }] },
        'Shikabala': { player: { name: 'Shikabala', age: 38, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/2307.png' }, statistics: [{ team: { name: 'Zamalek' }, games: { position: 'Midfielder', appearences: 15, rating: '7.2' }, goals: { total: 3, assists: 4 } }] },
        'شيكابالا': { player: { name: 'شيكابالا', age: 38, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/2307.png' }, statistics: [{ team: { name: 'الزمالك' }, games: { position: 'وسط', appearences: 15, rating: '7.2' }, goals: { total: 3, assists: 4 } }] },

        // Global Stars
        'Mohamed Salah': { player: { name: 'Mohamed Salah', age: 31, nationality: 'Egypt', photo: 'https://media.api-sports.io/football/players/306.png' }, statistics: [{ team: { name: 'Liverpool' }, games: { position: 'Attacker', appearences: 28, rating: '8.2' }, goals: { total: 18, assists: 10 } }] },
        'صلاح': { player: { name: 'محمد صلاح', age: 31, nationality: 'مصر', photo: 'https://media.api-sports.io/football/players/306.png' }, statistics: [{ team: { name: 'ليفربول' }, games: { position: 'مهاجم', appearences: 28, rating: '8.2' }, goals: { total: 18, assists: 10 } }] },
        'Ali Maaloul': { player: { name: 'Ali Maaloul', age: 34, nationality: 'Tunisia', photo: 'https://media.api-sports.io/football/players/2315.png' }, statistics: [{ team: { name: 'Al Ahly' }, games: { position: 'Defender', appearences: 30, rating: '7.8' }, goals: { total: 5, assists: 15 } }] },
        'علي معلول': { player: { name: 'علي معلول', age: 34, nationality: 'تونس', photo: 'https://media.api-sports.io/football/players/2315.png' }, statistics: [{ team: { name: 'الأهلي' }, games: { position: 'مدافع', appearences: 30, rating: '7.8' }, goals: { total: 5, assists: 15 } }] }
    };
    const defaultPlayer = { player: { name: name, age: 26, nationality: isAr ? 'دولي' : 'International', photo: 'https://www.gravatar.com/avatar/0?d=mp&s=120' }, statistics: [{ team: { name: isAr ? 'غير محدد' : 'Unknown' }, games: { position: isAr ? 'لاعب' : 'Player', appearences: 10, rating: '7.0' }, goals: { total: 0, assists: 0 } }], _simulated: true };
    return fallbacks[name] || defaultPlayer;
}

// ============================================================
// EVENTS TAB — Timeline
// ============================================================
function renderEventsTab(container, events, match, goalLink = '') {
    if (!events || events.length === 0) {
        container.innerHTML = `<div class="md-empty">${currentLang === 'en' ? 'No events available' : 'لا توجد أحداث'}</div>`;
        return;
    }

    // Normalize events from API format if needed
    const normalizedEvents = events.map(ev => {
        if (ev.time) {
            // API-Sports format
            return {
                minute: ev.time?.elapsed || 0,
                type: ev.type || '',
                team: ev.team?.name === match.homeTeam ? 'home' : 'away',
                player: ev.player?.name || '',
                assist: ev.assist?.name || '',
                detail: ev.detail || ''
            };
        }
        return ev; // Already in our format (fallback)
    });

    let html = '<div class="md-events-timeline">';

    normalizedEvents.forEach(ev => {
        const icon = getEventIcon(ev.type, ev.detail);
        const isHome = ev.team === 'home';
        const sideClass = isHome ? 'md-event-home' : 'md-event-away';

        let detailText = '';
        if (ev.type === 'subst' || ev.detail?.toLowerCase().includes('substitution')) {
            detailText = `<span class="md-event-sub">↓ ${ev.player} &nbsp; ↑ ${ev.assist || ''}</span>`;
        } else {
            detailText = `<span class="md-event-player">${ev.player}</span>`;
            if (ev.assist) detailText += `<span class="md-event-assist">(${ev.assist})</span>`;
        }

        let iconHtml = `<div class="md-event-icon">${icon}</div>`;
        
        // Add clickable TV icon for goals if there's a link available
        const isGoal = (ev.type && ev.type.toLowerCase().includes('goal')) || icon.includes('⚽');
        if (isGoal && goalLink) {
            iconHtml = `
                <a href="${goalLink}" target="_blank" class="md-event-video-link" title="شاهد الهدف" style="text-decoration: none; display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 1.2rem; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">📺</span>
                    <div class="md-event-icon">${icon}</div>
                </a>
            `;
        }

        html += `
            <div class="md-event-row ${sideClass}">
                <div class="md-event-minute">${ev.minute}'</div>
                ${iconHtml}
                <div class="md-event-details">${detailText}</div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function getEventIcon(type, detail) {
    const t = (type || '').toLowerCase();
    const d = (detail || '').toLowerCase();
    if (t.includes('goal') || t === 'goal') return '⚽';
    if (d.includes('own goal')) return '⚽🔴';
    if (d.includes('penalty') && t.includes('goal')) return '⚽(P)';
    if (d.includes('yellow') || t === 'card' && d.includes('yellow')) return '🟨';
    if (d.includes('red')) return '🟥';
    if (t === 'subst' || d.includes('substitution')) return '🔄';
    if (t === 'var') return '📺';
    return '📋';
}

// ============================================================
// STATISTICS TAB
// ============================================================
function renderStatsTab(container, statistics, useFallback) {
    if (!statistics || statistics.length === 0) {
        container.innerHTML = `<div class="md-empty">${currentLang === 'en' ? 'No statistics available' : 'لا توجد إحصائيات'}</div>`;
        return;
    }

    let stats = [];

    if (useFallback) {
        // Already in our format
        stats = statistics;
    } else {
        // API-Sports format: array of { team, statistics: [{ type, value }] }
        if (statistics.length >= 2 && statistics[0].statistics) {
            const homeStats = statistics[0].statistics;
            const awayStats = statistics[1].statistics;
            stats = homeStats.map((hs, i) => {
                const as = awayStats[i] || {};
                const homeVal = parseStatValue(hs.value);
                const awayVal = parseStatValue(as.value);
                return {
                    label: translateStatLabel(hs.type),
                    home: String(hs.value ?? 0),
                    away: String(as.value ?? 0),
                    homeVal, awayVal
                };
            });
        }
    }

    let html = '<div class="md-stats-list">';
    stats.forEach(stat => {
        const total = (stat.homeVal || 0) + (stat.awayVal || 0);
        const homePct = total > 0 ? (stat.homeVal / total * 100) : 50;
        const awayPct = total > 0 ? (stat.awayVal / total * 100) : 50;

        html += `
            <div class="md-stat-item">
                <div class="md-stat-values">
                    <span class="md-stat-home-val">${stat.home}</span>
                    <span class="md-stat-label">${stat.label}</span>
                    <span class="md-stat-away-val">${stat.away}</span>
                </div>
                <div class="md-stat-bar">
                    <div class="md-stat-bar-home" style="width: ${homePct}%"></div>
                    <div class="md-stat-bar-away" style="width: ${awayPct}%"></div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function parseStatValue(val) {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'number') return val;
    return parseFloat(String(val).replace('%', '')) || 0;
}

function translateStatLabel(type) {
    if (currentLang !== 'ar') return type;
    const map = {
        'Ball Possession': 'الاستحواذ',
        'Total Shots': 'التسديدات',
        'Shots on Goal': 'على المرمى',
        'Shots off Goal': 'خارج المرمى',
        'Corner Kicks': 'الركنيات',
        'Fouls': 'الأخطاء',
        'Yellow Cards': 'بطاقات صفراء',
        'Red Cards': 'بطاقات حمراء',
        'Total passes': 'التمريرات',
        'Passes accurate': 'تمريرات دقيقة',
        'Passes %': 'دقة التمرير',
        'Offsides': 'تسلل',
        'Goalkeeper Saves': 'تصديات الحارس',
        'Blocked Shots': 'تسديدات مصدودة',
        'expected_goals': 'الأهداف المتوقعة'
    };
    return map[type] || type;
}
