import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "utils/helpers/constants";
import { api } from "utils/services/apis";

export interface GetCategoriesPayload {
    pageSize: number;
    pageNumber: number;
};

export const getCategory = createAsyncThunk('getCategory', async (requestPayload: GetCategoriesPayload, { rejectWithValue }) => {
    const response = await api.get(ENDPOINTS.GET_CATEGORIES, requestPayload);
    if (response.ok) {
        return response.data;
    }
    else {
        return rejectWithValue(response.data)
    }
});




