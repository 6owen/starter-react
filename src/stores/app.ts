import { create } from 'zustand'

type AppStore = {
  appDescription: string
  appName: string
  demoCount: number
  incrementDemoCount: () => void
  resetDemoCount: () => void
  setAppName: (name: string) => void
}

export const useAppStore = create<AppStore>()((set) => ({
  appDescription:
    'A pragmatic React starter migrated onto TanStack Start, Router, and Query.',
  appName: 'Starter React',
  demoCount: 1,
  incrementDemoCount: () =>
    set((state) => ({ demoCount: state.demoCount + 1 })),
  resetDemoCount: () => set({ demoCount: 0 }),
  setAppName: (name) => set({ appName: name }),
}))
