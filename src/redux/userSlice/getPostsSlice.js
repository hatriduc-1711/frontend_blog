import { createSlice } from '@reduxjs/toolkit';

export const getPostsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: null,
    },
    reducers: {
        posts: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const { posts } = getPostsSlice.actions;
export default getPostsSlice.reducer;
