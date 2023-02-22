import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';

import styles from './Home.module.scss';
import Button from '~/components/Button';
import { getAllPosts, updateView, getPosts } from '~/services/userServices';
import { allPostsSelector, loginSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

function Home() {
    const [page, setPage] = useState(1);
    const [signIn, setSignIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const response = useSelector(allPostsSelector);
    const login = useSelector(loginSelector);
    const accessToken = login?.accessToken;
    const pages = [];

    for (let i = 1; i <= response?.totalPages; i++) {
        pages.push(i);
    }

    useEffect(() => {
        document.title = 'Blog';
        getAllPosts(page, dispatch);
    }, [page, dispatch]);

    const handleClickRead = async (id) => {
        try {
            if (login?.code === 0) {
                await updateView(id, accessToken);
                getPosts(id, dispatch, navigate, accessToken);
            } else {
                const auth = window.confirm('You have not logged in you. Do you want to login?');
                if (auth) setSignIn(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleNext = () => {
        if (page < response?.totalPages) setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className={cx('grid')}>
            {signIn && <Navigate to="/login" />}
            <h1 className={cx('title')}>List Posts</h1>
            <section className={cx('row', { 'list-posts': 'list-posts' })}>
                {response?.listPosts.map((posts, index) => {
                    return (
                        <section key={index} className={cx('column', { 'column-4': 'column-4' })}>
                            <div className={cx('posts-item')}>
                                <Link onClick={() => handleClickRead(posts._id)} className={cx('detail-posts')}>
                                    <img className={cx('background-image')} src={posts.background} alt="" />
                                </Link>
                                <div className={cx('info')}>
                                    <h3 className={cx('posts-title')}>{posts.title}</h3>
                                    <p className={cx('author')}>Author: {posts.author.name}</p>
                                    <p className={cx('create-time')}>Create Time: {posts.createdAt}</p>
                                    <Link onClick={() => handleClickRead(posts._id)} className={cx('detail')}>
                                        Read More <HiChevronDoubleRight />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </section>
            <div className={cx('nav-btn')}>
                <Button
                    icon={<RxDoubleArrowLeft />}
                    onClick={handlePrev}
                    className={cx('btn', { 'btn-prev': 'btn-prev' })}
                    border
                    disable={page === 1}
                />
                {pages.map((index) => {
                    return (
                        <Button
                            key={index}
                            onClick={() => setPage(index)}
                            className={cx('btn', { active: page === index ? 'active' : '' })}
                            border
                        >
                            {index}
                        </Button>
                    );
                })}
                <Button
                    icon={<RxDoubleArrowRight />}
                    onClick={handleNext}
                    className={cx('btn', { 'btn-next': 'btn-next' })}
                    border
                    disable={page === response?.totalPages}
                />
            </div>
        </div>
    );
}

export default Home;
