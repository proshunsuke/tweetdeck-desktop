'use strict';
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const config = require('./config');

const app = electron.app;
const windowStateKeeper = require('electron-window-state');

require('electron-debug')();
require('electron-dl')();
require('electron-context-menu')();

let mainWindow;
let isQuitting = false;
let win;

function createMainWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });
  const win = new electron.BrowserWindow({
    title: app.getName(),
    show: false,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    icon: process.platform === 'linux' && path.join(__dirname, 'static', 'Icon.png'),
    minWidth: 400,
    minHeight: 200,
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'browser.js'),
      plugins: true
    }
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  win.loadURL('https://twitter.com/login?hide_message=true&redirect_after_login=https%3A%2F%2Ftweetdeck.twitter.com%2F%3Fvia_twitter_login%3Dtrue');
  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        app.quit();
      }
    }
  });

  mainWindowState.manage(win);

  return win;
}

app.on('ready', () => {
  mainWindow = createMainWindow();
  const page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
    mainWindow.show();
  });

  page.setWindowOpenHandler(({url}) => {
    electron.shell.openExternal(url);
    return { action: 'deny' }
  });

  mainWindow.webContents.session.on('will-download', (event, item) => {
    const totalBytes = item.getTotalBytes();

    item.on('updated', () => {
      mainWindow.setProgressBar(item.getReceivedBytes() / totalBytes);
    });

    item.on('done', (e, state) => {
      mainWindow.setProgressBar(-1);

      if (state === 'interrupted') {
        electron.Dialog.showErrorBox('Download error', 'The download was interrupted');
      }
    });
  });

  electron.Menu.setApplicationMenu(null);
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  isQuitting = true;
});
