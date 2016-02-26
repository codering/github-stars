const app = require('electron').app;
const BrowserWindow = require('browser-window');
const join = require('path').join;

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 690,
    show: false,
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
  win.show();
});
