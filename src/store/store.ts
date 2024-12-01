// src/store/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './features/theme/themeSlice';
import authReducer from './features/auth/authSlice';
import blogReducer from './features/blog/blogSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Reducers that need persistence
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'auth'], // Only theme and auth will be persisted
};

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    blog: blogReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
