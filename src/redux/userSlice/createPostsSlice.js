import { createSlice } from '@reduxjs/toolkit';

export const createPostsSlice = createSlice({
    name: 'createPosts',
    initialState: {
        message: null,
    },
    reducers: {
        create: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { create } = createPostsSlice.actions;
export default createPostsSlice.reducer;
