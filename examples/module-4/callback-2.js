const fs = require('fs');

fs.readFile(process.argv[1], function (err, data) {
    if (err) throw new Error(err);

    console.log("I'm done.");
});
console.log("I'm just starting ;)");
