import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, SAVED_USER_PROFILE } from "utils/helpers/constants";
import storage from "utils/helpers/storage";
import { api } from "utils/services/apis";
import { UserProfile } from "./slice";

export interface SignInRequestPayload {
    email: string;
    password: string;
};

export interface SignUpRequestPayload extends SignInRequestPayload {
    firstName: string;
    lastName: string;
};

export const signUp = createAsyncThunk('signUp', async (requestPayload: SignUpRequestPayload, { rejectWithValue }) => {
    const response = await api.post(ENDPOINTS.SIGN_UP, requestPayload);
    if (response.ok) {
        return response.data;
    }
    else {
        return rejectWithValue(response.data)
    }
});

export const signIn = createAsyncThunk('signIn', async (requestPayload: SignInRequestPayload, { rejectWithValue }) => {
    const response = await api.post(ENDPOINTS.SIGN_IN, requestPayload);
    if (response.ok) {
        await storage.save(SAVED_USER_PROFILE, response.data as UserProfile); 
        return response.data;
    }
    else {
        return rejectWithValue(response.data)
    }
});



