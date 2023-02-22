import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlEyeglass } from 'react-icons/sl';
import { BsHeartFill, BsHeart, BsChat, BsBookmark, BsBookmarkCheckFill, BsThreeDots } from 'react-icons/bs';

import styles from './DetailPosts.module.scss';
import { postsSelector } from '~/redux/selectors';
import { loginSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

function DetailPosts() {
    const [heart, setHeart] = useState(false);
    const [save, setSave] = useState(false);
    const posts = useSelector(postsSelector);
    const login = useSelector(loginSelector);

    useEffect(() => {
        document.title = 'Blog | ' + posts?.title;
    }, [posts?.title]);

    return (
        <div className={cx('grid')}>
            {login === null ? (
                <div className={cx('message')}>
                    <h2>You have not logged in you. Sign in to see more</h2>
                    <Link to="/login">Login</Link>
                </div>
            ) : (
                <section className={cx('row')}>
                    <section className={cx('column', { 'column-4': 'column-4' })}>
                        <div className={cx('left')}>
                            <div className={cx('left-before')}>
                                <div className={cx('left-author')}>
                                    <div className={cx('left-author-avatar')}>
                                        <img src={posts.author.image} alt="" />
                                    </div>
                                    <h5 className={cx('left-author-name')}>{posts.author.name}</h5>
                                </div>
                                <div className={cx('left-view')}>
                                    <p>
                                        View: {posts.view} <SlEyeglass className={cx('icon-view')} />
                                    </p>
                                </div>
                            </div>
                            <div className={cx('left-after')}>
                                <span>
                                    <BsChat />
                                </span>
                                <span className={cx('icon-heart')} onClick={() => setHeart(!heart)}>
                                    {heart ? <BsHeartFill className={cx('icon-heart-fill')} /> : <BsHeart />}
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className={cx('column', { 'column-large': 'column-large' })}>
                        <div className={cx('container-between')}>
                            <h1 className={cx('title-posts')}>{posts.title}</h1>
                            <div className={cx('header')}>
                                <div className={cx('header-author')}>
                                    <div className={cx('header-author-avatar')}>
                                        <img src={posts.author.image} alt="" />
                                    </div>
                                    <div className={cx('header-author-name')}>
                                        <h5 className={cx('author-name')}>{posts.author.name}</h5>
                                        <p className={cx('created-time')}>{posts.createdAt}</p>
                                    </div>
                                </div>
                                <div className={cx('header-options')}>
                                    <button onClick={() => setSave(!save)} className={cx('btn-icon')}>
                                        {save ? (
                                            <BsBookmarkCheckFill className={cx('icon-bookmark-fil')} />
                                        ) : (
                                            <BsBookmark className={cx('icon-bookmark')} />
                                        )}
                                    </button>
                                    <button className={cx('btn-icon')}>
                                        <BsThreeDots className={cx('icon-option')} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: posts.html }}></div>
                            <div className={cx('container-between-after')}>
                                <span>
                                    <BsChat />
                                </span>
                                <span className={cx('icon-heart')} onClick={() => setHeart(!heart)}>
                                    {heart ? <BsHeartFill className={cx('icon-heart-fill')} /> : <BsHeart />}
                                </span>
                            </div>
                        </div>
                    </section>
                </section>
            )}
        </div>
    );
}

export default DetailPosts;
