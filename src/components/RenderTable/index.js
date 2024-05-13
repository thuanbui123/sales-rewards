/* eslint-disable jsx-a11y/scope */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from './RenderTable.module.scss';
import { request } from '~/utils/httpRequest';
import { Button, Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

const RenderTable = ({ header, data, editPath, deletePath }) => {
    const [path, setPath] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await request('delete', path);
            if (res.status === 200) {
                alert('Deleted successfully');
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert('Not found');
                } else if (error.response.status === 400) {
                    alert('Deleted failed');
                }
            }
        }
    };

    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    {header.map((value, index) => (
                        <th key={index} scope="col">
                            {value}
                        </th>
                    ))}
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, index) => (
                            <td key={index} scope="row">
                                {value}
                            </td>
                        ))}
                        <td>
                            <Link to={`${editPath}/${row.id}`} className={cx('btn')}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <Button className={cx('btn')} onClick={handleShow}>
                                Delete
                            </Button>
                            <Modal show={show} onHide={handleClose} className={cx('custom-modal')}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm delete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Do you want to implement data deletion method</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>

                                    <form onSubmit={handleDelete}>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setPath(`${deletePath}/${row.id}`);
                                            }}
                                            type="submit"
                                        >
                                            Yes
                                        </Button>
                                    </form>
                                </Modal.Footer>
                            </Modal>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RenderTable;
