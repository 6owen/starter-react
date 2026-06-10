import { create } from 'zustand'

type RouteSnapshot = {
  layout: NonNullable<AppRouteMeta['layout']>
  pathname: string
  title?: string
}

type RouteStore = {
  currentRoute: RouteSnapshot
  setCurrentRoute: (snapshot: RouteSnapshot) => void
}

export const useRouteStore = create<RouteStore>()((set) => ({
  currentRoute: {
    layout: 'default',
    pathname: '/',
    title: 'Home',
  },
  setCurrentRoute: (snapshot) => set({ currentRoute: snapshot }),
}))
