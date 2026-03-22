const https = require('https');

https.get('https://api.football-data.org/v4/competitions/CL/matches?season=2024', {
    headers: { 'X-Auth-Token': 'df81bb013ed045038cbe4f6990479ab4' } // Need a valid token if I have one, or just wait. I can use the proxy maybe?
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log("Status:", res.statusCode);
        const json = JSON.parse(data);
        if (json.matches) {
            const fixtures = json.matches.filter(m => ['QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'].includes(m.stage));
            console.log(JSON.stringify(fixtures, null, 2));
        } else {
            console.log(data);
        }
    });
}).on('error', err => console.error(err));
