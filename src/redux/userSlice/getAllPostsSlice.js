import { createSlice } from '@reduxjs/toolkit';

export const getAllPostsSlice = createSlice({
    name: 'allPosts',
    initialState: {
        response: null,
    },
    reducers: {
        allPosts: (state, action) => {
            state.response = action.payload;
        },
    },
});

export const { allPosts } = getAllPostsSlice.actions;
export default getAllPostsSlice.reducer;
