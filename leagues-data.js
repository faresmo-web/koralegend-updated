// Leagues Data
const leaguesDatabase = {
    en: {
        premier: {
            name: 'Premier League',
            standings: [
                { rank: 1, team: 'Arsenal', icon: 'https://crests.football-data.org/57.png', played: 30, won: 20, drawn: 7, lost: 3, points: 67 },
                { rank: 2, team: 'Manchester City', icon: 'https://crests.football-data.org/65.png', played: 29, won: 18, drawn: 6, lost: 5, points: 60 },
                { rank: 3, team: 'Liverpool', icon: 'https://crests.football-data.org/64.png', played: 29, won: 13, drawn: 9, lost: 7, points: 48 },
                { rank: 4, team: 'Aston Villa', icon: 'https://crests.football-data.org/66.png', played: 29, won: 14, drawn: 9, lost: 6, points: 51 },
                { rank: 5, team: 'Chelsea', icon: 'https://crests.football-data.org/61.png', played: 29, won: 14, drawn: 6, lost: 9, points: 48 },
                { rank: 6, team: 'Tottenham', icon: 'https://crests.football-data.org/73.png', played: 30, won: 13, drawn: 5, lost: 12, points: 44 },
                { rank: 7, team: 'Manchester United', icon: 'https://crests.football-data.org/66.png', played: 29, won: 14, drawn: 9, lost: 6, points: 51 },
                { rank: 8, team: 'Newcastle', icon: 'https://crests.football-data.org/62.png', played: 29, won: 12, drawn: 6, lost: 11, points: 42 },
                { rank: 9, team: 'West Ham', icon: 'âڑ’ï¸ڈ', played: 30, won: 11, drawn: 8, lost: 11, points: 41 },
                { rank: 10, team: 'Brighton', icon: 'ًں”µ', played: 29, won: 10, drawn: 9, lost: 10, points: 39 },
                { rank: 11, team: 'Wolves', icon: 'ًںں،', played: 29, won: 10, drawn: 7, lost: 12, points: 37 },
                { rank: 12, team: 'Bournemouth', icon: 'ًں”´', played: 30, won: 10, drawn: 6, lost: 14, points: 36 },
                { rank: 13, team: 'Fulham', icon: 'âڑھ', played: 29, won: 9, drawn: 8, lost: 12, points: 35 },
                { rank: 14, team: 'Brentford', icon: 'ًں”´', played: 29, won: 9, drawn: 5, lost: 15, points: 32 },
                { rank: 15, team: 'Everton', icon: 'ًں”µ', played: 30, won: 8, drawn: 8, lost: 14, points: 32 },
                { rank: 16, team: 'Crystal Palace', icon: 'ًں”´', played: 30, won: 7, drawn: 9, lost: 14, points: 30 },
                { rank: 17, team: 'Nottm Forest', icon: 'ًں”´', played: 29, won: 7, drawn: 7, lost: 15, points: 28 },
                { rank: 18, team: 'Leicester', icon: 'ًں”µ', played: 30, won: 6, drawn: 8, lost: 16, points: 26 },
                { rank: 19, team: 'Ipswich', icon: 'ًں”µ', played: 29, won: 5, drawn: 8, lost: 16, points: 23 },
                { rank: 20, team: 'Southampton', icon: 'ًں”´', played: 30, won: 4, drawn: 6, lost: 20, points: 18 }
            ],
            scorers: [
                { rank: 1, name: 'Bukayo Saka', team: 'Arsenal', goals: 19, photo: '⚽' },
                { rank: 2, name: 'Erling Haaland', team: 'Man City', goals: 18, photo: '⚽' },
                { rank: 3, name: 'Mohamed Salah', team: 'Liverpool', goals: 17, photo: '⚽' },
                { rank: 4, name: 'Ollie Watkins', team: 'Aston Villa', goals: 16, photo: '⚽' },
                { rank: 5, name: 'Cole Palmer', team: 'Chelsea', goals: 15, photo: '⚽' }
            ]
        },
        laliga: {
            name: 'La Liga',
            standings: [
                { rank: 1, team: 'Barcelona', icon: 'https://media.api-sports.io/football/teams/529.png', played: 27, won: 22, drawn: 1, lost: 4, points: 67 },
                { rank: 2, team: 'Real Madrid', icon: 'https://media.api-sports.io/football/teams/541.png', played: 27, won: 20, drawn: 3, lost: 4, points: 63 },
                { rank: 3, team: 'Atletico Madrid', icon: 'https://media.api-sports.io/football/teams/530.png', played: 27, won: 16, drawn: 6, lost: 5, points: 54 },
                { rank: 4, team: 'Villarreal', icon: 'https://media.api-sports.io/football/teams/533.png', played: 28, won: 17, drawn: 4, lost: 7, points: 55 },
                { rank: 5, team: 'Real Betis', icon: 'https://media.api-sports.io/football/teams/543.png', played: 27, won: 12, drawn: 7, lost: 8, points: 43 },
                { rank: 6, team: 'Real Sociedad', icon: 'https://media.api-sports.io/football/teams/548.png', played: 27, won: 9, drawn: 8, lost: 10, points: 35 },
                { rank: 9, team: 'Getafe', icon: 'https://media.api-sports.io/football/teams/546.png', played: 27, won: 9, drawn: 8, lost: 10, points: 35 },
                { rank: 10, team: 'Athletic Bilbao', icon: 'ًں”´', played: 27, won: 9, drawn: 8, lost: 10, points: 35 }
            ],
            scorers: [
                { rank: 1, name: 'Robert Lewandowski', team: 'Barcelona', goals: 21, photo: '⚽', teamLogo: 'https://media.api-sports.io/football/teams/529.png' },
                { rank: 2, name: 'Kylian Mbappأ©', team: 'Real Madrid', goals: 19, photo: 'https://media.api-sports.io/football/players/276.png', teamLogo: 'https://media.api-sports.io/football/teams/541.png' },
                { rank: 3, name: 'Lamine Yamal', team: 'Barcelona', goals: 14, photo: '⚽', teamLogo: 'https://media.api-sports.io/football/teams/529.png' }
            ]
        },
        spl: {
            name: 'Saudi Pro League',
            standings: [
                { rank: 1, team: 'Al Nassr', icon: 'https://media.api-sports.io/football/teams/2939.png', played: 25, won: 21, drawn: 1, lost: 3, points: 64 },
                { rank: 2, team: 'Al Ahli', icon: 'https://media.api-sports.io/football/teams/2931.png', played: 26, won: 19, drawn: 5, lost: 2, points: 62 },
                { rank: 3, team: 'Al Hilal', icon: 'https://media.api-sports.io/football/teams/2930.png', played: 25, won: 18, drawn: 7, lost: 0, points: 61 },
                { rank: 4, team: 'Al Qadsiah', icon: 'ًں”µ', played: 26, won: 18, drawn: 6, lost: 2, points: 60 },
                { rank: 5, team: 'Al Taawoun', icon: 'ًں”µ', played: 26, won: 13, drawn: 6, lost: 7, points: 45 },
                { rank: 6, team: 'Al Ittihad', icon: 'âڑ«', played: 26, won: 12, drawn: 6, lost: 8, points: 42 },
                { rank: 7, team: 'Al Ettifaq', icon: 'ًںں¢', played: 26, won: 11, drawn: 6, lost: 9, points: 39 },
                { rank: 8, team: 'Neom', icon: 'ًں”µ', played: 26, won: 9, drawn: 6, lost: 11, points: 33 },
                { rank: 9, team: 'Al Fayha', icon: 'ًںں ', played: 26, won: 9, drawn: 6, lost: 11, points: 33 },
                { rank: 10, team: 'Al Hazem', icon: 'ًںں¢', played: 26, won: 8, drawn: 7, lost: 11, points: 31 }
            ],
            scorers: [
                { rank: 1, name: 'Cristiano Ronaldo', team: 'Al Nassr', goals: 28 },
                { rank: 2, name: 'Aleksandar Mitrovic', team: 'Al Hilal', goals: 22 }
            ]
        },
        ucl: {
            name: 'Champions League',
            standings: [
                { rank: 1, team: 'Arsenal', icon: 'https://media.api-sports.io/football/teams/42.png', played: 8, won: 8, drawn: 0, lost: 0, points: 24, group: 'League Phase' },
                { rank: 2, team: 'Bayern Munich', icon: 'https://media.api-sports.io/football/teams/157.png', played: 8, won: 7, drawn: 0, lost: 1, points: 21, group: 'League Phase' },
                { rank: 3, team: 'Liverpool', icon: 'https://media.api-sports.io/football/teams/40.png', played: 8, won: 6, drawn: 0, lost: 2, points: 18, group: 'League Phase' },
                { rank: 4, team: 'Tottenham', icon: 'https://media.api-sports.io/football/teams/47.png', played: 8, won: 5, drawn: 2, lost: 1, points: 17, group: 'League Phase' },
                { rank: 5, team: 'Barcelona', icon: 'https://media.api-sports.io/football/teams/529.png', played: 8, won: 5, drawn: 1, lost: 2, points: 16, group: 'League Phase' },
                { rank: 6, team: 'Chelsea', icon: 'https://media.api-sports.io/football/teams/49.png', played: 8, won: 5, drawn: 1, lost: 2, points: 16, group: 'League Phase' },
                { rank: 7, team: 'Sporting CP', icon: 'https://media.api-sports.io/football/teams/228.png', played: 8, won: 5, drawn: 1, lost: 2, points: 16, group: 'League Phase' },
                { rank: 8, team: 'Man City', icon: 'https://media.api-sports.io/football/teams/50.png', played: 8, won: 5, drawn: 1, lost: 2, points: 16, group: 'League Phase' }
            ],
            scorers: [
                { rank: 1, name: 'Harry Kane', team: 'Bayern', goals: 9 },
                { rank: 2, name: 'Erling Haaland', team: 'Man City', goals: 8 }
            ]
        },
        egypt: {
            name: 'Egyptian Premier League',
            standings: [
                { rank: 1, team: 'Zamalek', icon: 'https://media.api-sports.io/football/teams/1024.png', played: 20, won: 13, drawn: 4, lost: 3, points: 43 },
                { rank: 2, team: 'Pyramids', icon: 'https://media.api-sports.io/football/teams/1025.png', played: 20, won: 13, drawn: 4, lost: 3, points: 43 },
                { rank: 3, team: 'Al Ahly', icon: 'https://media.api-sports.io/football/teams/1028.png', played: 20, won: 11, drawn: 7, lost: 2, points: 40 },
                { rank: 4, team: 'Ceramica Cleopatra', icon: 'ًں”´', played: 20, won: 11, drawn: 5, lost: 4, points: 38 },
                { rank: 5, team: 'Al Masry', icon: 'ًںں¢', played: 20, won: 8, drawn: 8, lost: 4, points: 32 },
                { rank: 6, team: 'Smouha', icon: 'ًں”µ', played: 20, won: 8, drawn: 7, lost: 5, points: 31 },
                { rank: 7, team: 'Enppi', icon: 'ًں”µ', played: 20, won: 7, drawn: 9, lost: 4, points: 30 },
                { rank: 8, team: 'Wadi Degla', icon: 'ًںں،', played: 20, won: 8, drawn: 5, lost: 7, points: 29 },
                { rank: 9, team: 'ZED FC', icon: 'ًںں،', played: 20, won: 7, drawn: 8, lost: 5, points: 29 },
                { rank: 10, team: 'El Gouna', icon: 'ًںں ', played: 20, won: 7, drawn: 7, lost: 6, points: 28 }
            ],
            scorers: [
                { rank: 1, name: 'Nasser Maher', team: 'Zamalek', goals: 7 },
                { rank: 2, name: 'Salah Mohsen', team: 'Al Masry', goals: 7 },
                { rank: 3, name: 'Oday Dabbagh', team: 'Zamalek', goals: 6 },
                { rank: 4, name: 'S. Ougola', team: 'Ceramica', goals: 6 },
                { rank: 5, name: 'Fagrie Lakay', team: 'Ceramica', goals: 5 }
            ]
        },
        caf: {
            name: 'CAF Champions League',
            standings: [
                { rank: 1, team: 'RS Berkane', icon: 'ًںں ', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'Group A' },
                { rank: 2, team: 'Pyramids FC', icon: 'ًں”µ', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'Group A' },
                { rank: 1, team: 'Al Ahly', icon: 'ًں”´', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'Group B' },
                { rank: 2, team: 'Young Africans', icon: 'ًںں¢', played: 3, won: 1, drawn: 1, lost: 1, points: 4, group: 'Group B' },
                { rank: 1, team: 'Sundowns', icon: 'ًںں،', played: 3, won: 1, drawn: 2, lost: 0, points: 5, group: 'Group C' },
                { rank: 2, team: 'Al Hilal', icon: 'ًں”µ', played: 3, won: 1, drawn: 2, lost: 0, points: 5, group: 'Group C' },
                { rank: 1, team: 'Stade Malien', icon: '⚪', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'Group D' },
                { rank: 2, team: 'Espérance', icon: '🔴', played: 3, won: 1, drawn: 2, lost: 0, points: 5, group: 'Group D' }
            ],
            scorers: [
                { rank: 1, name: 'Hussein El Shahat', team: 'Al Ahly', goals: 4 }
            ]
        }
    },
    ar: {
        premier: {
            name: 'الدوري الإنجليزي',
            standings: [
                { rank: 1, team: 'آرسنال', icon: '🔴', played: 30, won: 20, drawn: 7, lost: 3, points: 67 },
                { rank: 2, team: 'مانشستر سيتي', icon: '🔵', played: 29, won: 18, drawn: 6, lost: 5, points: 60 },
                { rank: 3, team: 'مانشستر يونايتد', icon: '🔴', played: 29, won: 14, drawn: 9, lost: 6, points: 51 },
                { rank: 4, team: 'أستون فيلا', icon: '🔴', played: 29, won: 14, drawn: 9, lost: 6, points: 51 },
                { rank: 5, team: 'تشيلسي', icon: '🔵', played: 29, won: 14, drawn: 6, lost: 9, points: 48 },
                { rank: 6, team: 'ليفربول', icon: '🔴', played: 29, won: 13, drawn: 9, lost: 7, points: 48 },
                { rank: 7, team: 'توتنهام', icon: '⚪', played: 30, won: 13, drawn: 5, lost: 12, points: 44 },
                { rank: 8, team: 'نيوكاسل', icon: '⚫', played: 29, won: 12, drawn: 6, lost: 11, points: 42 },
                { rank: 9, team: 'وست هام', icon: '⚒️', played: 30, won: 11, drawn: 8, lost: 11, points: 41 },
                { rank: 10, team: 'برايتون', icon: '🔵', played: 29, won: 10, drawn: 9, lost: 10, points: 39 }
            ],
            scorers: [
                { rank: 1, name: 'بوكايو ساكا', team: 'آرسنال', goals: 19, photo: 'https://media.api-sports.io/football/players/1460.png' },
                { rank: 2, name: 'إيرلينج هالاند', team: 'مانشستر سيتي', goals: 18, photo: 'https://media.api-sports.io/football/players/1100.png' },
                { rank: 3, name: 'محمد صلاح', team: 'ليفربول', goals: 17, photo: 'https://media.api-sports.io/football/players/306.png' },
                { rank: 4, name: 'أولي واتكينز', team: 'أستون فيلا', goals: 16, photo: 'https://media.api-sports.io/football/players/19134.png' }
            ]
        },
        laliga: {
            name: 'الدوري الإسباني',
            standings: [
                { rank: 1, team: 'برشلونة', icon: '🔴', played: 27, won: 22, drawn: 1, lost: 4, points: 67 },
                { rank: 2, team: 'ريال مدريد', icon: '⚪', played: 27, won: 20, drawn: 3, lost: 4, points: 63 },
                { rank: 3, team: 'فياريال', icon: '🟡', played: 28, won: 17, drawn: 4, lost: 7, points: 55 },
                { rank: 4, team: 'أتلتيكو مدريد', icon: '🔴', played: 27, won: 16, drawn: 6, lost: 5, points: 54 },
                { rank: 5, team: 'ريال بيتيس', icon: '🟢', played: 27, won: 12, drawn: 7, lost: 8, points: 43 },
                { rank: 6, team: 'سيلتا فيغو', icon: '🔵', played: 27, won: 11, drawn: 7, lost: 9, points: 40 },
                { rank: 7, team: 'إسبانيول', icon: '🔵', played: 27, won: 10, drawn: 7, lost: 10, points: 37 },
                { rank: 8, team: 'ريال سوسيداد', icon: '🔵', played: 27, won: 9, drawn: 8, lost: 10, points: 35 }
            ],
            scorers: [
                { rank: 1, name: 'روبرت ليفاندوفسكي', team: 'برشلونة', goals: 21 },
                { rank: 2, name: 'كيليان مبابي', team: 'ريال مدريد', goals: 19 }
            ]
        },
        spl: {
            name: 'دوري روشن',
            standings: [
                { rank: 1, team: 'النصر', icon: '💛', played: 25, won: 21, drawn: 1, lost: 3, points: 64 },
                { rank: 2, team: 'الأهلي', icon: '💚', played: 26, won: 19, drawn: 5, lost: 2, points: 62 },
                { rank: 3, team: 'الهلال', icon: '🔵', played: 25, won: 18, drawn: 7, lost: 0, points: 61 },
                { rank: 4, team: 'القادسية', icon: '🔵', played: 26, won: 18, drawn: 6, lost: 2, points: 60 },
                { rank: 5, team: 'التعاون', icon: '🔵', played: 26, won: 13, drawn: 6, lost: 7, points: 45 },
                { rank: 6, team: 'الاتحاد', icon: '⚫', played: 26, won: 12, drawn: 6, lost: 8, points: 42 },
                { rank: 7, team: 'الاتفاق', icon: '🟢', played: 26, won: 11, drawn: 6, lost: 9, points: 39 }
            ],
            scorers: [
                { rank: 1, name: 'كريستيانو رونالدو', team: 'النصر', goals: 28 },
                { rank: 2, name: 'ألكسندر ميتروفيتش', team: 'الهلال', goals: 22 }
            ]
        },
        ucl: {
            name: 'دوري أبطال أوروبا',
            standings: [
                { rank: 1, team: 'آرسنال', icon: '🔴', played: 8, won: 8, drawn: 0, lost: 0, points: 24, group: 'مرحلة الدوري' },
                { rank: 2, team: 'بايرن ميونخ', icon: '🔴', played: 8, won: 7, drawn: 0, lost: 1, points: 21, group: 'مرحلة الدوري' },
                { rank: 3, team: 'ليفربول', icon: '🔴', played: 8, won: 6, drawn: 0, lost: 2, points: 18, group: 'مرحلة الدوري' },
                { rank: 4, team: 'توتنهام', icon: '⚪', played: 8, won: 5, drawn: 2, lost: 1, points: 17, group: 'مرحلة الدوري' },
                { rank: 5, team: 'برشلونة', icon: '🔴', played: 8, won: 5, drawn: 1, lost: 2, points: 16, group: 'مرحلة الدوري' },
                { rank: 6, team: 'تشيلسي', icon: '🔵', played: 8, won: 5, drawn: 1, lost: 2, points: 16, group: 'مرحلة الدوري' }
            ],
            scorers: [
                { rank: 1, name: 'هاري كين', team: 'بايرن', goals: 9 },
                { rank: 2, name: 'إيرلينج هالاند', team: 'مانشستر سيتي', goals: 8 }
            ]
        },
        egypt: {
            name: 'الدوري المصري',
            standings: [
                { rank: 1, team: 'الزمالك', icon: '⚪', played: 20, won: 13, drawn: 4, lost: 3, points: 43 },
                { rank: 2, team: 'بيراميدز', icon: '🔵', played: 20, won: 13, drawn: 4, lost: 3, points: 43 },
                { rank: 3, team: 'الأهلي', icon: '🔴', played: 20, won: 11, drawn: 7, lost: 2, points: 40 },
                { rank: 4, team: 'سيراميكا كليوباترا', icon: '🔴', played: 20, won: 11, drawn: 5, lost: 4, points: 38 },
                { rank: 5, team: 'المصري', icon: '🟢', played: 20, won: 8, drawn: 8, lost: 4, points: 32 },
                { rank: 6, team: 'سموحة', icon: '🔵', played: 20, won: 8, drawn: 7, lost: 5, points: 31 },
                { rank: 7, team: 'إنبي', icon: '🔵', played: 20, won: 7, drawn: 9, lost: 4, points: 30 },
                { rank: 8, team: 'وادي دجلة', icon: '🟡', played: 20, won: 8, drawn: 5, lost: 7, points: 29 },
                { rank: 9, team: 'زد إف سي', icon: '🟡', played: 20, won: 7, drawn: 8, lost: 5, points: 29 },
                { rank: 10, team: 'الجونة', icon: '⚪', played: 20, won: 7, drawn: 7, lost: 6, points: 28 }
            ],
            scorers: [
                { rank: 1, name: 'ناصر ماهر', team: 'الزمالك', goals: 7 },
                { rank: 2, name: 'صلاح محسن', team: 'المصري', goals: 7 },
                { rank: 3, name: 'عدي الدباغ', team: 'الزمالك', goals: 6 },
                { rank: 4, name: 'صديق أوجولا', team: 'سيراميكا', goals: 6 },
                { rank: 5, name: 'فخري لاكاي', team: 'سيراميكا', goals: 5 }
            ]
        },
        caf: {
            name: 'دوري أبطال أفريقيا',
            standings: [
                { rank: 1, team: 'نهضة بركان', icon: '🟠', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'المجموعة أ' },
                { rank: 2, team: 'بيراميدز', icon: '🔵', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'المجموعة أ' },
                { rank: 1, team: 'الأهلي', icon: '🔴', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'المجموعة ب' },
                { rank: 2, team: 'يانغ أفريكانز', icon: '🟢', played: 3, won: 1, drawn: 1, lost: 1, points: 4, group: 'المجموعة ب' },
                { rank: 1, team: 'صنداونز', icon: '🟡', played: 3, won: 1, drawn: 2, lost: 0, points: 5, group: 'المجموعة ج' },
                { rank: 2, team: 'الهلال السوداني', icon: '🔵', played: 3, won: 1, drawn: 2, lost: 0, points: 5, group: 'المجموعة ج' },
                { rank: 1, team: 'ستاد مالي', icon: '⚪', played: 3, won: 2, drawn: 1, lost: 0, points: 7, group: 'المجموعة د' },
                { rank: 2, team: 'الترجي', icon: '🔴', played: 3, won: 1, drawn: 2, lost: 0, points: 5, group: 'المجموعة د' }
            ],
            scorers: [
                { rank: 1, name: 'حسين الشحات', team: 'الأهلي', goals: 4 }
            ]
        }
    }
};

const leagueIdMap = {
    'premier': 2021,
    'laliga': 2014,
    'seriea': 2019,
    'bundesliga': 2002,
    'ligue1': 2015,
    'eredivisie': 2003,
    'ucl': 2001,
    'championship': 2016,
    'portugal': 2017,
    'brazil': 2013,
    'worldcup': 2000,
    'euro': 2018
};

let selectedLeague = 'premier';

document.addEventListener('DOMContentLoaded', function() {
    const leagueTabs = document.querySelectorAll('.league-tab');
    leagueTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            leagueTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            selectedLeague = this.getAttribute('data-league');
            loadLeaguesContent();
        });
    });

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.show-more-btn');
        if (!btn) return;

        const table = document.getElementById('standingsTable');
        const btnSpan = btn.querySelector('span');
        const icon = btn.querySelector('i');

        table.classList.toggle('is-expanded');

        if (table.classList.contains('is-expanded')) {
            if (btnSpan) btnSpan.innerText = currentLang === 'ar' ? 'عرض أقل' : 'Show Less';
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            if (btnSpan) btnSpan.innerText = currentLang === 'ar' ? 'عرض المزيد' : 'Show More';
            if (icon) icon.style.transform = 'rotate(0deg)';
            table.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Initial load
    loadLeaguesContent();
});

async function loadLeaguesContent() {
    const leagueId = leagueIdMap[selectedLeague];

    // Reset toggle button state on every league switch
    const toggleWrapper = document.getElementById('tableToggleWrapper');
    const standingsTable = document.getElementById('standingsTable');
    if (toggleWrapper) toggleWrapper.style.display = 'none';
    if (standingsTable) {
        standingsTable.classList.remove('is-expanded');
        const btnSpan = document.querySelector('#showMoreBtn span');
        if (btnSpan) btnSpan.innerText = currentLang === 'ar' ? 'عرض المزيد' : 'Show More';
        const icon = document.querySelector('#showMoreBtn i');
        if (icon) icon.style.transform = 'rotate(0deg)';
    }

    // Show loading synchronously to give feedback
    FootballAPI.showLoading(document.getElementById('standingsTable'));
    FootballAPI.showLoading(document.getElementById('scorersList'));

    try {
        // Fetch data in parallel
        const [standingsResponse, scorersResponse] = await Promise.all([
            FootballAPI.fetchStandings(leagueId),
            FootballAPI.fetchTopScorers(leagueId)
        ]);

        loadStandingsTable(standingsResponse);
        loadTopScorers(scorersResponse);
    } catch (error) {
        console.error('Error loading league data:', error);
        loadStandingsTable(null);
        loadTopScorers(null);
    }
}

function loadStandingsTable(apiData) {
    const container = document.getElementById('standingsTable');
    if (!container) return;
    
    let standings = [];
    let leagueName = '';
    let apiSeason = null;
    
    if (apiData && Array.isArray(apiData) && apiData.length > 0) {
        // Transform API Standings
        const league = apiData[0].league;
        if (league && league.standings && Array.isArray(league.standings) && league.standings.length > 0) {
            leagueName = league.name;
            apiSeason = league.season;
            
            // Handle multi-group standings
            let rawStandings = league.standings[0];
            if (league.standings.length > 1) {
                rawStandings = league.standings.flat();
            }
            
            if (Array.isArray(rawStandings)) {
                standings = rawStandings.map(s => {
                    const teamName = s.team?.name || 'Unknown';
                    const teamLogo = s.team?.logo;
                    return {
                        rank: s.rank,
                        team: teamName,
                        icon: teamLogo ? `<img src="${teamLogo}" class="team-logo-mini" alt="${teamName}" onerror="this.src='⚽';this.classList.add('error')">` : '⚽',
                        played: s.all?.played || 0,
                        won: s.all?.win || 0,
                        drawn: s.all?.draw || 0,
                        lost: s.all?.lose || 0,
                        points: s.points || 0,
                        group: s.group
                    };
                });
            }
        }

        // If API returned very few teams (free plan = only 1 or 2), or if it returned OLD data (2024 instead of 2025)
        // Note: in March 2026, 2025 is the current season.
        if (standings.length < 3 || (apiSeason && apiSeason < 2025)) {
            const fallback = leaguesDatabase[currentLang][selectedLeague];
            if (fallback) {
                standings = fallback.standings;
                leagueName = fallback.name;
                apiSeason = 2025; // Mark as current season for badge
            }
        }
    } else {
        // Fallback to local database
        const fallback = leaguesDatabase[currentLang][selectedLeague];
        if (fallback) {
            standings = fallback.standings;
            leagueName = fallback.name;
            apiSeason = 2025;
        }
    }

    if (standings.length === 0) {
        FootballAPI.showError(container, currentLang);
        return;
    }

    container.innerHTML = '';
    
    // Season Badge
    const badge = document.createElement('div');
    badge.className = 'season-badge';
    
    const displaySeason = apiSeason || 2025;
    const isStatic = !apiData || (apiSeason === 2025 && (!apiData || apiData.length === 0));
    
    let seasonText = currentLang === 'en'
        ? `Season ${displaySeason}/${Number(displaySeason)+1}`
        : `موسم ${displaySeason}/${Number(displaySeason)+1}`;
    if (isStatic) {
        seasonText += currentLang === 'en' ? ' (Live)' : ' (مباشر)';
    }
    
    badge.innerHTML = seasonText;
    container.appendChild(badge);

    // Grouping Logic - Only for CAF Champions League specifically
    const isCAF = selectedLeague === 'caf';
    
    if (isCAF) {
        const groupsGrid = document.createElement('div');
        groupsGrid.className = 'groups-grid';
        container.appendChild(groupsGrid);

        const grouped = standings.reduce((acc, team) => {
            const groupName = team.group || (currentLang === 'en' ? 'Other' : 'أخرى');
            if (!acc[groupName]) acc[groupName] = [];
            acc[groupName].push(team);
            return acc;
        }, {});

        Object.entries(grouped).forEach(([groupName, teams], groupIndex) => {
            const groupWrapper = document.createElement('div');
            groupWrapper.className = 'standing-group-box';
            groupsGrid.appendChild(groupWrapper);

            const groupHeader = document.createElement('div');
            groupHeader.className = 'table-group-header';
            groupHeader.innerHTML = `<span>${groupName}</span>`;
            groupWrapper.appendChild(groupHeader);

            const tableDiv = document.createElement('div');
            tableDiv.className = 'standings-table-mini';
            groupWrapper.appendChild(tableDiv);

            const header = document.createElement('div');
            header.className = 'table-row table-header';
            header.innerHTML = `
                <div class="rank">#</div>
                <div>${currentLang === 'en' ? 'Team' : 'الفريق'}</div>
                <div class="stat">${currentLang === 'en' ? 'P' : 'لعب'}</div>
                <div class="stat">${currentLang === 'en' ? 'Pts' : 'نقاط'}</div>
            `;
            tableDiv.appendChild(header);

            teams.forEach((team, index) => {
                const row = document.createElement('div');
                row.className = 'table-row';
                row.style.animation = 'slideUp 0.4s ease-out backwards';
                row.style.animationDelay = `${(groupIndex * 4 + index) * 0.05}s`;
                
                row.innerHTML = `
                    <div class="rank">${team.rank}</div>
                    <div class="team-info">
                        <span class="team-icon">${team.icon}</span>
                        <span class="team-name">${team.team}</span>
                    </div>
                    <div class="stat">${team.played}</div>
                    <div class="stat"><strong>${team.points}</strong></div>
                `;
                tableDiv.appendChild(row);
            });
        });
    } else {
        const header = document.createElement('div');
        header.className = 'table-row table-header';
        header.innerHTML = `
            <div class="rank">#</div>
            <div>${currentLang === 'en' ? 'Team' : 'الفريق'}</div>
            <div class="stat">${currentLang === 'en' ? 'P' : 'لعب'}</div>
            <div class="stat">${currentLang === 'en' ? 'W' : 'فاز'}</div>
            <div class="stat">${currentLang === 'en' ? 'D' : 'تعادل'}</div>
            <div class="stat">${currentLang === 'en' ? 'Pts' : 'نقاط'}</div>
        `;
        container.appendChild(header);

        standings.forEach((team, index) => {
            const row = createStandingRow(team, index);
            container.appendChild(row);
        });
    }

    function createStandingRow(team, animationIndex) {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.style.animation = 'slideUp 0.4s ease-out backwards';
        row.style.animationDelay = `${animationIndex * 0.05}s`;
        
        const teamIcon = (team.icon && team.icon.startsWith('http'))
            ? `<img src="${team.icon}" class="team-logo-mini" alt="${team.team}" onerror="this.outerHTML='⚽'">`
            : `<span class="team-emoji-icon">${team.icon || '⚽'}</span>`;

        row.innerHTML = `
            <div class="rank">${team.rank}</div>
            <div class="team-info">
                ${teamIcon}
                <div class="team-details">
                    <span class="team-name">${team.team}</span>
                    ${team.group && !isCAF ? `<span class="team-group">${team.group}</span>` : ''}
                </div>
            </div>
            <div class="stat">${team.played}</div>
            <div class="stat">${team.won}</div>
            <div class="stat">${team.drawn}</div>
            <div class="stat"><strong>${team.points}</strong></div>
        `;
        return row;
    }

    const existingWrappers = document.querySelectorAll('#dynamicShowMoreWrapper');
    existingWrappers.forEach(w => w.remove());

    if (standings.length > 5) {
        const wrapper = document.createElement('div');
        wrapper.id = 'dynamicShowMoreWrapper';
        wrapper.style.cssText = 'display:flex;justify-content:center;margin-top:12px;';

        const btn = document.createElement('button');
        btn.id = 'dynamicShowMoreBtn';
        btn.className = 'show-more-btn';
        btn.innerHTML = `<span>${currentLang === 'ar' ? 'عرض المزيد' : 'Show More'}</span><i class="arrow-icon" style="display:inline-block;transition:transform 0.3s ease;font-style:normal;margin-left:6px;">▼</i>`;

        wrapper.appendChild(btn);
        container.insertAdjacentElement('afterend', wrapper);
    }
}

function loadTopScorers(apiData) {
    const container = document.getElementById('scorersList');
    if (!container) return;
    
    let scorers = [];

    if (apiData && apiData.length > 0) {
        scorers = apiData.slice(0, 10).map((s, index) => {
            const team = s.statistics[0].team;
            const fallbackPlayer = leaguesDatabase[currentLang][selectedLeague]?.scorers?.find(fs => fs.name === s.player.name);
            
            return {
                rank: index + 1,
                name: s.player.name,
                photo: s.player.photo || fallbackPlayer?.photo || null,
                team: team.name,
                teamLogo: team.logo || null,
                goals: s.statistics[0].goals.total
            };
        });
    } else {
        const leagueData = leaguesDatabase[currentLang][selectedLeague];
        if (leagueData && leagueData.scorers) {
            scorers = leagueData.scorers.map(s => ({
                ...s,
                photo: s.photo || null,
                teamLogo: s.teamLogo || null
            }));
        }
    }

    if (scorers.length === 0) {
        FootballAPI.showError(container, currentLang);
        return;
    }

    container.innerHTML = '';
    
    scorers.forEach((scorer, index) => {
        const item = document.createElement('div');
        item.className = 'scorer-item';
        item.style.animation = 'slideUp 0.4s ease-out backwards';
        item.style.animationDelay = `${index * 0.05}s`;
        
        const playerImg = scorer.photo 
            ? `<img src="${scorer.photo}" class="scorer-photo" alt="${scorer.name}" onerror="this.outerHTML='<div class=\\'scorer-photo-placeholder\\'>👤</div>'">`
            : '<div class="scorer-photo-placeholder">👤</div>';
            
        const teamLogo = scorer.teamLogo
            ? `<img src="${scorer.teamLogo}" class="scorer-team-logo" alt="${scorer.team}" onerror="this.style.display='none'">`
            : '';

        const rankIcon = index === 0 ? '👑 ' : '';
        
        item.innerHTML = `
            <div class="scorer-info">
                <div class="scorer-rank">${rankIcon}${scorer.rank}</div>
                <div class="scorer-photo-wrapper">
                    ${playerImg}
                </div>
                <div class="scorer-details">
                    <div class="scorer-name">${scorer.name}</div>
                    <div class="scorer-team-info">
                        ${teamLogo}
                        <span class="scorer-team-name">${scorer.team}</span>
                    </div>
                </div>
            </div>
            <div class="scorer-goals">${scorer.goals}</div>
        `;
        
        container.appendChild(item);
    });
}

// Knockout Stage Data
const knockoutData = {
    ucl: {
        en: {
            title: 'Knockout Bracket',
            rounds: [
                {
                    name: 'Quarter-finals',
                    matches: [
                        { t1: { name: 'Arsenal', score: '2', icon: '🔴', winner: true }, t2: { name: 'Bayern Munich', score: '1', icon: '🔴', winner: false } },
                        { t1: { name: 'Real Madrid', score: '3', icon: '⚪', winner: true }, t2: { name: 'Man City', score: '2', icon: '🔵', winner: false } },
                        { t1: { name: 'Barcelona', score: '1', icon: '🔴', winner: false }, t2: { name: 'PSG', score: '4', icon: '🔵', winner: true } },
                        { t1: { name: 'Atletico', score: '2 (3)', icon: '🔴', winner: false }, t2: { name: 'Dortmund', score: '2 (4)', icon: '🟡', winner: true } }
                    ]
                },
                {
                    name: 'Semi-finals',
                    matches: [
                        { t1: { name: 'Arsenal', score: '1', icon: '🔴', winner: false }, t2: { name: 'Real Madrid', score: '2', icon: '⚪', winner: true } },
                        { t1: { name: 'PSG', score: '0', icon: '🔵', winner: false }, t2: { name: 'Dortmund', score: '1', icon: '🟡', winner: true } }
                    ]
                },
                {
                    name: 'Final',
                    matches: [
                        { t1: { name: 'Real Madrid', score: '2', icon: '⚪', winner: true }, t2: { name: 'Dortmund', score: '0', icon: '🟡', winner: false } }
                    ]
                }
            ]
        },
        ar: {
            title: 'شجرة التصفيات',
            rounds: [
                {
                    name: 'ربع النهائي',
                    matches: [
                        { t1: { name: 'آرسنال', score: '2', icon: '🔴', winner: true }, t2: { name: 'بايرن ميونخ', score: '1', icon: '🔴', winner: false } },
                        { t1: { name: 'ريال مدريد', score: '3', icon: '⚪', winner: true }, t2: { name: 'مانشستر سيتي', score: '2', icon: '🔵', winner: false } },
                        { t1: { name: 'برشلونة', score: '1', icon: '🔴', winner: false }, t2: { name: 'باريس س.ج', score: '4', icon: '🔵', winner: true } },
                        { t1: { name: 'أتلتيكو', score: '2 (3)', icon: '🔴', winner: false }, t2: { name: 'دورتموند', score: '2 (4)', icon: '🟡', winner: true } }
                    ]
                },
                {
                    name: 'نصف النهائي',
                    matches: [
                        { t1: { name: 'آرسنال', score: '1', icon: '🔴', winner: false }, t2: { name: 'ريال مدريد', score: '2', icon: '⚪', winner: true } },
                        { t1: { name: 'باريس س.ج', score: '0', icon: '🔵', winner: false }, t2: { name: 'دورتموند', score: '1', icon: '🟡', winner: true } }
                    ]
                },
                {
                    name: 'النهائي',
                    matches: [
                        { t1: { name: 'ريال مدريد', score: '2', icon: '⚪', winner: true }, t2: { name: 'دورتموند', score: '0', icon: '🟡', winner: false } }
                    ]
                }
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.stage-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('data-target');
            document.getElementById('standingsData').style.display = targetId === 'standingsData' ? 'block' : 'none';
            document.getElementById('knockoutData').style.display = targetId === 'knockoutData' ? 'block' : 'none';
            
            if (targetId === 'knockoutData') {
                renderKnockoutTree();
            }
        });
    });
});

function renderKnockoutTree() {
    const container = document.getElementById('knockoutBracket');
    if (!container) return;
    
    // Use API data if loaded, otherwise fallback to static
    let activeData = null;
    if (window.currentKnockoutApiData && window.currentKnockoutApiData.rounds && window.currentKnockoutApiData.rounds.length > 0) {
        activeData = window.currentKnockoutApiData;
    } else {
        const kd = knockoutData[selectedLeague];
        if (kd) activeData = kd[currentLang];
    }
    
    if (!activeData) {
        container.innerHTML = '<div class="error-msg">' + (currentLang === 'ar' ? 'لا تتوفر أدوار إقصائية لهذه البطولة حالياً' : 'Knockout stages not available for this tournament currently') + '</div>';
        return;
    }
    
    let html = '<div class="bracket">';
    
    activeData.rounds.forEach((round, index) => {
        const matchesCount = round.matches.length;
        const colClass = 'bracket-column col-' + matchesCount;
        
        html += '<div class="' + colClass + '">';
        html += '<div class="bracket-column-title">' + round.name + '</div>';
        
        round.matches.forEach(match => {
            const t1Class = match.t1.winner ? 'bracket-team winner' : 'bracket-team';
            const t2Class = match.t2.winner ? 'bracket-team winner' : 'bracket-team';
            
            const t1IconHtml = match.t1.icon && match.t1.icon.startsWith('http') 
                ? `<img src="${match.t1.icon}" class="bracket-team-logo" alt="${match.t1.name}" onerror="this.outerHTML='<span class=\\'bracket-team-emoji\\'>🛡️</span>'">` 
                : `<span class="bracket-team-emoji">${match.t1.icon || '🛡️'}</span>`;
            
            const t2IconHtml = match.t2.icon && match.t2.icon.startsWith('http') 
                ? `<img src="${match.t2.icon}" class="bracket-team-logo" alt="${match.t2.name}" onerror="this.outerHTML='<span class=\\'bracket-team-emoji\\'>🛡️</span>'">` 
                : `<span class="bracket-team-emoji">${match.t2.icon || '🛡️'}</span>`;

            html += '<div class="bracket-match">' +
                    '<div class="' + t1Class + '">' +
                        '<div class="bracket-team-info">' +
                            t1IconHtml +
                            '<span class="team-name">' + match.t1.name + '</span>' +
                        '</div>' +
                        '<span class="team-score">' + (match.t1.score || '-') + '</span>' +
                    '</div>' +
                    '<div class="' + t2Class + '">' +
                        '<div class="bracket-team-info">' +
                            t2IconHtml +
                            '<span class="team-name">' + match.t2.name + '</span>' +
                        '</div>' +
                        '<span class="team-score">' + (match.t2.score || '-') + '</span>' +
                    '</div>' +
                '</div>';
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function parseApiKnockoutData(apiResult) {
    if (!apiResult || !apiResult.fixtures || apiResult.fixtures.length === 0) return null;
    
    const roundsMap = {};
    
    apiResult.fixtures.forEach(f => {
        let roundStr = 'Unknown';
        if (apiResult.source === 'football-data') {
            roundStr = f.stage || 'Unknown';
        }
        
        let rs = roundStr.toLowerCase();
        let roundIdx = 0;
        let pRoundName = '';
        
        if (rs.includes('regular') || rs.includes('league phase') || rs.includes('group') || rs.includes('matchday')) {
            return;
        }

        if (rs.includes('quarter') || rs.includes('1/4')) {
            pRoundName = currentLang === 'ar' ? 'ربع النهائي' : 'Quarter-finals';
            roundIdx = 1;
        } else if (rs.includes('semi') || rs.includes('1/2')) {
            pRoundName = currentLang === 'ar' ? 'نصف النهائي' : 'Semi-finals';
            roundIdx = 2;
        } else if (rs === 'final' || rs === 'finals' || rs === 'final round') {
            pRoundName = currentLang === 'ar' ? 'النهائي' : 'Final';
            roundIdx = 3;
        } else {
            return;
        }
        
        if (!roundsMap[roundIdx]) roundsMap[roundIdx] = { name: pRoundName, order: roundIdx, matches: [] };
        
        let m1, m2;
        if (apiResult.source === 'api-sports') {
            m1 = { 
                name: f.teams.home.name, 
                score: f.goals.home !== null ? f.goals.home : '-', 
                winner: f.teams.home.winner === true,
                icon: f.teams.home.logo
            };
            m2 = { 
                name: f.teams.away.name, 
                score: f.goals.away !== null ? f.goals.away : '-', 
                winner: f.teams.away.winner === true,
                icon: f.teams.away.logo
            };
        } else {
            m1 = { 
                name: f.homeTeam.name || f.homeTeam.shortName, 
                score: f.score?.fullTime?.home !== null ? f.score.fullTime.home : '-', 
                winner: f.score?.winner === 'HOME_TEAM',
                icon: f.homeTeam.crest
            };
            m2 = { 
                name: f.awayTeam.name || f.awayTeam.shortName, 
                score: f.score?.fullTime?.away !== null ? f.score.fullTime.away : '-', 
                winner: f.score?.winner === 'AWAY_TEAM',
                icon: f.awayTeam.crest
            };
        }
        
        const pairId = [m1.name, m2.name].sort().join('-vs-');
        const existingIdx = roundsMap[roundIdx].matches.findIndex(m => m.pairId === pairId);
        
        const matchPayload = { t1: m1, t2: m2, pairId: pairId };
        
        if (existingIdx !== -1) {
            roundsMap[roundIdx].matches[existingIdx] = matchPayload;
        } else {
            roundsMap[roundIdx].matches.push(matchPayload);
        }
    });
    
    const sortedRounds = Object.values(roundsMap).sort((a,b) => a.order - b.order);
    if (sortedRounds.length === 0) return null;
    return { title: '', rounds: sortedRounds };
}

const originalLoad = loadLeaguesContent;
loadLeaguesContent = async function() {
    await originalLoad();
    
    window.currentKnockoutApiData = null;
    const leagueId = leagueIdMap[selectedLeague];
    
    let hasKnockoutBtn = false;
    const knockoutBtn = document.getElementById('knockoutToggleBtn');
    
    if (knockoutData[selectedLeague]) {
        hasKnockoutBtn = true;
    }
    
    try {
        const bracketApiData = await FootballAPI.fetchTournamentBracket(leagueId);
        const parsed = parseApiKnockoutData(bracketApiData);
        if (parsed) {
            window.currentKnockoutApiData = parsed;
            hasKnockoutBtn = true;
        }
    } catch (e) {
        console.log('[LiveCenter] Status Check Completed');
    }
    
    if (knockoutBtn) {
        if (hasKnockoutBtn) {
            knockoutBtn.style.display = 'inline-block';
        } else {
            knockoutBtn.style.display = 'none';
            // Force back to standings if knockout isn't available
            const standingsBtn = document.querySelector('[data-target="standingsData"]');
            if (standingsBtn && knockoutBtn.classList.contains('active')) standingsBtn.click();
        }
    }
    
    // Refresh the bracket if we are already viewing it to display new dynamic data instantly
    if (knockoutBtn && knockoutBtn.classList.contains('active')) {
        renderKnockoutTree();
    }
};

