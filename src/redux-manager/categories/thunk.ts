import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonFetchParams } from "redux-manager/common-type";
import { ENDPOINTS } from "utils/helpers/constants";
import { api } from "utils/services/apis";

export interface GetCategoriesPayload extends CommonFetchParams {
    pageSize: number;
    pageNumber: number;
};

export const getCategories = createAsyncThunk('getCategories', async (requestPayload: GetCategoriesPayload, { rejectWithValue }) => {
    const { pageSize, pageNumber } = requestPayload;
    const response = await api.get(ENDPOINTS.GET_CATEGORIES, {
        pageSize,
        pageNumber
    });
    if (response.ok) {
        return response.data;
    }
    else {
        return rejectWithValue(response.data)
    }
});




