
import { createSlice } from '@reduxjs/toolkit';
import { CommonFetchParams, RequestError } from 'redux-manager/common-type';
import { getCategory } from './thunk';

export interface CategoryItem {
    _id: string;
    name: string;
}

export interface Category {
    categories: CategoryItem[];
    totalCount: number;
}

interface InitialStates extends CommonFetchParams {
    category: Category;
}

const initialState: InitialStates = {
    category: {} as Category,
};

const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state, action) => {
                console.log('getCategory.pending: ', JSON.stringify(action))
                state.isRequesting = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                console.log('getCategory.fulfilled: ', JSON.stringify(action))

                state.category = action.payload as Category;
                state.requestError = undefined;
                state.isRequesting = false;
            })
            .addCase(getCategory.rejected, (state, action) => {
                console.log('getCategory.rejected: ', JSON.stringify(action))

                state.requestError = action.payload as RequestError;
                state.isRequesting = false;
            })
    },
});

export default categories.reducer;
