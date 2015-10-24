function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function numCommaSep(n) {
    // Format numbers like 1,000,000.
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// See DMG p. 82
// Encounter multiplier based on number of PC's and number of monsters:
function getEncounterMultiplier() {
    var multipliers = [0.5, 1, 1.5, 2, 2.5, 3, 4];
    var multiplierIndex = 1;

    // Multiplier modified by number of monsters.
    // Don't count really weak monsters.
    var totalXp = 0;
    for (var i = 0, limit = monsters.length; i < limit; i++) {
        totalXp += monsters[i].xp;
    }
    var avgXp = totalXp / monsters.length;
    var monsterCount = 0;
    for (var i = 0, limit = monsters.length; i < limit; i++) {
        if (monsters[i].xp >= (avgXp * 0.5)) {
            monsterCount++;
        }
    }
    if (monsterCount == 2) { multiplierIndex = 2; }
    if (monsterCount > 2 && monsterCount < 7) { multiplierIndex = 3; }
    if (monsterCount > 6 && monsterCount < 11) { multiplierIndex = 4; }
    if (monsterCount > 10 && monsterCount < 15) { multiplierIndex = 5; }
    if (monsterCount >= 15) { multiplierIndex = 6; }

    // Multiplier modified by number of player characters:
    if (characters.length < 3) {
        if (multiplierIndex < multipliers.length - 1) {
            multiplierIndex++;
        }
    } else if (characters.length > 5) {
        if (multiplierIndex > 0) {
            multiplierIndex--;
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

// See DMG p. 274-275
// These are keyed by challenge rating.
var monsterTemplates = {
    0: {
        prof: '+2',
        ac: '<= 13',
        hp: '1-6',
        attack: '<= +3',
        damage: '0-1',
        save: '<= 13',
        xp: 10
    },
    0.125: {
        prof: '+2',
        ac: '13',
        hp: '7-35',
        attack: '+3',
        damage: '2-3',
        save: '13',
        xp: 25
    },
    0.25: {
        prof: '+2',
        ac: '13',
        hp: '36-49',
        attack: '+3',
        damage: '4-5',
        save: '13',
        xp: 50
    },
    0.5: {
        prof: '+2',
        ac: '13',
        hp: '50-70',
        attack: '+3',
        damage: '6-8',
        save: '13',
        xp: 100
    },
    1: {
        prof: '+2',
        ac: '13',
        hp: '71-85',
        attack: '+3',
        damage: '9-14',
        save: '13',
        xp: 200
    },
    2: {
        prof: '+2',
        ac: '13',
        hp: '86-100',
        attack: '+3',
        damage: '15-20',
        save: '13',
        xp: 450
    },
    3: {
        prof: '+2',
        ac: '13',
        hp: '101-115',
        attack: '+4',
        damage: '21-26',
        save: '13',
        xp: 700
    },
    4: {
        prof: '+2',
        ac: '14',
        hp: '116-130',
        attack: '+5',
        damage: '27-32',
        save: '14',
        xp: 1100
    },
    5: {
        prof: '+3',
        ac: '15',
        hp: '131-145',
        attack: '+6',
        damage: '33-38',
        save: '15',
        xp: 1800
    },
    6: {
        prof: '+3',
        ac: '15',
        hp: '146-160',
        attack: '+6',
        damage: '39-44',
        save: '15',
        xp: 2300
    },
    7: {
        prof: '+3',
        ac: '15',
        hp: '161-175',
        attack: '+6',
        damage: '45-50',
        save: '15',
        xp: 2900
    },
    8: {
        prof: '+3',
        ac: '16',
        hp: '175-190',
        attack: '+7',
        damage: '51-56',
        save: '16',
        xp: 3900
    },
    9: {
        prof: '+4',
        ac: '16',
        hp: '191-205',
        attack: '+7',
        damage: '57-62',
        save: '16',
        xp: 5000
    },
    10: {
        prof: '+4',
        ac: '17',
        hp: '206-220',
        attack: '+7',
        damage: '63-68',
        save: '16',
        xp: 5900
    },
    11: {
        prof: '+4',
        ac: '17',
        hp: '221-235',
        attack: '+8',
        damage: '69-74',
        save: '17',
        xp: 7200
    },
    12: {
        prof: '+4',
        ac: '17',
        hp: '236-250',
        attack: '+8',
        damage: '75-80',
        save: '17',
        xp: 8400
    },
    13: {
        prof: '+5',
        ac: '18',
        hp: '251-265',
        attack: '+8',
        damage: '81-86',
        save: '18',
        xp: 10000
    },
    14: {
        prof: '+5',
        ac: '18',
        hp: '266-280',
        attack: '+8',
        damage: '87-92',
        save: '18',
        xp: 11500
    },
    15: {
        prof: '+5',
        ac: '18',
        hp: '281-295',
        attack: '+8',
        damage: '93-98',
        save: '18',
        xp: 13000
    },
    16: {
        prof: '+5',
        ac: '18',
        hp: '296-310',
        attack: '+9',
        damage: '99-104',
        save: '18',
        xp: 15000
    },
    17: {
        prof: '+6',
        ac: '18',
        hp: '311-325',
        attack: '+10',
        damage: '105-110',
        save: '19',
        xp: 18000
    },
    18: {
        prof: '+6',
        ac: '19',
        hp: '326-340',
        attack: '+10',
        damage: '111-116',
        save: '19',
        xp: 20000
    },
    19: {
        prof: '+6',
        ac: '19',
        hp: '341-355',
        attack: '+10',
        damage: '117-122',
        save: '19',
        xp: 22000
    },
    20: {
        prof: '+6',
        ac: '19',
        hp: '356-400',
        attack: '+10',
        damage: '123-140',
        save: '19',
        xp: 24000
    },
    21: {
        prof: '+7',
        ac: '19',
        hp: '401-445',
        attack: '+11',
        damage: '141-158',
        save: '20',
        xp: 33000
    },
    22: {
        prof: '+7',
        ac: '19',
        hp: '446-490',
        attack: '+11',
        damage: '159-176',
        save: '20',
        xp: 41000
    },
    23: {
        prof: '+7',
        ac: '19',
        hp: '491-535',
        attack: '+11',
        damage: '177-194',
        save: '20',
        xp: 50000
    },
    24: {
        prof: '+7',
        ac: '19',
        hp: '536-580',
        attack: '+12',
        damage: '195-212',
        save: '21',
        xp: 62000
    },
    25: {
        prof: '+8',
        ac: '19',
        hp: '581-625',
        attack: '+12',
        damage: '213-230',
        save: '21',
        xp: 75000
    },
    26: {
        prof: '+8',
        ac: '19',
        hp: '626-670',
        attack: '+12',
        damage: '231-248',
        save: '21',
        xp: 90000
    },
    27: {
        prof: '+8',
        ac: '19',
        hp: '671-715',
        attack: '+13',
        damage: '249-266',
        save: '22',
        xp: 105000
    },
    28: {
        prof: '+8',
        ac: '19',
        hp: '719-760',
        attack: '+13',
        damage: '267-284',
        save: '22',
        xp: 120000
    },
    29: {
        prof: '+9',
        ac: '19',
        hp: '761-805',
        attack: '+13',
        damage: '285-302',
        save: '22',
        xp: 135000
    },
    30: {
        prof: '+9',
        ac: '19',
        hp: '806-850',
        attack: '+14',
        damage: '303-320',
        save: '23',
        xp: 15500
    },
};

//////////// Player Characters ////////////

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

function formatN(n) {
    return numCommaSep(Math.floor(n));
}

function calculateXpThresholds() {
    var easyTotal = 0;
    var mediumTotal = 0;
    var hardTotal = 0;
    var deadlyTotal = 0;
    for (var i = 0, limit = characters.length; i < limit; i++) {
        easyTotal += encounterDifficultyByCharLevel[characters[i]][0];
        mediumTotal += encounterDifficultyByCharLevel[characters[i]][1];
        hardTotal += encounterDifficultyByCharLevel[characters[i]][2];
        deadlyTotal += encounterDifficultyByCharLevel[characters[i]][3];
    }
    document.getElementById('easyxp').innerHTML = formatN(easyTotal);
    document.getElementById('mediumxp').innerHTML = formatN(mediumTotal);
    document.getElementById('hardxp').innerHTML = formatN(hardTotal);
    document.getElementById('deadlyxp').innerHTML = formatN(deadlyTotal);
}

function addCharacter() {
    var l = document.getElementById('charlevel');
    var charLevel = l.options[l.selectedIndex].text;
    characters.push(charLevel);
    characters.sort(numSort);
    calculateXpThresholds();
    displayCharacterList();
    document.getElementById('encounterxp').innerHTML = formatN(getEncounterXp());
}

function clearCharacters() {
    characters = [];
    document.getElementById('characters').innerHTML = '';
    document.getElementById('easyxp').innerHTML = '';
    document.getElementById('mediumxp').innerHTML = '';
    document.getElementById('hardxp').innerHTML = '';
    document.getElementById('deadlyxp').innerHTML = '';
    document.getElementById('xpperday').innerHTML = '';
    document.getElementById('encounterxp').innerHTML = '0';
}

function displayCharacterList() {
    charStr = capitalize(intToStr(characters.length)) + ' characters, levels ';
    for (var i = 0, limit = characters.length; i < limit; i++) {
        charStr = charStr + characters[i] + ' ';
    }
    document.getElementById('characters').innerHTML = charStr;
    document.getElementById('xpperday').innerHTML = numCommaSep(getXpPerDay());
}

//////////// Monsters ////////////

var monsters = [];
// Give added monsters a unique id so we can refer to them later:
var monsterIdCount = 0;

function getEncounterXp() {
    var xp = 0;
    for (var i = 0, limit = monsters.length; i < limit; i++) {
        xp += monsters[i].xp;
    }
    return Math.floor(xp * getEncounterMultiplier());
}

function addMonster() {
    var l = document.getElementById('monstercr');
    var cr = l.options[l.selectedIndex].text;
    var m = {
        mId: 'm' + monsterIdCount,
        cr: cr,
        prof: monsterTemplates[cr].prof,
        ac: monsterTemplates[cr].ac,
        hp: monsterTemplates[cr].hp,
        attack: monsterTemplates[cr].attack,
        damage: monsterTemplates[cr].damage,
        save: monsterTemplates[cr].save,
        xp: monsterTemplates[cr].xp
    };
    monsters.push(m);
    monsterIdCount++;
    displayMonster(m);
    document.getElementById('encounterxp').innerHTML = formatN(getEncounterXp());
}

function clearAllMonsters() {
    monsters = [];
    document.getElementById('monsterlist').innerHTML = '';
    document.getElementById('encounterxp').innerHTML = '0';
}

function displayMonster(m) {
    var parentDiv = document.getElementById('monsterlist');
    var child = document.createElement('p');
    child.id = 'm' + m.mId;
    parentDiv.appendChild(child);
    var mStr = 'CR ' + m.cr + '; Prof ' + m.prof + '; AC ' + m.ac + '; HP ' + m.hp + '; Attack ' +  m.attack + '; Damage ' + m.damage + '; Save ' + m.save;
    child.innerHTML = mStr;
}
