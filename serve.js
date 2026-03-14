const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index' : req.url;
    let filePath = path.join(__dirname, urlPath);
    
    // Function to serve the file
    const serveFile = (pathToFile, contentType) => {
        fs.readFile(pathToFile, (error, content) => {
            if (error) {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    };

    // Try the exact path first
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            const ext = path.extname(filePath);
            serveFile(filePath, MIME_TYPES[ext] || 'application/octet-stream');
        } else {
            // Try adding .html
            const htmlPath = filePath + '.html';
            fs.stat(htmlPath, (errHtml, statsHtml) => {
                if (!errHtml && statsHtml.isFile()) {
                    serveFile(htmlPath, 'text/html');
                } else {
                    // Final 404
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>', 'utf-8');
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
