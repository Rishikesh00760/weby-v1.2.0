const CAWB = document.getElementById('cawb');
const CAWBN = document.getElementById('cawbn');
const home = document.getElementById('home');
const templates = document.getElementById('templates');
const help = document.getElementById('help');
const settings = document.getElementById('settings');
const homeBtn = document.getElementById('homeBtn');
const templateBtn = document.getElementById('templateBtn');
const helpBtn = document.getElementById('helpBtn');
const settingBtn = document.getElementById('settingBtn');
const TAB_TITLE = document.getElementById('tab-title');
const paneContent = document.getElementById('content');
const confirmYesBtn = document.getElementById('yes');
const confirmCloseBtn = document.getElementById('close');
const canbn = document.getElementById('canbn');
const newsletterYes = document.getElementById('newsletter-yes');
const newsletterNo = document.getElementById('newsletter-close');
const CANB = document.getElementById('CANB');

homeBtn.addEventListener('click', function (){
    TAB_TITLE.innerHTML = 'Electrosoft Weby v1.2.0';
    home.style.display = 'block';
    templates.style.display = 'none';
    help.style.display = 'none';
    settings.style.display = 'none';
});

templateBtn.addEventListener('click', function (){
    TAB_TITLE.innerHTML = 'Templates';
    home.style.display = 'none';
    templates.style.display = 'block';
    help.style.display = 'none';
    settings.style.display = 'none';
});

helpBtn.addEventListener('click', function (){
    TAB_TITLE.innerHTML = 'Extensions';
    home.style.display = 'none';
    templates.style.display = 'none';
    help.style.display = 'block';
    settings.style.display = 'none';
});

settingBtn.addEventListener('click', function (){
    TAB_TITLE.innerHTML = 'Divided editor';
    home.style.display = 'none';
    templates.style.display = 'none';
    help.style.display = 'none';
    settings.style.display = 'block';
});

CAWB.addEventListener('click', function (){
  CAWBN.style.display = 'block';
});

confirmYesBtn.addEventListener('click', function (){
  window.location.href = './blank-editor/grapesjs-preset-webpage/index.html';
});

confirmCloseBtn.addEventListener('click', function (){
  CAWBN.style.display = 'none';
});

CANB.addEventListener('click', function (){
  canbn.style.display = 'block';
});

newsletterYes.addEventListener('click', function (){
  window.location.href = './index.html';
});

newsletterNo.addEventListener('click', function (){
  canbn.style.display = 'none';
});

const { ipcRenderer } = require('electron');
const version = document.getElementById('version');
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

ipcRenderer.send('appVersion');
ipcRenderer.on('appVersion', (event, arg) => {
  ipcRenderer.removeAllListeners('appVersion');
  version.innerHTML = 'Version: ' + arg.version;
});

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerHTML = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerHTML = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('restart_app');
}

/* const cursorStatus = document.getElementById('cursor-status');
function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coor = "X: " + x + ", Y: " + y;
  cursorStatus.innerHTML = coor;
}

function clearCoor() {
  cursorStatus.innerHTML = "";
}

document.onmousemove = showCoords();
document.onmouseout = clearCoor(); */

function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coor = `Cursor position: X(${x}), Y(${y})`;
  document.getElementById("cursor-status").innerHTML = coor;
}

function clearCoor() {
  document.getElementById("cursor-status").innerHTML = "";
}
