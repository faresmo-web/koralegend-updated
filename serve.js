const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = 3003;
const DATA_FILE = path.join(__dirname, 'server-data.json');

// Initialize database
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        adminPassword: "admin",
        totalViews: 0,
        goalLinks: {}
    }, null, 2));
}

let db = require(DATA_FILE);
function saveDb() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname, { extensions: ['html'] }));

// API Endpoints
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === db.adminPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

app.post('/api/goal-link', (req, res) => {
    const { password, matchId, link } = req.body;
    if (password !== db.adminPassword) return res.status(401).json({ error: 'Unauthorized' });
    
    db.goalLinks[matchId] = link;
    saveDb();

    // Broadcast the new goal link to everyone
    io.emit('new_goal_link', { matchId, link });
    res.json({ success: true });
});

app.get('/api/stats', (req, res) => {
    res.json({
        totalViews: db.totalViews,
        activeUsers: io.engine.clientsCount
    });
});

app.get('/api/goal-links', (req, res) => {
    res.json(db.goalLinks || {});
});

// Socket.io for Real-time
io.on('connection', (socket) => {
    // A new visitor joined
    db.totalViews += 1;
    saveDb();
    
    // Broadcast active user count to admins
    io.emit('active_users', io.engine.clientsCount);

    socket.on('disconnect', () => {
        io.emit('active_users', io.engine.clientsCount);
    });
});

// Fallback for 404
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
