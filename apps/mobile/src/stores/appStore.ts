import { create } from 'zustand';

interface AppState {
  // Add your global state here
  isConnected: boolean;
  setConnected: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isConnected: false,
  setConnected: (value) => set({ isConnected: value }),
}));
