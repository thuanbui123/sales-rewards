import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './UserAccount.module.scss';
import { request } from '~/utils/httpRequest';
import Spinner from '~/components/Spinner/Spinner';
import RenderTable from '~/components/RenderTable';

const cx = classNames.bind(styles);

function UserAccount() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const deletePath = '/account/delete';

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await request('GET', '/account/find-users');
                if (isMounted) {
                    setData(res.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('GET Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const headerObj = {
        firstColumn: 'Id',
        secondColumn: 'Email',
        thirdColumn: 'Name',
        fourthColumn: 'Role',
        fifthColumn: 'Last login',
        sixthColumn: 'Active',
        seventhColumn: 'Created at',
    };

    const header = Object.values(headerObj);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h1>User Account</h1>
                </div>
            </div>
            {isLoading ? (
                <Spinner />
            ) : data ? (
                <RenderTable deletePath={deletePath} header={header} data={data} />
            ) : (
                <h1>No data</h1>
            )}
        </div>
    );
}

export default UserAccount;
