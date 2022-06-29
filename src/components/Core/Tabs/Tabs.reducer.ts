import { createSlice } from '@reduxjs/toolkit';

export interface TabsState {
  [key: string]: string;
}

export const initialState: TabsState = {};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTab(state, { payload: { tab, rootTab } }) {
      state = {
        ...state,
        [rootTab]: tab,
      };
      return state;
    },
  },
});

export const { changeTab } = tabsSlice.actions;

export default tabsSlice.reducer;
