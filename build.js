const fs = require('fs');
const path = require('path');

const testFolder = './src/articles';
const getDirectories = (source, callback) =>
    fs.readdir(source, { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err);
        } else {
            callback(
                files
                    .filter((dirent) => dirent.isDirectory())
                    .map((dirent) => dirent.name),
            );
        }
    });
getDirectories(testFolder, (data) => {
    console.log(data);
    fs.mkdirSync('./docs/articles');
    data.forEach((i) => {
        fs.copyFileSync('./docs/index.html', `./docs/articles/${i}.html`);
    });
});
