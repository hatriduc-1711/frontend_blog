import request from '~/utils/request';
import { create } from '~/redux/userSlice/createPostsSlice';
import { allPosts } from '~/redux/userSlice/getAllPostsSlice';
import { posts } from '~/redux/userSlice/getPostsSlice';

export const createPosts = async (data, dispatch, navigate, accessToken) => {
    try {
        const res = await request({
            method: 'POST',
            url: '/create-posts',
            data: data,
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(create(res));
        navigate('/');
    } catch (err) {
        console.log(err);
    }
};

export const getAllPosts = async (page, dispatch) => {
    try {
        const res = await request({
            method: 'GET',
            url: '/get-all-posts',
            params: {
                page: page,
            },
        });
        dispatch(allPosts(res));
    } catch (err) {
        console.log(err);
    }
};

export const getPosts = async (id, dispatch, navigate, accessToken) => {
    try {
        const res = await request({
            method: 'GET',
            url: '/get-posts',
            params: {
                id: id,
            },
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(posts(res));
        navigate(`/detail-posts?id=${id}`);
    } catch (err) {
        console.log(err);
    }
};

export const updateView = async (id, accessToken) => {
    try {
        await request({
            method: 'PUT',
            url: '/update-view',
            params: {
                id: id,
            },
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
