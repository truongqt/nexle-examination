
import { createSlice } from '@reduxjs/toolkit';

interface InitialStates {
    showRequestStatus: boolean;
}

const initialState: InitialStates = {
    showRequestStatus: false,
};

const ui = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setShowRequestStatus(state, {payload}: {payload: boolean}) {
            state.showRequestStatus = payload;
        }
    },
});

export const {setShowRequestStatus} = ui.actions;

export default ui.reducer;
