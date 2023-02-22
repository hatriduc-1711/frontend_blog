import styles from './FormLogin.module.scss';
import Button from '~/components/Button';
import { register } from '~/redux/authSlice/registerSlice';
import config from '~/config';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function FormLogin({ signUp, setValue, messageSelector, path }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUserName, setIsValidUserName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const valueFormLogin = {
        email: email,
        password: password,
    };

    const valueFormRegister = {
        email: email,
        name: userName,
        password: password,
    };

    useEffect(() => {
        if (messageSelector?.code === 0) {
            navigate(messageSelector?.path || path);
            signUp && dispatch(register(null));
        }
    }, [messageSelector?.code, messageSelector?.path, navigate, path, dispatch, signUp]);

    const handleOnBlur = (id) => {
        switch (id) {
            case 'email':
                if (!email.match(mailFormat)) {
                    setIsValidEmail(false);
                } else {
                    setIsValidEmail(true);
                }
                break;
            case 'userName':
                if (!userName) {
                    setIsValidUserName(false);
                } else {
                    setIsValidUserName(true);
                }
                break;
            case 'password':
                if (!(password.length >= 8)) {
                    setIsValidPassword(false);
                } else {
                    setIsValidPassword(true);
                }
                break;
            default:
        }
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        signUp ? setValue(valueFormRegister) : setValue(valueFormLogin);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-form')}>
                <div className={cx('banner')}>
                    <img src="	https://tevily.web4s.vn/wp-content/uploads/2021/09/image-6.jpg" alt="" />
                    <p className={cx('another-choice')}>
                        {signUp ? 'Already a member ?' : "Don't have an account ?"}
                        <Link to={signUp ? config.routes.login : config.routes.register}>
                            {signUp ? 'Sign In' : 'Sign Up'}
                        </Link>
                    </p>
                </div>

                <form className={cx('form', { signUp: signUp })}>
                    <div className={cx('wrapper-title')}>
                        <h3 className={cx('title')}>{signUp ? 'Sign Up . . .' : 'Sign In . . .'}</h3>
                        <Link to={signUp ? config.routes.login : config.routes.register}>
                            {signUp ? 'Sign In' : 'Sign Up'}
                        </Link>
                    </div>
                    <div className={cx('form-input')}>
                        <label htmlFor="email-input" className={cx('name-input')}>
                            Email*
                        </label>
                        <br />
                        <div
                            className={cx('border-input', {
                                'error-input': !isValidEmail || messageSelector?.code === 1,
                            })}
                        >
                            <input
                                value={email}
                                id="email-input"
                                className={cx('input')}
                                type="email"
                                placeholder="contact@example.com"
                                spellCheck="false"
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleOnBlur('email')}
                                onFocus={() => setIsValidEmail(true)}
                            />
                        </div>
                        <div className={cx('error')}>
                            {(!isValidEmail && <span>Enter the correct email ! ! !</span>) ||
                                (messageSelector?.code === 1 && <span>{messageSelector?.message}</span>)}
                        </div>
                    </div>
                    {signUp && (
                        <div className={cx('form-input')}>
                            <label htmlFor="userName-input" className={cx('name-input')}>
                                User Name*
                            </label>
                            <br />
                            <div className={cx('border-input', { 'error-input': !isValidUserName })}>
                                <input
                                    value={userName}
                                    id="userName-input"
                                    className={cx('input')}
                                    type="text"
                                    placeholder="User Name"
                                    spellCheck="false"
                                    onChange={(e) => setUserName(e.target.value)}
                                    onBlur={() => handleOnBlur('userName')}
                                    onFocus={() => setIsValidUserName(true)}
                                />
                            </div>
                            <div className={cx('error')}>
                                {!isValidUserName && <span>Enter the correct email ! ! !</span>}
                            </div>
                        </div>
                    )}
                    <div className={cx('form-input')}>
                        <label htmlFor="password-input" className={cx('name-input')}>
                            Password*
                        </label>
                        <br />
                        <div
                            className={cx('border-input', {
                                'error-input': !isValidPassword || messageSelector?.code === 2,
                            })}
                        >
                            <input
                                value={password}
                                id="password-input"
                                className={cx('input')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="1 2 3 - - -"
                                spellCheck="false"
                                autoComplete="a12345678"
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => handleOnBlur('password')}
                                onFocus={() => setIsValidPassword(true)}
                            />
                            <div className={cx('eye')} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VscEyeClosed /> : <VscEye />}
                            </div>
                        </div>
                        <div className={cx('error')}>
                            {(!isValidPassword && <span>Enter the correct email ! ! !</span>) ||
                                (messageSelector?.code === 2 && <span>{messageSelector?.message}</span>)}
                        </div>
                    </div>
                    <div className={cx('submit')}>
                        {signUp ? (
                            <>
                                <Link to={config.routes.termsOfUse}>Terms of use ! ! !</Link>
                                <Button
                                    disable={!email.match(mailFormat) || !userName || !(password.length >= 8)}
                                    onClick={(e) => handleOnClick(e)}
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to={''}>Lost your password ?</Link>
                                <Button
                                    disable={!email.match(mailFormat) || !(password.length >= 8)}
                                    onClick={(e) => handleOnClick(e)}
                                >
                                    Log In
                                </Button>
                            </>
                        )}
                    </div>
                    <div className={cx('option-two')}>
                        <Button border className={cx('btn')} icon={<FcGoogle />}>
                            continue with google
                        </Button>
                        <Button border className={cx('btn')} icon={<FaFacebookSquare />}>
                            continue with google
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

FormLogin.propTypes = {
    signUp: PropTypes.bool,
    setValue: PropTypes.func,
    messageSelector: PropTypes.object,
    path: PropTypes.string,
};

export default FormLogin;
