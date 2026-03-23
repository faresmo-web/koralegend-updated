// Goal Links — Frontend Only (localStorage-based)
// No socket.io or backend needed

document.addEventListener('DOMContentLoaded', () => {
    // Load existing links from localStorage and display them
    try {
        const data = JSON.parse(localStorage.getItem('koralegend_goal_links') || '{}');
        // Re-check periodically in case admin saves a link in same browser session
        setInterval(() => {
            for (const [matchId, link] of Object.entries(data)) {
                if (link) renderGoalLink(matchId, link);
            }
        }, 2000);
    } catch(e) {}
});

// Render the link dynamically
window.renderGoalLink = function(matchId, link) {
    if (!link) return;
    const containers = document.querySelectorAll(`.goal-link-${matchId}`);
    containers.forEach(container => {
        if (!container.querySelector('a')) {
            container.innerHTML = `
                <a href="${link}" target="_blank" style="background: #ef4444; color: white; padding: 5px 15px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 0.9rem; display: inline-block; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4); margin-top: 5px;">
                    شاهد الهدف 🎥
                </a>
            `;
        }
    });
};
