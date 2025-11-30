import { configureStore } from '@reduxjs/toolkit';
import personasReducer from './personasSlice';

export const store = configureStore({
  reducer: {
    personas: personasReducer,
  },
});
