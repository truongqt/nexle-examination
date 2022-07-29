import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../utils/helpers/constants";
import { api } from "../../utils/services/apis";

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
        return response.data;
    }
    else {
        return rejectWithValue(response.data)
    }
});



