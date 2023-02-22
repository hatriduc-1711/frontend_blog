import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    children,
    to,
    onClick,
    icon,
    className,
    disable = false,
    border = false,
    borderLarge = false,
    ...passProps
}) {
    let Comp = !!to ? Link : 'button';
    const props = { onClick, ...passProps };
    if (disable) delete props.onClick;

    return (
        <Comp to={to} {...props} className={cx('wrapper', { [className]: className, disable, border, borderLarge })}>
            {icon && <div className={cx('icon')}>{icon}</div>}
            <span>{children}</span>
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    icon: PropTypes.node,
    disable: PropTypes.bool,
    border: PropTypes.bool,
};

export default Button;
