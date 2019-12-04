import { app, BrowserWindow, Menu, MenuItem, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as appMenu from './app-menu';

let win: BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  const menu = appMenu.getAppMenu();
  win.setMenu(menu);

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: 'file:',
        slashes: true
      })
    );
  }
  win.on('closed', () => {
    win = null;
  });
}

try {
  app.on('ready', createWindow);
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  throw e;
}
