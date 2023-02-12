const fs = require('fs');

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
    data.forEach((i) => {
        fs.copyFileSync('./docs/index.html', `./docs/${i}.html`);
    });
});
