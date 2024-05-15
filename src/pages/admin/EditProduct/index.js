/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProduct.module.scss';
import { Button, Form } from 'react-bootstrap';
import { request } from '~/utils/httpRequest';
import { useParams } from 'react-router-dom';
import Spinner from '~/components/Spinner/Spinner';

const cx = classNames.bind(styles);

function EditProduct() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [rewardPercentage, setRewardPercentage] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [errorPrice, setErrorPrice] = useState('');
    const [errorStockQuantity, setErrorStockQuantity] = useState('');
    const [errorRewardPercentage, setErrorRewardPercentage] = useState('');

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

    let { id } = useParams();
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await request('GET', '/products/search?id=' + id);
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

    useEffect(() => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStockQuantity(data.stockQuantity);
        setRewardPercentage(data.rewardPercentage);
        dataCategory.forEach((key) => {
            if (data.nameCategory === key.name) {
                setCategoryId(key.id);
            }
        });
    }, [data, dataCategory]);

    const handleSubmit = async (e) => {
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

            const putData = {
                name: name,
                description: description,
                price: price,
                stockQuantity: stockQuantity,
                rewardPercentage: rewardPercentage,
                categoryId: categoryId,
            };
            const res = await request('put', '/products/update/' + id, putData);
            let data = res.data;
            if (data.toLowerCase() === 'true') {
                alert('Edit product successfully');
                window.location.reload();
            }
        } catch (error) {
            if (error.response.status === 404) {
                alert('Product dose not exists');
            }
        }
    };

    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                <h2>Edit product</h2>
            </header>
            {isLoading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit}>
                    <Form.Group className={cx('form-group')} controlId="nameCondition">
                        <Form.Label>Product's name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            placeholder="Enter product's name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="descriptionCondition">
                        <Form.Label>Product description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            placeholder="Enter product description"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="priceCondition">
                        <Form.Label>Product price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            min="0"
                            placeholder="Enter product price"
                            onChange={handleChangePrice}
                        />
                        {errorPrice && <div style={{ color: 'red', marginTop: '10px' }}>{errorPrice}</div>}
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="stockQuantityCondition">
                        <Form.Label>Number of products in stock</Form.Label>
                        <Form.Control
                            type="number"
                            value={stockQuantity}
                            min="0"
                            placeholder="Enter number of products in stock"
                            onChange={handleChangeStockQuantity}
                        />
                        {errorStockQuantity && (
                            <div style={{ color: 'red', marginTop: '10px' }}>{errorStockQuantity}</div>
                        )}
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="rewardPercentageCondition">
                        <Form.Label>The product's rewards percentage</Form.Label>
                        <Form.Control
                            type="number"
                            value={rewardPercentage}
                            min="0"
                            placeholder="Enter the product's rewards percentage"
                            onChange={handleChangeRewardPercentage}
                        />
                        {errorRewardPercentage && (
                            <div style={{ color: 'red', marginTop: '10px' }}>{errorRewardPercentage}</div>
                        )}
                    </Form.Group>
                    <Form.Group className={cx('form-group')} controlId="productSelect">
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
                    <Button variant="primary" className={cx('btn')} type="submit">
                        Save
                    </Button>
                </form>
            )}
        </div>
    );
}

export default EditProduct;
