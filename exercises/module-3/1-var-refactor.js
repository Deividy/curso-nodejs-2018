var assert = require('assert');

function genPage (pageName) {
    var page = pageName;
    var visits = 0;

    return {
        addVisit: function () {
            return visits++;
        },

        getPage: function () {
            return page;
        },

        getVisits: function () {
            return visits;
        }
    }
}

var homePage = genPage('home');
var aboutPage = genPage('about');

aboutPage.addVisit();
aboutPage.addVisit();
homePage.addVisit();

assert.equal(homePage.getPage(), 'home');
assert.equal(aboutPage.getPage(), 'about');

assert.equal(homePage.getVisits(), 1);
assert.equal(aboutPage.getVisits(), 2);

console.log(homePage.getPage());
console.log(`visits: ${homePage.getVisits()}`);

console.log(aboutPage.getPage());
console.log(`visits: ${aboutPage.getVisits()}`);

for (var countVists = 1; countVists <= aboutPage.getVisits(); ++countVists) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 100);
    })(countVists);
}
