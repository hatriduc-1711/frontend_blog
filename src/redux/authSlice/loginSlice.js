import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        message: null,
    },
    reducers: {
        login: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
