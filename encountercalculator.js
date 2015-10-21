function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function numCommaSep(n) {
    // Format numbers like 1,000,000.
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// See DMG p. 275
var monsterXpToCr = {
    10: 0,
    25: 0.125,
    50: 0.25,
    100: 0.5,
    200: 1,
    450: 2,
    700: 3,
    1100: 4,
    1800: 5,
    2300: 6,
    2900: 7,
    3900: 8,
    5000: 9,
    5900: 10,
    7200: 11,
    8400: 12,
    10000: 13,
    11500: 14,
    13000: 15,
    15000: 16,
    18000: 17,
    20000: 18,
    22000: 19,
    25000: 20,
    33000: 21,
    41000: 22,
    50000: 23,
    62000: 24,
    75000: 25,
    90000: 26,
    105000: 27,
    120000: 28,
    135000: 29,
    155000: 30
};

// See DMG p. 82
function getEncounterMultiplier() {
    var multipliers = [0.5, 1, 1.5, 2, 2.5, 3, 4];
    var multiplierIndex = 1;

    // Multiplier modified by number of monsters:
    var monsterCount = 1;
    if (monsterCount == 2) { multiplierIndex = 2; }
    if (monsterCount > 2 && monsterCount < 7) { multiplierIndex = 3; }
    if (monsterCount > 6 && monsterCount < 11) { multiplierIndex = 4; }
    if (monsterCount >= 15) { multiplierIndex = 5; }

    // Multiplier modified by number of player characters:
    if (characters.length < 3) {
        if (multiplierIndex > 0) {
            multiplierIndex--;
        }
    } else if (characters.length > 5) {
        if (multiplierIndex < 4) {
            multiplierIndex++;
        }
    }

    return multipliers[multiplierIndex];
};

// See DMG p 82
var encounterDifficultyByCharLevel = {
    1: [25, 50, 75, 100],
    2: [50, 100, 150, 200],
    3: [75, 150, 225, 400],
    4: [125, 250, 375, 500],
    5: [250, 500, 750, 1100],
    6: [300, 600, 900, 1400],
    7: [350, 750, 1100, 1700],
    8: [450, 900, 1400, 2100],
    9: [550, 1100, 1600, 2400],
    10: [600, 1200, 1900, 2800],
    11: [800, 1600, 2400, 3600],
    12: [1000, 2000, 3000, 4500],
    13: [1100, 2200, 3400, 5100],
    14: [1250, 2500, 3800, 5700],
    15: [1400, 2800, 4300, 6400],
    16: [1600, 3200, 4800, 7200],
    17: [2000, 3900, 5900, 8800],
    18: [2100, 4200, 6300, 9500],
    19: [2400, 4900, 7300, 10900],
    20: [2800, 5700, 8500, 12700]
};

// See DMG p. 84.
// This is XP of encounters between long rests, per character, based on character level.
var xpPerDay = {
    1: 300,
    2: 600,
    3: 1200,
    4: 1700,
    5: 3500,
    6: 4000,
    7: 5000,
    8: 6000,
    9: 7500,
    10: 9000,
    11: 10500,
    12: 11500,
    13: 13500,
    14: 15000,
    15: 18000,
    16: 20000,
    17: 25000,
    18: 27000,
    19: 30000,
    20: 40000
};

// See DMG p. 274
// These are keyed by challenge rating.
var monsterStats = {
    0: {
        prof: '+2',
        ac: '<= 13',
        hp: '1-6',
        attack: '<= +3',
        damage: '0-1',
        save: '<= 13'
    },
    0.125: {
        prof: '+2',
        ac: '13',
        hp: '7-35',
        attack: '+3',
        damage: '2-3',
        save: '13'
    },
    0.25: {
        prof: '+2',
        ac: '13',
        hp: '36-49',
        attack: '+3',
        damage: '4-5',
        save: '13'
    },
    0.5: {
        prof: '+2',
        ac: '13',
        hp: '50-70',
        attack: '+3',
        damage: '6-8',
        save: '13'
    },
    1: {
        prof: '+2',
        ac: '13',
        hp: '71-85',
        attack: '+3',
        damage: '9-14',
        save: '13'
    },
    2: {
        prof: '+2',
        ac: '13',
        hp: '86-100',
        attack: '+3',
        damage: '15-20',
        save: '13'
    },
    3: {
        prof: '+2',
        ac: '13',
        hp: '101-115',
        attack: '+4',
        damage: '21-26',
        save: '13'
    },
    4: {
        prof: '+2',
        ac: '14',
        hp: '116-130',
        attack: '+5',
        damage: '27-32',
        save: '14'
    },
    5: {
        prof: '+3',
        ac: '15',
        hp: '131-145',
        attack: '+6',
        damage: '33-38',
        save: '15'
    },
    6: {
        prof: '+3',
        ac: '15',
        hp: '146-160',
        attack: '+6',
        damage: '39-44',
        save: '15'
    },
    7: {
        prof: '+3',
        ac: '15',
        hp: '161-175',
        attack: '+6',
        damage: '45-50',
        save: '15'
    },
    8: {
        prof: '+3',
        ac: '16',
        hp: '175-190',
        attack: '+7',
        damage: '51-56',
        save: '16'
    },
    9: {
        prof: '+4',
        ac: '16',
        hp: '191-205',
        attack: '+7',
        damage: '57-62',
        save: '16'
    },
    10: {
        prof: '+4',
        ac: '17',
        hp: '206-220',
        attack: '+7',
        damage: '63-68',
        save: '16'
    },
    11: {
        prof: '+4',
        ac: '17',
        hp: '221-235',
        attack: '+8',
        damage: '69-74',
        save: '17'
    },
    12: {
        prof: '+4',
        ac: '17',
        hp: '236-250',
        attack: '+8',
        damage: '75-80',
        save: '17'
    },
};


var characters = [];

function intToStr(n) {
    switch(n) {
        case 1: return 'one'; break;
        case 2: return 'two'; break;
        case 3: return 'three'; break;
        case 4: return 'four'; break;
        case 5: return 'five'; break;
        case 6: return 'six'; break;
        case 7: return 'seven'; break;
        case 8: return 'eight'; break;
        case 9: return 'nine'; break;
        case 10: return 'ten'; break;
        case 11: return 'eleven'; break;
        case 12: return 'twelve'; break;
        default: return n.toString();
    }
}

function numSort(a, b) {
    return a - b;
}

function getXpPerDay() {
    var xp = 0;
    for (var i = 0, limit = characters.length; i < limit; i++) {
        xp = xp + xpPerDay[characters[i]];
    }
    return xp;
}

function calculateXpThresholds() {
    var easyTotal = 0;
    var mediumTotal = 0;
    var hardTotal = 0;
    var deadlyTotal = 0;
    function formatN(n) {
        return numCommaSep(Math.floor(n));
    }
    for (var i = 0, limit = characters.length; i < limit; i++) {
        easyTotal += encounterDifficultyByCharLevel[characters[i]][0];
        mediumTotal += encounterDifficultyByCharLevel[characters[i]][1];
        hardTotal += encounterDifficultyByCharLevel[characters[i]][2];
        deadlyTotal += encounterDifficultyByCharLevel[characters[i]][3];
    }
    var m = getEncounterMultiplier();
    document.getElementById('easyxp').innerHTML = formatN(easyTotal * m);
    document.getElementById('mediumxp').innerHTML = formatN(mediumTotal * m);
    document.getElementById('hardxp').innerHTML = formatN(hardTotal * m);
    document.getElementById('deadlyxp').innerHTML = formatN(deadlyTotal * m);
}

function addCharacter() {
    var l = document.getElementById('charlevel');
    var charLevel = l.options[l.selectedIndex].text;
    characters.push(charLevel);
    characters.sort(numSort);
    calculateXpThresholds();
    displayCharacterList();
    // Test:
    console.log(monsterStats[0.125].save);
}

function clearCharacters() {
    characters = [];
    document.getElementById('characters').innerHTML = '';
    document.getElementById('easyxp').innerHTML = '';
    document.getElementById('mediumxp').innerHTML = '';
    document.getElementById('hardxp').innerHTML = '';
    document.getElementById('deadlyxp').innerHTML = '';
    document.getElementById('xpperday').innerHTML = '';
}

function displayCharacterList() {
    charStr = capitalize(intToStr(characters.length)) + ' characters, levels ';
    for (var i = 0, limit = characters.length; i < limit; i++) {
        charStr = charStr + characters[i] + ' ';
    }
    document.getElementById('characters').innerHTML = charStr;
    document.getElementById('xpperday').innerHTML = numCommaSep(getXpPerDay());
}
