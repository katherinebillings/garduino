var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    height: 750,
    resizable: true,
    title: 'j5/electron template',
    width: 1080,
	frame: false
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});