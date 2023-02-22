import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        message: null,
    },
    reducers: {
        register: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { register } = registerSlice.actions;
export default registerSlice.reducer;
