import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi';

import styles from './Header.module.scss';
import { loginSelector } from '~/redux/selectors';
import { logOut } from '~/services/authServices';
import NavItem from './NavItem';
import Button from '~/components/Button';
import config from '~/config';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    const login = useSelector(loginSelector);
    const accessToken = login?.accessToken;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        if (login?.code === 0) {
            logOut(dispatch, navigate, accessToken);
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('grid', { height: 'height' })}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="" />
                </Link>
                <nav className={cx('navbar')}>
                    <NavItem to={config.routes.home} className={cx('nav-item')}>
                        Home
                    </NavItem>
                    <NavItem to={config.routes.posts} className={cx('nav-item')}>
                        Posts
                    </NavItem>
                </nav>
                <div className={cx('user-container')}>
                    {login?.code === 0 ? (
                        <>
                            <div className={cx('avatar')}>
                                <img src={login.user.image} alt="" />
                            </div>
                            <Button onClick={handleLogOut} icon={<HiLogout />} className={cx('btn')}>
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button to={config.routes.login} className={cx('btn')}>
                                Sign In
                            </Button>
                            <Button to={config.routes.register} className={cx('btn')} borderLarge>
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
