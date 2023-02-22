import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutAuth from './layout/LayoutAuth';
import pages from './router';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {pages.map((page, index) => {
                        const Layout = page?.layout || LayoutAuth;
                        const Page = page.component;
                        return (
                            <Route
                                key={index}
                                path={page.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
