import { request } from '~/utils/httpRequest';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner/Spinner.js';
import RenderTable from '~/components/RenderTable';
import { Modal, Button, Form } from 'react-bootstrap';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function HomeAdmin() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [nameCategory, setNameCategory] = useState('');
    const [descriptionCategory, setDescriptionCategory] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModalSearch, setShowModalSearch] = useState(false);

    const handleShowModalSearch = () => setShowModalSearch(true);
    const handleCloseModalSearch = () => setShowModalSearch(false);

    const editPath = '/admin/categories/edit';
    const deletePath = '/categories/delete';
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await request('GET', '/categories/find-all');
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
        secondColumn: 'Name',
        thirdColumn: 'Description',
    };

    const header = Object.values(headerObj);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (nameCategory === '' || descriptionCategory === '') {
            alert('Error: Please fill in all required fields correctly.');
            return;
        }
        try {
            const postData = {
                id: 0,
                name: nameCategory,
                description: descriptionCategory,
            };
            const res = await request('post', '/categories/add', postData);
            let data = res.data;
            if (data.toLowerCase() === 'true') {
                alert('Added category successfully');
                window.location.reload();
            }
        } catch (error) {
            if (error.response.status === 409) {
                alert('Category already exists');
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await request('GET', '/categories/search?query=' + nameCategory);
            setData(res.data);
            // console.log(res.data);
            setShowModalSearch(false);
        } catch (error) {
            console.error('GET Error:', error);
            setShowModalSearch(false);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h1>Categories</h1>
                </div>
                <div className={cx('search')}>
                    <Button variant="secondary" onClick={handleShowModalSearch}>
                        Search
                    </Button>

                    <Modal show={showModalSearch} onHide={handleCloseModalSearch}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="nameCategoryCondition">
                                <Form.Label>Name category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name category"
                                    onChange={(e) => {
                                        setNameCategory(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModalSearch}>
                                Close
                            </Button>

                            <form onSubmit={handleSearch}>
                                <Button variant="primary" type="submit">
                                    Search
                                </Button>
                            </form>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className={cx('add')}>
                    <Button variant="primary" onClick={handleShow}>
                        Add
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="nameCategoryCondition">
                                <Form.Label>Name category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name category"
                                    onChange={(e) => {
                                        setNameCategory(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="descriptionCategoryCondition">
                                <Form.Label>Description category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description category"
                                    onChange={(e) => {
                                        setDescriptionCategory(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                            <form onSubmit={handleAddCategory}>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </form>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            {isLoading ? (
                <Spinner />
            ) : data ? (
                <RenderTable editPath={editPath} deletePath={deletePath} header={header} data={data} />
            ) : (
                <h1>No data</h1>
            )}
        </div>
    );
}

export default HomeAdmin;
