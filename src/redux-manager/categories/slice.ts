
import { createSlice } from '@reduxjs/toolkit';
import { CommonFetchParams, RequestError } from 'redux-manager/common-type';
import { getCategories } from './thunk';

export interface CategoryItem {
    _id: string;
    name: string;
}

// export interface Category {
//     categories: CategoryItem[];
//     totalCount: number;
// }

interface InitialStates extends CommonFetchParams {
    categories: CategoryItem[];
    totalCount: number;
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
                // console.log('getCategories.pending: ', JSON.stringify(action))
                state.isRequesting = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                // console.log('getCategories.fulfilled: ', JSON.stringify(action))
                const payload = action.payload as InitialStates;
                state.categories = payload.categories;
                state.totalCount = payload.totalCount;
                state.requestError = undefined;
                state.isRequesting = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                // console.log('getCategories.rejected: ', JSON.stringify(action))

                state.requestError = action.payload as RequestError;
                state.isRequesting = false;
            })
    },
});

export default category.reducer;
