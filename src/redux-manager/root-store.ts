import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import env from 'react-native-config';
import rootReducer, { RootState } from './root-reducer';

let middleware = getDefaultMiddleware(
    env.STAGE === 'develop'
        ? {
            thunk: true,
            immutableCheck: !!env.IMMUTABLE_CHECK,
            serializableCheck: !!env.SERIALIZABLE_CHECK,
        }
        : undefined,
);

if (__DEV__) {
    const createFlipperMiddleware = require('redux-flipper').default;
    // @ts-ignore
    middleware = middleware.concat(createFlipperMiddleware());
}

const rootStore = configureStore({
    reducer: rootReducer,
    middleware,
});

export type AppDispatch = typeof rootStore.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default rootStore;
