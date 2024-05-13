import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Layouts/Admin/Header';
import Sidebar from '~/components/Layouts/Component/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayoutUser({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayoutUser;
