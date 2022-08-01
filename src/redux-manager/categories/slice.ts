
import { createSlice } from '@reduxjs/toolkit';
import { CommonFetchParams, RequestError } from 'redux-manager/common-type';
import { getCategories } from './thunk';

export interface CategoryItem {
    _id: string;
    name: string;
}

export interface Category {
    categories: CategoryItem[];
    totalCount: number;
}

interface InitialStates extends Category, CommonFetchParams {
}

const initialState: InitialStates = {
    categories: [],
    totalCount: 0,
};

const category = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.isRequesting = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                const { isLoadMore } = action.meta.arg;
                const payload = action.payload as Category;
                if (!isLoadMore) {
                    state.categories = payload.categories;
                    state.totalCount = payload.totalCount;
                }
                else {
                    state.categories = [...state.categories, ...payload.categories];
                }

                state.requestError = undefined;
                state.isRequesting = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.requestError = action.payload as RequestError;
                state.isRequesting = false;
            })
    },
});

export default category.reducer;
