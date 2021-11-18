import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger, { createLogger } from 'redux-logger';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promise from 'redux-promise';

// import configureStore from './configure-store';
import rootReducer from './root-reducer';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const defMiddleSetting = {
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
};

// add the root reducer to the store
const store = configureStore({
    // reducer: rootReducer,
    reducer: persistedReducer,
    // thunk is added by default
    middleware: (getDefaultMiddleware) =>
        process.env.NODE_ENV === 'production'
            ? getDefaultMiddleware(defMiddleSetting).concat(logger, promise)
            : getDefaultMiddleware(defMiddleSetting).concat(
                  createLogger(),
                  promise
              ),
});

// enable hot reloading in dev mode
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () =>
        store.replaceReducer(rootReducer)
    );
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
