const path = require('path');
const fs = require('fs');
const request = require("request");
const Store = require('electron-store');
const store = new Store();

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {

        let tempDir;
        if(store.get('download_folder')) {
            tempDir = store.get('download_folder')
        } else{
            let pathDir = __dirname.split('/');
            tempDir = path.join('/' + pathDir[1] + '/' + pathDir[2], 'Desktop');
        }

        const tempFileName = `temp${Date.now()}.jpg`;
        // const tempFilePath = path.join(tempDir, tempFileName);
        const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
        const getImageFile = request.get(filePath);
    
        getImageFile.pipe(writeFileTo);
        getImageFile.on("error", reject);
        getImageFile.on("complete", resolve);
    })
}
