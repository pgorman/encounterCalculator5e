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
//////////////// FIX THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var n = characters.length;
    // Number of monsters:
    if (n == 1) { return 1; }
    if (n = 2) { return 1.5; }
    if (n > 2 && n < 7) { return 2; }
    if (n > 6 && n < 11) { return 2.5; }
    if (n < 15) { return 3; }
    return 4;
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
}

function clearCharacters() {
    characters = [];
    document.getElementById('characters').innerHTML = '';
    document.getElementById('easyxp').innerHTML = '';
    document.getElementById('mediumxp').innerHTML = '';
    document.getElementById('hardxp').innerHTML = '';
    document.getElementById('deadlyxp').innerHTML = '';
}

function displayCharacterList() {
    charStr = capitalize(intToStr(characters.length)) + ' characters, levels ';
    for (var i = 0, limit = characters.length; i < limit; i++) {
        charStr = charStr + characters[i] + ' ';
    }
    document.getElementById('characters').innerHTML = charStr;
}
