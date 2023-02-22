import FormLogin from '~/components/FormLogin';
import { userRegister } from '~/services/authServices';
import { registerSelector } from '~/redux/selectors';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
    const [value, setValue] = useState({});
    const messageSelector = useSelector(registerSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value.email && value.password) userRegister(value, dispatch);
    }, [value, dispatch]);

    document.title = 'Blog | Register';
    return <FormLogin signUp setValue={setValue} messageSelector={messageSelector} path="/login" />;
}

export default Register;
