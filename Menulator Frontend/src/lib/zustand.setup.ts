import { create } from "zustand"

// MENU STORE TYPES AND STORE SETUP
type MealType = {
  breakfast: string
  lunch: string
  dinner: string
}

type MenuType = {
  [key: string]: MealType
}

interface MenuStore {
  menu: MenuType
  updateMenu: (menu: MenuType) => void
}

export const useMenuStore = create<MenuStore>((set) => ({
  menu: {
    sunday: {
      breakfast: "Sunday Breakfast",
      lunch: "Sunday Lunch",
      dinner: "Sunday Dinner",
    },
    monday: {
      breakfast: "Monday Breakfast",
      lunch: "Monday Lunch",
      dinner: "Monday Dinner",
    },
    tuesday: {
      breakfast: "Tuesday Breakfast",
      lunch: "Tuesday Lunch",
      dinner: "Tuesday Dinner",
    },
    wednesday: {
      breakfast: "wednesday Breakfast",
      lunch: "wednesday Lunch",
      dinner: "wednesday Dinner",
    },
    thursday: {
      breakfast: "Thursday Breakfast",
      lunch: "Thursday Lunch",
      dinner: "Thursday Dinner",
    },
    friday: {
      breakfast: "Friday Breakfast",
      lunch: "Friday Lunch",
      dinner: "Friday Dinner",
    },
    saturday: {
      breakfast: "Saturday Breakfast",
      lunch: "Saturday Lunch",
      dinner: "Saturday Dinner",
    },
  },
  updateMenu: (newMenu) => set({ menu: newMenu }),
}))

//  UI Store
type UIStore = {
  showSidebar: boolean
  showAboutDialog: boolean
  showDonateDialog: boolean
  showNewMenuDialog: boolean
  setShowSidebar: () => void
  setShowAboutDialog: () => void
  setShowDonateDialog: () => void
  setShowNewMenuDialog: () => void
}
export const UIStore = create<UIStore>()((set) => ({
  showSidebar: true,
  showAboutDialog: false,
  showDonateDialog: false,
  showNewMenuDialog: false,
  setShowSidebar: () =>
    set((state) => ({ ...state, showSidebar: !state.showSidebar })),
  setShowAboutDialog: () =>
    set((state) => ({ ...state, showAboutDialog: !state.showAboutDialog })),
  setShowDonateDialog: () =>
    set((state) => ({ ...state, showDonateDialog: !state.showDonateDialog })),
  setShowNewMenuDialog: () =>
    set((state) => ({ ...state, showNewMenuDialog: !state.showNewMenuDialog })),
}))

// USER STORE
export type User = {
  loggedIn: boolean
  id: string
  name: string
  email: string
  avatar: string
}

type UserStoreType = User & {
  setUser: ({id, name, email, avatar}: User) => void
}

export const UserStore = create<UserStoreType>()((set) => ({
  loggedIn: true,
  id: "exampleId",
  name: "Example Name",
  email: "example@test.com",
  avatar: "",
  setUser: ({ id, name, email, avatar, loggedIn }) =>
    set((state) => ({ ...state, id, name, email, avatar, loggedIn })),
}))
