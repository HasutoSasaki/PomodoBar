import { app, ipcMain, Tray, Menu, nativeImage, Notification } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

let tray: Tray | null = null

// ポモドーロタイマーの状態
let isRunning = false
let isBreak = false
let timeLeft = 25 * 60 // 25分（秒）
let timer: NodeJS.Timeout | null = null


function createTray(): void {
  // 透明な小さなアイコンを作成（タイトルのみを表示するため）
  const emptyIcon = nativeImage.createEmpty()
  tray = new Tray(emptyIcon)

  updateTrayTitle()


  updateTrayMenu()
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function updateTrayTitle(): void {
  if (tray) {
    const timeStr = formatTime(timeLeft)
    const mode = isBreak ? '☕' : '🍅'
    tray.setTitle(`${mode} ${timeStr}`)
  }
}

function updateTrayMenu(): void {
  if (tray) {
    // コンテキストメニューを更新
    const contextMenu = Menu.buildFromTemplate([
      {
        label: isRunning ? 'Pause' : 'Start',
        click: () => toggleTimer()
      },
      {
        label: 'Reset',
        click: () => resetTimer()
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          app.quit()
        }
      }
    ])

    tray.setContextMenu(contextMenu)
  }
}

function toggleTimer(): void {
  isRunning = !isRunning

  if (isRunning) {
    timer = setInterval(() => {
      timeLeft--
      updateTrayTitle()


      if (timeLeft <= 0) {
        // タイマー終了
        isRunning = false
        if (timer) {
          clearInterval(timer)
          timer = null
        }

        // 作業時間と休憩時間を切り替え
        if (isBreak) {
          // 休憩終了 -> 作業開始
          isBreak = false
          timeLeft = 25 * 60 // 25分
        } else {
          // 作業終了 -> 休憩開始
          isBreak = true
          timeLeft = 5 * 60 // 5分
        }

        updateTrayTitle()

        // OSのシステム通知を表示
        const notificationTitle = isBreak ? 'Break time!' : 'Work time!'
        const notificationBody = isBreak ? 'Time for a 5-minute break! ☕' : 'Time to get back to work! 🍅'

        new Notification({
          title: notificationTitle,
          body: notificationBody,
          silent: false,
          sound: 'default'
        }).show()

      }
    }, 1000)
  } else {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  updateTrayTitle()
  updateTrayMenu() // コンテキストメニューを更新


}

function resetTimer(): void {
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  isRunning = false
  isBreak = false
  timeLeft = 25 * 60

  updateTrayTitle()
  updateTrayMenu() // コンテキストメニューを更新
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC handlers
  ipcMain.on('toggle-timer', () => toggleTimer())
  ipcMain.on('reset-timer', () => resetTimer())
  ipcMain.handle('get-timer-state', () => ({
    timeLeft,
    isRunning,
    isBreak
  }))

  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// macOSでDockを隠す
if (process.platform === 'darwin' && app.dock) {
  app.dock.hide()
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
