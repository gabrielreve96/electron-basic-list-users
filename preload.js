const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {



  user: async (email) => {
    try {
      return await ipcRenderer.invoke('user', email);
    } catch (error) {
      console.error("Error al comunicarse con ipcMain:", error);
      return { error: "Error interno" };
    }
  },

  toggle: async () => ipcRenderer.invoke('darkmode:toggle'), // Alternar tema
  system: () => ipcRenderer.invoke('darkmode:system'),
});
