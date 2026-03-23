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

const server = http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index' : req.url;
    let filePath = path.join(ROOT, urlPath);
    let extname = path.extname(filePath);

    // If no extension, try appending .html
    if (!extname) {
        filePath += '.html';
        extname = '.html';
    }

    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

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
