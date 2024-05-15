/* eslint-disable react-hooks/exhaustive-deps */
import { request } from '~/utils/httpRequest';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './EditCategory.module.scss';
import React, { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner/Spinner';
import { Button, Form } from 'react-bootstrap';

const cx = classNames.bind(styles);

function EditCategory() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nameCategory, setNameCategory] = useState('');
    const [descriptionCategory, setDescriptionCategory] = useState('');

    let { id } = useParams();
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await request('GET', '/categories/search?id=' + id);
                if (isMounted) {
                    setData(res.data);
                    setNameCategory(res.data.name);
                    setDescriptionCategory(res.data.description);
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

    const handlePut = async (e) => {
        e.preventDefault();
        if (nameCategory === '' || descriptionCategory === '') {
            alert('Error: Please fill in all required fields correctly.');
            return;
        }
        try {
            const putData = {
                id: 0,
                name: nameCategory,
                description: descriptionCategory,
            };
            const res = await request('put', '/categories/update/' + id, putData);
            let data = res.data;
            if (data.toLowerCase() === 'true') {
                alert('Edit category successfully');
                window.location.reload();
            }
        } catch (error) {
            if (error.response.status === 404) {
                alert('Category dose not exists');
            }
        }
    };

    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                <h2>Edit category</h2>
            </header>
            {isLoading ? (
                <Spinner />
            ) : (
                <form onSubmit={handlePut}>
                    <Form.Group className={cx('form-group')} controlId="nameCategoryCondition">
                        <Form.Label>Id category:</Form.Label>
                        <Form.Control type="text" readOnly value={data.id} />
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="nameCategoryCondition">
                        <Form.Label>Name category:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name category"
                            onChange={(e) => {
                                setNameCategory(e.target.value);
                            }}
                            value={nameCategory}
                        />
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="descriptionCategoryCondition">
                        <Form.Label>Description category:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description category"
                            onChange={(e) => {
                                setDescriptionCategory(e.target.value);
                            }}
                            value={descriptionCategory}
                        />
                    </Form.Group>
                    <Button variant="primary" className={cx('btn')} type="submit">
                        Save
                    </Button>
                </form>
            )}
        </div>
    );
}

export default EditCategory;
