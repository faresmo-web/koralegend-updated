// ============================================================
// Admin Dashboard — Frontend Only (localStorage-based)
// ============================================================

const ADMIN_PASSWORD = 'admin';

let adminToken = '';

function login() {
    const pass = document.getElementById('admin-pass').value;
    if (!pass) return alert('يرجى إدخال كلمة المرور');

    const btn = document.querySelector('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'جاري التحقق...';
    btn.disabled = true;

    setTimeout(() => {
        if (pass === ADMIN_PASSWORD) {
            adminToken = pass;
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('dashboard-section').classList.remove('hidden');
            document.body.style.overflow = 'auto';
            initDashboard();
        } else {
            alert('كلمة المرور غير صحيحة');
        }
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 400);
}

document.getElementById('admin-pass').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') login();
});

function initDashboard() {
    loadStats();
    loadMatches();
}

function loadStats() {
    // No real-time stats without backend — show static placeholders
    document.getElementById('total-views').innerText = '—';
    document.getElementById('active-users').innerText = '—';
}

async function loadMatches() {
    const list = document.getElementById('matches-list');
    try {
        let matches = await FootballAPI.fetchTodayFixtures();

        if (!matches || matches.length === 0 || (matches._fallback && matches.length < 2)) {
            matches = [
                {
                    fixture: { id: 'fallback_0', status: { short: 'FT' } },
                    teams: { home: { name: 'ليفربول', logo: 'https://crests.football-data.org/64.png' }, away: { name: 'مانشستر سيتي', logo: 'https://crests.football-data.org/65.png' } }
                },
                {
                    fixture: { id: 'fallback_1', status: { short: 'LIVE' } },
                    teams: { home: { name: 'أرسنال', logo: 'https://crests.football-data.org/57.png' }, away: { name: 'توتنهام', logo: 'https://crests.football-data.org/73.png' } }
                },
                {
                    fixture: { id: 'fallback_2', status: { short: 'FT' } },
                    teams: { home: { name: 'ريال مدريد', logo: 'https://crests.football-data.org/86.png' }, away: { name: 'برشلونة', logo: 'https://crests.football-data.org/81.png' } }
                },
                {
                    fixture: { id: 'fallback_3', status: { short: 'FT' } },
                    teams: { home: { name: 'بايرن ميونخ', logo: 'https://crests.football-data.org/5.png' }, away: { name: 'دورتموند', logo: 'https://crests.football-data.org/4.png' } }
                }
            ];
        }

        // Load existing links from localStorage
        const existingLinks = getGoalLinks();

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
                        <button class="btn-broadcast" onclick="saveGoalLink('${matchId}', event)">
                            حفظ الرابط <span style="font-size:1.1rem; line-height:1;">💾</span>
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

// ── localStorage helpers ──────────────────────────────
function getGoalLinks() {
    try {
        return JSON.parse(localStorage.getItem('koralegend_goal_links') || '{}');
    } catch { return {}; }
}

function setGoalLinks(links) {
    try {
        localStorage.setItem('koralegend_goal_links', JSON.stringify(links));
    } catch {}
}
// ─────────────────────────────────────────────────────

function saveGoalLink(matchId, event) {
    const link = document.getElementById(`link-${matchId}`).value;
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;

    btn.innerHTML = 'جاري الحفظ... ⏳';
    btn.disabled = true;

    try {
        const links = getGoalLinks();
        links[matchId] = link;
        setGoalLinks(links);

        // Also update the live page immediately via renderGoalLink if available
        if (typeof window.renderGoalLink === 'function') {
            window.renderGoalLink(matchId, link);
        }

        btn.style.background = '#3b82f6';
        btn.innerHTML = 'تم الحفظ ✔';

        const row = btn.closest('.match-row');
        if (row) {
            row.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            setTimeout(() => row.style.boxShadow = 'none', 1000);
        }

        setTimeout(() => {
            btn.style.background = '';
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 3000);
    } catch (e) {
        alert('حدث خطأ في الحفظ');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.add('hidden');
    });

    document.querySelectorAll('.nav-item').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    document.getElementById(`tab-${tabId}`).classList.add('active');

    const title = document.getElementById('page-head-title');
    const desc = document.getElementById('page-head-desc');

    if (tabId === 'overview') {
        title.innerText = 'النظرة العامة';
        desc.innerText = 'إحصائيات سريعة للموقع';
    } else if (tabId === 'matches') {
        title.innerText = 'إدارة المباريات';
        desc.innerText = 'تحكم في إضافة روابط المباريات — تُحفظ في المتصفح محلياً';
    }
}
