import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Header() {
    return (
        <div className={cx('header')}>
            <ul className={cx('nav')}>
                <li>
                    <Link to="http://localhost:3000/admin/home">Sales rewards</Link>
                </li>
                <li>
                    <Link to="http://localhost:3000/admin/categories">Categories</Link>
                </li>
                <li>
                    <Link to="http://localhost:3000/admin/products">Products</Link>
                </li>
                <li>
                    <Link to="#user">User</Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
