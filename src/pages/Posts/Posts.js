import classNames from 'classnames/bind';
import { FcAddImage } from 'react-icons/fc';
import { BsUpload } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import styles from './Posts.module.scss';
import './Markdown.scss';
import Button from '~/components/Button';
import { loginSelector } from '~/redux/selectors';
import { createPosts } from '~/services/userServices';

const cx = classNames.bind(styles);

function Posts() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [html, setHtml] = useState('');
    const [text, setText] = useState('');
    const [signIn, setSignIn] = useState(false);
    const mdParser = new MarkdownIt();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseLogin = useSelector(loginSelector);
    const accessToken = responseLogin?.accessToken;

    const data = {
        title: title,
        background: image,
        html: html,
        text: text,
        author: responseLogin?.user,
    };

    const handleCreatePosts = () => {
        if (responseLogin?.code === 0) {
            if (title && html && text) {
                createPosts(data, dispatch, navigate, accessToken);
                setTitle('');
                setHtml('');
                setText('');
            }
        } else {
            const auth = window.confirm('You have not logged in you. Do you want to login?');
            if (auth) setSignIn(true);
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setHtml(html);
        setText(text);
    };

    const handleUploadImage = (e) => {
        const files = e.target.files;
        const file = files[0];
        const image = URL.createObjectURL(file);
        setImage(image);
    };

    useEffect(() => {
        document.title = title === '' ? 'Posts' : title;
    }, [title]);

    return (
        <div className={cx('grid')}>
            {signIn && <Navigate to="/login" />}
            <h1 className={cx('title')}>Create New Posts</h1>
            <div className={cx('group-input')}>
                <input
                    value={title}
                    type="text"
                    autoFocus={true}
                    className={cx('input-title')}
                    placeholder="Title. . ."
                    onChange={(e) => setTitle(e.target.value)}
                    spellCheck={false}
                />
                <div className={cx('upload-background')}>
                    <label htmlFor="upload" className={cx('upload-label')}>
                        <FcAddImage /> <BsUpload style={{ marginLeft: '0.5rem' }} />
                    </label>
                    <input
                        type="file"
                        id="upload"
                        className={cx('input-background')}
                        onChange={(e) => handleUploadImage(e)}
                    />
                    <div className={cx('image')}>
                        <span>Background</span>
                        <PhotoProvider>
                            <PhotoView src={image}>
                                <img src={image} alt="" />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                </div>
            </div>
            <MdEditor
                style={{ height: '400px' }}
                className={cx('MdEditor')}
                placeholder="Content written here . . ."
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <Button onClick={handleCreatePosts} disable={!title || !html || !text} className={cx('btn-created')}>
                Created
            </Button>
        </div>
    );
}

export default Posts;
