import PropTypes from 'prop-types';
import Header from '~/layout/components/Header';
import Footer from '~/layout/components/Footer';

function LayoutDefault({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

LayoutDefault.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutDefault;
