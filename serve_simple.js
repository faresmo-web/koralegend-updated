const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = process.cwd();

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json',
};

const FOOTBALL_DATA_API_KEY = '5e3a57b7339b40dbaaac9b537f3cce70';

const server = http.createServer((req, res) => {
    // ── CORS Headers ──
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type');

    // Handle OPTIONS Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    let urlPath = req.url === '/' ? '/index' : req.url;
    // Strip query string for file resolution
    const cleanPath = urlPath.split('?')[0];
    let filePath = path.join(ROOT, cleanPath);
    let extname = path.extname(filePath);

    // If no extension, try appending .html
    if (!extname && !req.url.startsWith('/api/proxy')) {
        filePath += '.html';
        extname = '.html';
    }

    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // ── Local API Proxy ──
    if (req.url.startsWith('/api/proxy')) {
        const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
        const targetUrl = query.get('url');

        if (!targetUrl) {
            res.writeHead(400);
            return res.end('Missing url parameter');
        }

        console.log(`[Proxy] Authorizing request to: ${targetUrl}`);

        const lib = targetUrl.startsWith('https') ? require('https') : require('http');
        
        // Prepare headers to forward
        const forwardHeaders = { 
            'X-Auth-Token': FOOTBALL_DATA_API_KEY,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        };

        const proxyReq = lib.get(targetUrl, { headers: forwardHeaders }, (proxyRes) => {
            console.log(`[Proxy] Target Response: ${proxyRes.statusCode} for ${targetUrl}`);
            
            // Forward status and pass through relevant headers
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': proxyRes.headers['content-type'] || 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            });
            proxyRes.pipe(res, { end: true });
        });

        proxyReq.on('error', (err) => {
            console.error('[Proxy] Error:', err.message);
            res.writeHead(500);
            res.end('Proxy Error: ' + err.message);
        });
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
