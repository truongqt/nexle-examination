import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonFetchParams } from "redux-manager/common-type";
import { ENDPOINTS } from "utils/helpers/constants";
import { api } from "utils/services/apis";

export interface GetCategoriesPayload extends CommonFetchParams {
    pageSize: number;
    pageNumber: number;
};

export const getCategories = createAsyncThunk('getCategories', async (requestPayload: GetCategoriesPayload, { rejectWithValue, signal, requestId, extra, getState }) => {
    const { pageSize, pageNumber } = requestPayload;
    const response = await api.get(ENDPOINTS.GET_CATEGORIES, {
        pageSize,
        pageNumber
    });
    if (response.ok) {
        // const xx = getState();
        // console.log('signal: ', JSON.stringify(signal))
        // console.log('requestId: ', JSON.stringify(requestId))
        // console.log('xx: ', JSON.stringify(xx))
        // console.log('extra: ', JSON.stringify(extra))
        return response.data;
    }
    else {
        return rejectWithValue(response.data)
    }
});




