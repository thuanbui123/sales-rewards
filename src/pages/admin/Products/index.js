import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import React, { useEffect, useState } from 'react';
import { request } from '~/utils/httpRequest';
import RenderTable from '~/components/RenderTable';
import Spinner from '~/components/Spinner/Spinner';
import { Button, Modal, Form } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Products() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [show, setShow] = useState(false);

    const [errorPrice, setErrorPrice] = useState('');
    const [errorStockQuantity, setErrorStockQuantity] = useState('');
    const [errorRewardPercentage, setErrorRewardPercentage] = useState('');

    const handleClose = () => {
        setShow(false);
        setErrorPrice('');
        setErrorStockQuantity('');
        setErrorRewardPercentage('');
    };
    const handleShow = () => setShow(true);

    const [showModalSearch, setShowModalSearch] = useState(false);

    const handleShowModalSearch = () => setShowModalSearch(true);
    const handleCloseModalSearch = () => setShowModalSearch(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [rewardPercentage, setRewardPercentage] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [dataCategory, setDataCategory] = useState([]);

    const editPath = '/admin/products/edit';
    const deletePath = '/products/delete';

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await request('GET', '/products/find-all');
                if (isMounted) {
                    setData(res.data);
                }
                const resCategory = await request('GET', '/categories/find-all');
                if (isMounted) {
                    setDataCategory(resCategory.data);
                }
                setIsLoading(false);
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
        fourthColumn: 'Price',
        fifthColumn: 'Stock quantity',
        sixthColumn: 'Reward percentage',
        seventhColumn: 'Name category',
    };

    const header = Object.values(headerObj);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await request('GET', '/products/search?query=' + name);
            setData(res.data);
            // console.log(res.data);
            setShowModalSearch(false);
        } catch (error) {
            console.error('GET Error:', error);
            setShowModalSearch(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            // handle user enter negative
            if (errorPrice || errorStockQuantity || errorRewardPercentage) {
                alert('Please fix the errors before submitting.');
                return;
            }

            // handle user not fill
            if (
                name === '' ||
                description === '' ||
                price === '' ||
                stockQuantity === '' ||
                rewardPercentage === '' ||
                categoryId === ''
            ) {
                alert('Error: Please fill in all required fields correctly.');
                return;
            }

            const postData = {
                name: name,
                description: description,
                price: price,
                stockQuantity: stockQuantity,
                rewardPercentage: rewardPercentage,
                categoryId: categoryId,
            };
            const res = await request('post', '/products/add', postData);
            let data = res.data;
            if (data.toLowerCase() === 'true') {
                alert('Added product successfully');
                window.location.reload();
            }
        } catch (error) {
            if (error.response.status === 409) {
                alert('Product already exists');
            }
        }
    };

    const handleChangePrice = (e) => {
        const value = e.target.value;
        if (value < 0) {
            setErrorPrice('Error: Negative numbers are not allowed');
            e.preventDefault();
            return;
        }
        setErrorPrice('');
        setPrice(value);
    };

    const handleChangeStockQuantity = (e) => {
        const value = e.target.value;
        if (value < 0) {
            setErrorStockQuantity('Error: Negative numbers are not allowed');
            e.preventDefault();
            return;
        }
        setErrorStockQuantity('');
        setStockQuantity(value);
    };

    const handleChangeRewardPercentage = (e) => {
        const value = e.target.value;
        if (value < 0) {
            setErrorRewardPercentage('Error: Negative numbers are not allowed');
            e.preventDefault();
            return;
        }
        setErrorRewardPercentage('');
        setRewardPercentage(value);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h1>Products</h1>
                </div>
                <div className={cx('search')}>
                    <Button variant="secondary" onClick={handleShowModalSearch}>
                        Search
                    </Button>

                    <Modal show={showModalSearch} onHide={handleCloseModalSearch}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="nameCondition">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product's name"
                                    onChange={(e) => {
                                        setName(e.target.value);
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
                            <Modal.Title>Add product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="nameCondition">
                                <Form.Label>Product's name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product's name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="descriptionCondition">
                                <Form.Label>Product description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product description"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="priceCondition">
                                <Form.Label>Product price</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Enter product price"
                                    onChange={handleChangePrice}
                                />
                                {errorPrice && <div style={{ color: 'red', marginTop: '10px' }}>{errorPrice}</div>}
                            </Form.Group>
                            <Form.Group controlId="stockQuantityCondition">
                                <Form.Label>Number of products in stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Enter number of products in stock"
                                    onChange={handleChangeStockQuantity}
                                />
                                {errorStockQuantity && (
                                    <div style={{ color: 'red', marginTop: '10px' }}>{errorStockQuantity}</div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="rewardPercentageCondition">
                                <Form.Label>The product's rewards percentage</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Enter the product's rewards percentage"
                                    onChange={handleChangeRewardPercentage}
                                />
                                {errorRewardPercentage && (
                                    <div style={{ color: 'red', marginTop: '10px' }}>{errorRewardPercentage}</div>
                                )}
                            </Form.Group>
                            <Form.Group controlId="productSelect">
                                <Form.Label>Select product category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={categoryId}
                                    onChange={(e) => {
                                        setCategoryId(e.target.value);
                                    }}
                                >
                                    <option value="">Select a product category</option>
                                    {dataCategory.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                            <form onSubmit={handleAddProduct}>
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

export default Products;
