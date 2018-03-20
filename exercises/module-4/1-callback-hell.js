const fs = require('fs');
function crazyTimeouts (callback) {
    setTimeout(() => {
        console.log('ok, we waited 100ms');
        console.log('waiting more 200ms ...');

        setTimeout(() => {
            console.log('now, waiting 300ms...');

            setTimeout(() => {
                console.log("PHEW, now we'll read us :)");

                fs.readFile(process.argv[1], (err, res) => {
                    if (err) return callback(err);
                    console.log('now write us (crazy?) :)');

                    fs.writeFile(process.argv[1], res, (err) => {
                        if (err) return callback(err);
                        callback(null, res);
                    });
                });
            }, 300);
        }, 200);
    }, 100);
}

crazyTimeouts((err, res) => {
    if (err) throw new Error(err);
    console.log(res.toString());
});
