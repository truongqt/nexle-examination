
import { createSlice } from '@reduxjs/toolkit';
import { CommonFetchParams, RequestError } from '../common-type';
import { signIn, signUp } from './thunk';

export interface UserProfile {
    _id: string;
    email: string;
    admin: boolean;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    displayName: string;
    token: string;
    refreshToken: string;
}

interface InitialStates extends CommonFetchParams {
    userProfile: UserProfile;
}

const initialState: InitialStates = {
    userProfile: {} as UserProfile,
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, action) => {
                state.isRequesting = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.userProfile = action.payload as UserProfile;
                state.requestError = undefined;
                state.isRequesting = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.requestError = action.payload as RequestError;
                state.isRequesting = false;
            })

            .addCase(signUp.pending, (state, action) => {
                state.isRequesting = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.userProfile = action.payload as UserProfile;
                state.requestError = undefined;
                state.isRequesting = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.requestError = action.payload as RequestError;
                state.isRequesting = false;
            })
    },
});

export default user.reducer;
