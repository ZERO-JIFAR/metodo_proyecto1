import { create } from 'zustand';

interface IScreenState {
    activeView: 'backlog' | 'sprints';
    toggleView: () => void;
};

export const useScreenStore = create<IScreenState>((set, get) => ({
    activeView: 'backlog',
    toggleView: () =>
        set({ activeView: get().activeView === 'backlog' ? 'sprints' : 'backlog' }),
}));