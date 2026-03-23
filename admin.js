let adminToken = '';
let socket = null;

async function login() {
    const pass = document.getElementById('admin-pass').value;
    if (!pass) return alert('يرجى إدخال كلمة المرور');
    
    // Add loading state
    const btn = document.querySelector('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'جاري التحقق...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pass })
        });
        const data = await res.json();
        if (data.success) {
            adminToken = pass;
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('dashboard-section').classList.remove('hidden');
            
            // Re-enable body scroll if it was restricted
            document.body.style.overflow = 'auto';
            initDashboard();
        } else {
            alert('كلمة المرور غير صحيحة');
        }
    } catch (err) {
        alert('حدث خطأ في الاتصال بالخادم');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

document.getElementById('admin-pass').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') login();
});

async function initDashboard() {
    socket = io();

    socket.on('active_users', (count) => {
        const usersEl = document.getElementById('active-users');
        const oldVal = parseInt(usersEl.innerText);
        usersEl.innerText = count;
        
        // Add a slight animation when number changes
        if(oldVal !== count) {
            usersEl.style.transform = 'scale(1.2)';
            usersEl.style.color = '#38bdf8';
            setTimeout(() => {
                usersEl.style.transform = 'scale(1)';
                usersEl.style.color = 'white';
            }, 300);
        }
    });

    loadStats();
    loadMatches();
}

async function loadStats() {
    try {
        const statsRes = await fetch('/api/stats');
        const stats = await statsRes.json();
        document.getElementById('total-views').innerText = stats.totalViews;
        document.getElementById('active-users').innerText = stats.activeUsers;
    } catch (e) {
        console.error("Could not load stats.", e);
    }
}

async function loadMatches() {
    const list = document.getElementById('matches-list');
    try {
        let matches = await FootballAPI.fetchTodayFixtures();
        
        // Show all matches in the admin panel by default to match the homepage when 'all' is selected.
        
        if (!matches || matches.length === 0 || matches._fallback) {
            matches = [
                {
                    fixture: { id: 'fallback_0', status: { short: 'FT' } },
                    teams: { home: { name: 'ليفربول', logo: 'https://media.api-sports.io/football/teams/40.png' }, away: { name: 'مانشستر سيتي', logo: 'https://media.api-sports.io/football/teams/50.png' } }
                },
                {
                    fixture: { id: 'fallback_1', status: { short: 'LIVE' } },
                    teams: { home: { name: 'أرسنال', logo: 'https://media.api-sports.io/football/teams/42.png' }, away: { name: 'توتنهام', logo: 'https://media.api-sports.io/football/teams/47.png' } }
                },
                {
                    fixture: { id: 'fallback_2', status: { short: 'FT' } },
                    teams: { home: { name: 'ريال مدريد', logo: 'https://media.api-sports.io/football/teams/541.png' }, away: { name: 'برشلونة', logo: 'https://media.api-sports.io/football/teams/529.png' } }
                },
                {
                    fixture: { id: 'fallback_3', status: { short: 'FT' } },
                    teams: { home: { name: 'الأهلي', logo: 'https://media.api-sports.io/football/teams/1032.png' }, away: { name: 'الزمالك', logo: 'https://media.api-sports.io/football/teams/1033.png' } }
                },
                {
                    fixture: { id: 'fallback_4', status: { short: 'LIVE' } },
                    teams: { home: { name: 'بيراميدز', logo: 'https://media.api-sports.io/football/teams/7244.png' }, away: { name: 'الجيش الملكي', logo: 'https://media.api-sports.io/football/teams/960.png' } }
                }
            ];
        }

        const linksRes = await fetch('/api/goal-links');
        const existingLinks = await linksRes.json();

        list.innerHTML = '';
        matches.forEach(m => {
            const fixt = m.fixture;
            const teams = m.teams;
            const matchId = fixt.id;
            const status = fixt.status.short;
            
            const isLive = ['1H', '2H', 'HT', 'LIVE', 'ET', 'P'].includes(status);
            const isUpcoming = !isLive && !['FT', 'AET', 'PEN'].includes(status);

            let statusClass = isLive ? 'status-live' : (isUpcoming ? 'status-upcoming' : 'status-ended');
            let statusText = isLive ? 'مباشر 🔴' : (isUpcoming ? 'لم تبدأ' : 'انتهت ✔');

            const currentLink = existingLinks[matchId] || '';

            list.innerHTML += `
                <div class="match-row ${isLive ? 'live-border' : ''}">
                    <div class="match-teams">
                        <div class="team home-team">
                            <span>${teams.home.name}</span>
                            <img src="${teams.home.logo}" alt="home">
                        </div>
                        
                        <div class="vs">
                            <div class="match-status ${statusClass}">${statusText}</div>
                        </div>

                        <div class="team">
                            <img src="${teams.away.logo}" alt="away">
                            <span>${teams.away.name}</span>
                        </div>
                    </div>

                    <div class="link-control">
                        <input type="text" class="link-input" id="link-${matchId}" placeholder="رابط يوتيوب أو سيرفر مباشر..." value="${currentLink}">
                        <button class="btn-broadcast" onclick="saveGoalLink(${matchId}, event)">
                            بث الرابط <span style="font-size:1.1rem; line-height:1;">🚀</span>
                        </button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        list.innerHTML = '<div style="padding: 2rem; color: #ef4444; background: rgba(239, 68, 68, 0.1); border-radius: 12px; text-align: center;">حدث خطأ في تحميل المباريات. تأكد من اتصال الـ API.</div>';
        console.error(e);
    }
}

async function saveGoalLink(matchId, event) {
    const link = document.getElementById(`link-${matchId}`).value;
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'جاري البث... ⏳';
    btn.disabled = true;

    try {
        const res = await fetch('/api/goal-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: adminToken, matchId, link })
        });
        
        if (res.ok) {
            btn.style.background = '#3b82f6';
            btn.innerHTML = 'تم النشر ينجاح ✔';
            
            // Add a pulse effect to the row
            const row = btn.closest('.match-row');
            if(row) {
                row.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
                setTimeout(() => row.style.boxShadow = 'none', 1000);
            }

            setTimeout(() => {
                btn.style.background = ''; // reset to css default
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        } else {
            alert('انتهت صلاحية الجلسة أو يوجد خطأ.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    } catch (e) {
        alert('حدث خطأ في الاتصال');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function switchTab(tabId) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.nav-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected view and activate tab
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    document.getElementById(`tab-${tabId}`).classList.add('active');
    
    // Update title
    const title = document.getElementById('page-head-title');
    const desc = document.getElementById('page-head-desc');
    
    if(tabId === 'overview') {
        title.innerText = 'النظرة العامة';
        desc.innerText = 'إحصائيات سريعة للزوار ونشاط الموقع';
    } else if(tabId === 'matches') {
        title.innerText = 'إدارة المباريات';
        desc.innerText = 'تحكم في إضافة روابط الأهداف والبث اللحظي للمباريات المتاحة';
    }
}
