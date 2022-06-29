import { createAction } from '@reduxjs/toolkit';

export const changeTab = createAction<string>('tabs/changeTab');
