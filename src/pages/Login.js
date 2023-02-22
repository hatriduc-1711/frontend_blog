import FormLogin from '~/components/FormLogin';
import { authLogin } from '~/services/authServices';
import { loginSelector } from '~/redux/selectors';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function Login() {
    const [value, setValue] = useState({});
    const messageSelector = useSelector(loginSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value.email && value.password) authLogin(value, dispatch);
    }, [value, dispatch]);

    document.title = 'Blog | Login';
    return <FormLogin setValue={setValue} messageSelector={messageSelector} path="/" />;
}

export default Login;
