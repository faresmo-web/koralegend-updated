async function testAPI() {
    const apiKey = 'qb8xMQa4PsMojRK5';
    // Trying some common endpoints
    const endpoints = [
        'https://api.isportsapi.com/sport/football/livescores',
        'https://api.isportsapi.com/sport/football/schedule',
        'https://api.isportsapi.com/sport/football/standings',
    ];

    for (const url of endpoints) {
        try {
            console.log(`Testing ${url}...`);
            const response = await fetch(`${url}?api_key=${apiKey}`);
            const data = await response.json();
            console.log(`Response for ${url}:`, JSON.stringify(data, null, 2).substring(0, 500) + '...');
        } catch (error) {
            console.error(`Error for ${url}:`, error.message);
        }
    }
}

testAPI();
