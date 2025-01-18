const { app, BrowserWindow, ipcMain } = require('electron');
const { nativeTheme } = require('electron/main');
const path =require("path")
let win;


const createWindow = () => {
  win = new BrowserWindow({
    width: 800, 
    height: 600, 
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, 
      contextIsolation: true, 
       
    },
  });

  win.loadFile("index.html"); 
};


app.whenReady().then(() => {
  createWindow();
   ipcMain.handle('ping' , ()=> 'pong')
   

ipcMain.handle('darkmode:toggle', () => {
  const isDarkMode = nativeTheme.shouldUseDarkColors;
  nativeTheme.themeSource = isDarkMode ? 'light' : 'dark';
  return !isDarkMode; 
});


ipcMain.handle('darkmode:system', () => {
  nativeTheme.themeSource = 'system';
});


   ipcMain.handle('user', (event, email) => {
    const usuarios = [
      { email: "gabrielreve96@gmail.com", puesto: "ingeniero" },
      { email: "antonio@gmail.com", puesto: "contable" },
    ];
  
    if (!email || email.trim() === "") {
      return { error: "El email está vacío" };
    }
  
    const perfil_usuario = usuarios.find((userinfo) => userinfo.email === email);
  
    if (!perfil_usuario) {
      return { error: "Usuario no encontrado" };
    }
  
    return perfil_usuario;
  });
  // Abre una nueva ventana si no hay ninguna activa en macOS
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Cierra la aplicación completamente cuando todas las ventanas estén cerradas
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
