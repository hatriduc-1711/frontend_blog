import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import { useSelector, useDispatch } from 'react-redux';

// import { refreshToken } from '~/services/authServices';
// import { loginSelector } from '~/redux/selectors';
// import { login } from '~/redux/authSlice/loginSlice';

const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// request.interceptors.request.use(
//     async (config) => {
//         const loginResponse = useSelector(loginSelector);
//         const dispatch = useDispatch();
//         let date = new Date();
//         const decodeToken = jwt_decode(loginResponse?.accessToken);

//         if (decodeToken.exp < date.getTime() / 1000) {
//             const data = await refreshToken();
//             const refreshLogin = {
//                 ...loginResponse,
//                 accessToken: data.accessToken,
//             };
//             dispatch(login(refreshLogin));
//             config.headers['token'] = 'Bearer' + data.accessToken;
//         }

//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

request.interceptors.response.use((response) => response.data);

export default request;
