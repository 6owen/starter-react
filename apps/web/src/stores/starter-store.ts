import { create } from 'zustand'

export const stackKeys = ['react', 'zustand', 'shadcn', 'iconify'] as const

export type StackKey = (typeof stackKeys)[number]

type StarterStore = {
  count: number
  spotlight: StackKey
  decrement: () => void
  increment: () => void
  reset: () => void
  setSpotlight: (spotlight: StackKey) => void
}

export const useStarterStore = create<StarterStore>()((set) => ({
  count: 1,
  spotlight: 'react',
  decrement: () => set((state) => ({ count: state.count - 1 })),
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
  setSpotlight: (spotlight) => set({ spotlight }),
}))
