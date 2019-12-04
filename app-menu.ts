import { Menu, MenuItem, Tray } from 'electron';

const isMac = process.platform === 'darwin';

export function getAppMenu() {
  const menu = new Menu();
  menu.append(new MenuItem({ role: 'viewMenu' }));
  menu.append(
    new MenuItem({
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: isMac ? 'close' : 'quit' }]
    })
  );
  menu.append(
    new MenuItem({
      role: 'help',
      submenu: [
        {
          label: 'About',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/chingalo');
          }
        }
      ]
    })
  );
  return menu;
}
