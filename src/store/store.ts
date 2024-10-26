// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';  // Your login slice
import favoritesReducer from './favouriteSlice'; // Import the new slice

export function makeStore() {
  return configureStore({
    reducer: {
      login: loginReducer,  // Add your reducers here
      favorites: favoritesReducer, // Add the new slice here

    },
  });
}

const store = makeStore();  // Default store

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
