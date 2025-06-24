import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  toggleTimer: () => ipcRenderer.send('toggle-timer'),
  resetTimer: () => ipcRenderer.send('reset-timer'),
  getTimerState: () => ipcRenderer.invoke('get-timer-state'),
  onTimerUpdate: (callback: (data: any) => void) => {
    ipcRenderer.on('timer-update', (_event, data) => callback(data))
  },
  onTimerFinished: (callback: (message: string) => void) => {
    ipcRenderer.on('timer-finished', (_event, message) => callback(message))
  },
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('timer-update')
    ipcRenderer.removeAllListeners('timer-finished')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
