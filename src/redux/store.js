import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerReducer from '~/redux/authSlice/registerSlice';
import loginReducer from '~/redux/authSlice/loginSlice';
import createPostsReducer from '~/redux/userSlice/createPostsSlice';
import getAllPostsReducer from '~/redux/userSlice/getAllPostsSlice';
import getPostsReducer from '~/redux/userSlice/getPostsSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    createPosts: createPostsReducer,
    allPosts: getAllPostsReducer,
    posts: getPostsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer: {
    //     register: registerReducer,
    //     login: loginReducer,
    //     createPosts: createPostsReducer,
    //     allPosts: getAllPostsReducer,
    //     posts: getPostsReducer,
    // },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
