const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const path = require('path');
const fs = require('fs');
const request = require("request");
const AutoChanger = require('../lib/autoChanger.js');
const Download = require('../lib/download_collection');
const { spawn } = require("child_process");
const Store = require('electron-store');
const store = new Store();
const later = require('later');

let mainWindow;
var timer;
function createWindow() {
    mainWindow = new BrowserWindow({width: 1280, height: 720, webPreferences: { webSecurity: false}});

    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.on('closed', () => mainWindow = null);

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
}

const mainMenuTemplate =  [
    {
        label: 'File',
        submenu:[
            {
                label: "Dev",
                submenu:[
                    {
                        label: 'Toggle DevTools',
                        accelerator:process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                        click(item, focusedWindow){
                            focusedWindow.toggleDevTools();
                        }
                    },
                ]

            },
            {
                label: 'Quit',
                accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('download-image', (event, filePath) => {
    return new Promise((resolve, reject) => {
        var tempDir;
        if(store.get('download_folder')) {
            tempDir = store.get('autoChanger_folder')
        } else{
            let pathDir = __dirname.split('/');
            tempDir = path.join('/' + pathDir[1] + '/' + pathDir[2], 'Desktop');
        }

        const tempFileName = `temp${Date.now()}.jpg`;
        const tempFilePath = path.join(tempDir, tempFileName);
        const writeFileTo = fs.createWriteStream(path.join(tempDir, tempFileName));
        const getImageFile = request.get(filePath);
  
        getImageFile.pipe(writeFileTo);
        getImageFile.on("error", reject);
        getImageFile.on("complete", () => {
        // Image has been saved to tempFilePath
        // Change desktop background using applescript
        const script = spawn("osascript", [
          "-e",
           `tell application "Finder" to set desktop picture to POSIX file "${tempFilePath}"`
        ]);
        script.on("close", resolve);
      });
    })
  });

ipcMain.on('change_period', (event,fre,msr) =>{
    let s = later.parse.text("every "+fre+" "+msr);
    later.date.localTime();
    timer = later.setInterval(AutoChanger, s)
});

ipcMain.on('stop_autochanger', (event) =>{
    timer.clear();
});

ipcMain.on('download_all', (event, urls) =>{
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index]);
        }
      }
    asyncForEach(urls, async (url) => {
        await Download(url);
    })
});

ipcMain.on('set_folder', (event, type) => {
    const {dialog} = require('electron');
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (fileNames) {
       
       // fileNames is an array that contains all the selected 
       if(fileNames === undefined) { 
          console.log("No file selected"); 
       } else { 
          console.log(fileNames[0]);
          if(type === "download") {
            store.set('download_folder', fileNames[0]);
          } else {
            store.set('autoChanger_folder', fileNames[0]);
          }
       } 
    });

})