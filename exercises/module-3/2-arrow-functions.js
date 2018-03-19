const logins = [
    { name: 'speedy', karma: 1001 },
    { name: 'deividy', karma: 900 },
    { name: 'ana', karma: 1200 },
    { name: 'foo', karma: 1 },
    { name: 'bar', karma: 2 },

];

function loginWithGreatKarma (login) {
    return login.karma > 1000;
}

function loginWithPoorKarma (login) {
    return login.karma < 10;
}

function loginNameMap (login) {
    return login.name;
}

function printPoorKarmaLoginNames () {
    const poorKarmaLogins = logins.filter(loginWithPoorKarma);

    console.log("poor karma: :(");
    console.log(poorKarmaLogins.map(loginNameMap));
}

function printGreatKarmaLoginNames () {
    const greatKarmaLogins = logins.filter(loginWithGreatKarma);

    console.log("great karma: :)");
    console.log(greatKarmaLogins.map(loginNameMap));
}

function printAllLoginNames () {
    console.log('all logins:');
    console.log(logins.map(loginNameMap));
}

printTotalKarma();
function printTotalKarma () {
    const totalKarma = logins.reduce(function (accumulator, login) {
        return accumulator + login.karma;
    }, 0);

    console.log('total karma:');
    console.log(totalKarma);
}

printAllLoginNames();
printPoorKarmaLoginNames();
printGreatKarmaLoginNames();
