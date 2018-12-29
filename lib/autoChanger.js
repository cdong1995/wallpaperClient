const finder = require('fs-finder')
const path = require('path')
const later = require('later')
const { spawn } = require("child_process")
const Store = require('electron-store');
const store = new Store();

let tempDir;


function changer() {

    if(store.get('autoChanger_folder')) {
        tempDir = store.get('autoChanger_folder')
    } else{
        let pathDir = __dirname.split('/');
        tempDir = path.join('/' + pathDir[1] + '/' + pathDir[2], 'Desktop');
    }

    let files = finder.in(tempDir).findFiles("*.<(jpg|jpeg|png|JPG)>");

    return new Promise((resolve, reject) => {
        var tempFilePath;
        tempFilePath = getRandom(files);
        console.log(tempFilePath);
        const script = spawn("osascript", [
            "-e",
            `tell application "Finder" to set desktop picture to POSIX file "${tempFilePath}"`
          ]);
        script.on("close", resolve);
        script.on("close", reject);
    })
}

function getRandom(obj) {
    // checking if object is array ... if so, return random objec from the array
    if (typeof (obj) == 'number') {
        var max = parseInt(obj), min = 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    if (typeof (obj) == 'object' && obj instanceof Array) {
        return obj[Math.floor(Math.random() * obj.length)]
    }

    throw new Error('unknonw type');
}

module.exports = (text) => {
    changer()

    // if(text === "stop"){
    //     return null
    // } else{
    //     let s = later.parse.text(text);
    //     later.date.localTime();
    //     var timer;
    //     timer = later.setInterval(changer, s)
    // }
};
