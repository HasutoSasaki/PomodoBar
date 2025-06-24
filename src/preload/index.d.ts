import { ElectronAPI } from '@electron-toolkit/preload'

interface TimerAPI {
  toggleTimer: () => void
  resetTimer: () => void
  getTimerState: () => Promise<{
    timeLeft: number
    isRunning: boolean
    isBreak: boolean
  }>
  onTimerUpdate: (callback: (data: { timeLeft: number; isRunning: boolean; isBreak: boolean }) => void) => void
  onTimerFinished: (callback: (message: string) => void) => void
  removeAllListeners: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: TimerAPI
  }
}
