import request from '~/utils/request';
import { register } from '~/redux/authSlice/registerSlice';
import { login } from '~/redux/authSlice/loginSlice';
import { posts } from '~/redux/userSlice/getPostsSlice';

export const userRegister = async (data, dispatch) => {
    try {
        const res = await request({
            method: 'POST',
            url: '/register',
            data: data,
        });
        dispatch(register(res));
    } catch (err) {
        console.log(err);
    }
};

export const authLogin = async (data, dispatch) => {
    try {
        const res = await request({
            method: 'POST',
            url: '/login',
            data: data,
        });
        dispatch(login(res));
    } catch (err) {
        console.log(err);
    }
};

export const refreshToken = async () => {
    try {
        const res = await request({
            method: 'POST',
            url: '/refresh',
            withCredentials: true,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const logOut = async (dispatch, navigate, accessToken) => {
    try {
        await request({
            method: 'POST',
            url: '/logout',
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(login(null));
        dispatch(posts(null));
        navigate('/login');
    } catch (err) {
        console.log(err);
    }
};
