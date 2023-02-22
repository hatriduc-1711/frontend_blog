import PropTypes from 'prop-types';

function LayoutAuth({ children }) {
    return <>{children}</>;
}

LayoutAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutAuth;
