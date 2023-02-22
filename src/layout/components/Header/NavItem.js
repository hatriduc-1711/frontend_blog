import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function NavItem({ children, to, className }) {
    return (
        <NavLink to={to} className={(nav) => cx(className, { active: nav.isActive })}>
            {children}
        </NavLink>
    );
}

NavItem.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default NavItem;
