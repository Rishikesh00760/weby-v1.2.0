const { app, BrowserWindow, ipcMain, Menu, MenuItem, accelerator, shell, webContents } = require('electron');
const path = require('path');
const url = require('url');
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
const { title } = require('process');
const { autoUpdater } = require('electron-updater');

setupTitlebar();

function blankEditor() {
    const win = new BrowserWindow({
        height: 900,
        width: 1300,
        frame: false,
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), './preload.js'),
            webSecurity: true,
            nodeIntegration: false
        },
        icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'Electrosoft Weby v1.2.0 (2022) Edition',
    });

    win.loadFile(__dirname + './blank-editor/grapesjs-preset-webpage/index.html');
    win.removeMenu()

    const ctxMenu = Menu.buildFromTemplate([
        {
            role: 'reload',
            accelerator: 'CmdOrCtrl + R'
        },
        {
            role: 'forceReload',
            accelerator: 'CmdOrCtrl + Shift + R'
        },
        {
            type: 'separator'
        },
        {
            role: 'undo',
            accelerator: 'CmdOrCtrl + Z'
        },
        {
            role: 'redo',
            accelerator: 'CmdOrCtrl + Y'
        },
        {
            type: 'separator'
        },
        {
            role: 'cut',
            accelerator: 'CmdOrCtrl + X'
        },
        {
            role: 'copy',
            accelerator: 'CmdOrCtrl + C'
        },
        {
            role: 'paste',
            accelerator: 'CmdOrCtrl + V'
        },
        {
            role: 'selectAll',
            accelerator: 'CmdOrCtrl + A'
        },
        {
            type: 'separator'
        },
        {
            role: 'zoomIn'
        },
        {
            role: 'zoomOut'
        },
        {
            role: 'resetZoom'
        },
        {
            type: 'separator'
        },
        {
            role: 'toggleSpellChecker'
        },
        {
            role: 'togglefullscreen'
        },
        {
            role: 'toggleDevTools'
        }
    ]);

    win.webContents.on('context-menu', function(e, params) {
        ctxMenu.popup(win, params.x, params.y);
    });

    attachTitlebarToWindow(win);

    const isMac = process.platform === 'darwin'
    
    const template = [
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
	   {
                    label: 'New window',
                    accelerator: 'CmdOrCtrl + N',
                    click: async () => {
                        blankEditor();
                    }
                },
                {
                    label: 'Open in browser',
                    accelerator: 'CmdOrCtrl + Shift + O',
                    click: async () => {
                        await shell.openExternal(__dirname + './blank-editor/grapesjs-preset-webpage/index.html');
                    }
                }
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startspeaking' },
                            { role: 'stopspeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Electron JS',
                    click: async () => {
                        await shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ]
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    
}

function mainWindow() {
    const mainWin = new BrowserWindow({
        width: 1000,
        height: 900,
        icon: __dirname + './assets/img/icon.png',
        title: 'Weby v1.2.0',
        frame: false,
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), './preload.js'),
            webSecurity: true,
            nodeIntegration: false
        }
    });

    mainWin.loadFile(__dirname + './index.html')

    const isMac = process.platform === 'darwin'

    const ctxMenu = Menu.buildFromTemplate([
        {
            role: 'reload',
            accelerator: 'CmdOrCtrl + R'
        },
        {
            role: 'forceReload',
            accelerator: 'CmdOrCtrl + Shift + R'
        },
        {
            type: 'separator'
        },
        {
            role: 'undo',
            accelerator: 'CmdOrCtrl + Z'
        },
        {
            role: 'redo',
            accelerator: 'CmdOrCtrl + Y'
        },
        {
            type: 'separator'
        },
        {
            role: 'cut',
            accelerator: 'CmdOrCtrl + X'
        },
        {
            role: 'copy',
            accelerator: 'CmdOrCtrl + C'
        },
        {
            role: 'paste',
            accelerator: 'CmdOrCtrl + V'
        },
        {
            role: 'selectAll',
            accelerator: 'CmdOrCtrl + A'
        },
        {
            type: 'separator'
        },
        {
            role: 'zoomIn'
        },
        {
            role: 'zoomOut'
        },
        {
            role: 'resetZoom'
        },
        {
            type: 'separator'
        },
        {
            role: 'toggleSpellChecker'
        },
        {
            role: 'togglefullscreen'
        },
        {
            role: 'toggleDevTools'
        }
    ]);

    mainWin.webContents.on('context-menu', function(e, params) {
        ctxMenu.popup(mainWin, params.x, params.y);
    });

    const mainTemplate = [
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open editor in browser',
                    accelerator: 'CmdOrCtrl + Shift + O',
                    click: function (){
                        shell.openExternal(__dirname + './blank-editor/grapesjs-preset-webpage/index.html');
                    }
                },
                {
                    label: 'Create a website',
                    click: function (){
                        blankEditor();
                    }
                }
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startspeaking' },
                            { role: 'stopspeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Electron JS',
                    click: function (){
                        shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ]

    mainWin.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
    
    const mainMenu = Menu.buildFromTemplate(mainTemplate);
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on('appVersion', (event) => {
        event.sender.send('appVersion', { version: app.getVersion() });
      });
      
      autoUpdater.on('update-available', () => {
        mainWin.webContents.send('update_available');
      });
      
      autoUpdater.on('update-downloaded', () => {
        mainWin.webContents.send('update_downloaded');
      });
      
      ipcMain.on('restart_app', () => {
        autoUpdater.quitAndInstall();
      });
}

app.on('ready', () => {
  mainWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
