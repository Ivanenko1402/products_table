import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import imagesReducer from '../features/images';
import countReducer from '../features/count';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    images: imagesReducer,
    count: countReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
