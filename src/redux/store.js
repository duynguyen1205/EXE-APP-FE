import { configureStore } from '@reduxjs/toolkit';

import accountReducer from '../redux/account/accountSilce';

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
