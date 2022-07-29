import { combineReducers } from "redux";
import user from "./user/slice";

const appReducer = combineReducers({
    user,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;