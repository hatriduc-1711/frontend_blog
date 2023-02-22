import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <p>2023 : Hà Trí Đức</p>
        </div>
    );
}

export default Footer;
