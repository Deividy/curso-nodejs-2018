const fs = require('fs');

function reandAndProcessFiles (callback) {
    fs.readFile('file1.txt', function (err, data) {
        if (err) return callback(err);

        const contentFile1 = data.toString();
        fs.readFile('file2.txt', function (err, data) {
            if (err) return callback(err);

            const contentFile2 = data.toString();
            fs.readFile('file3.txt', function (err, data) {
                if (err) return callback(err);

                const contentFile3 = data.toString();
                const allContent = contentFile1 + contentFile2 + contentFile3;

                fs.writeFile('all-files-together.txt', allContent, function (err) {
                    if (err) return callback(err);
                    callback(null, allContent);
                });
            });
        });
    });
}

reandAndProcessFiles(function (err, allContent) {
    if (err) throw new Error(err);
    console.log(allContent);
});
