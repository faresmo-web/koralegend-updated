// Global Socket connection for live visitors and real-time buttons
document.addEventListener('DOMContentLoaded', async () => {
    // We try to connect to socket if available
    if (typeof io !== 'undefined') {
        const socket = io();

        // 1. Listen for new goal links
        socket.on('new_goal_link', ({ matchId, link }) => {
            renderGoalLink(matchId, link);
        });

        // 2. Fetch existing links on load (so people joining late still see the link)
        try {
            const res = await fetch('/api/goal-links');
            if(res.ok) {
                const data = await res.json();
                // We use MutationObserver or just a timeout if the elements are rendered asynchronously by matches-data.js
                // It's safer to wait a bit or let matches-data.js call this directly, but polling/delegation works too.
                setInterval(() => {
                    for (const [matchId, link] of Object.entries(data)) {
                        if(link) renderGoalLink(matchId, link);
                    }
                }, 2000); 
            }
        } catch(e){}
    }
});

// Render the link dynamically 
window.renderGoalLink = function(matchId, link) {
    if(!link) return;
    const containers = document.querySelectorAll(`.goal-link-${matchId}`);
    containers.forEach(container => {
        // Only render if not already rendered
        if(!container.querySelector('a')) {
            container.innerHTML = `
                <a href="${link}" target="_blank" style="background: #ef4444; color: white; padding: 5px 15px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 0.9rem; display: inline-block; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4); margin-top: 5px;">
                    شاهد الهدف 🎥
                </a>
            `;
        }
    });
};
