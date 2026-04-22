// Mock Data for iSportsAPI
const mockISportsMatchData = [
    {
        matchId: "12345",
        leagueId: 39,
        leagueName: "Premier League",
        homeName: "Arsenal",
        awayName: "Man City",
        homeScore: 2,
        awayScore: 1,
        matchTime: "2026-04-22 20:00:00",
        status: "FT"
    }
];

// Normalization function (copied from football-api.js for testing)
function normalizeISportsMatches(data) {
    if (!data || !Array.isArray(data)) return [];
    return data.map(m => {
        const date = m.matchTime ? m.matchTime.replace(' ', 'T') : new Date().toISOString();
        return {
            fixture: {
                id: m.matchId,
                date: date,
                timestamp: m.matchTime ? Math.floor(new Date(date).getTime() / 1000) : null,
                status: { short: m.status === 'FT' ? 'FT' : (m.status === 'Live' ? 'LIVE' : 'NS') }
            },
            league: { id: m.leagueId, name: m.leagueName },
            teams: {
                home: { name: m.homeName, logo: m.homeIcon || null },
                away: { name: m.awayName, logo: m.awayIcon || null }
            },
            goals: { home: m.homeScore, away: m.awayScore }
        };
    });
}

const normalized = normalizeISportsMatches(mockISportsMatchData);
console.log("Normalized Match Data:", JSON.stringify(normalized, null, 2));

// Test standings normalization
const mockStandingsData = [
    {
        rank: 1,
        teamName: "Arsenal",
        played: 32,
        win: 23,
        draw: 5,
        loss: 4,
        points: 74,
        goalDifference: 45
    }
];

function normalizeStandings(data, leagueId, year) {
    return [{
        league: { id: leagueId, season: year, standings: [data.map(t => ({
            rank: t.rank || t.position,
            team: { name: t.teamName || t.name, logo: t.teamIcon || t.logo },
            all: { played: t.played || t.playedGames, win: t.win || t.won, draw: t.draw, lose: t.loss || t.lost },
            points: t.points, goalsDiff: t.goalDifference || t.goalDiff
        }))] }
    }];
}

console.log("Normalized Standings Data:", JSON.stringify(normalizeStandings(mockStandingsData, 39, 2025), null, 2));
