import config from '~/config';

import Home from '~/pages/Home';
import Posts from '~/pages/Posts';
import DetailPosts from '~/pages/DetailPosts';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import TermsOfUse from '~/pages/TermsOfUse';
import LayoutDefault from '~/layout/LayoutDefault';

const pages = [
    { path: config.routes.home, component: Home, layout: LayoutDefault },
    { path: config.routes.posts, component: Posts, layout: LayoutDefault },
    { path: config.routes.detailPosts, component: DetailPosts, layout: LayoutDefault },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.termsOfUse, component: TermsOfUse, layout: LayoutDefault },
];

export default pages;
