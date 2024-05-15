/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from './RenderTable.module.scss';
import { request } from '~/utils/httpRequest';
import { Button, Form, Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

const RenderTable = ({ header, data, editPath, deletePath }) => {
    const [path, setPath] = useState('');
    const [show, setShow] = useState(false);
    const [toggleStates, setToggleStates] = useState({});

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

    useEffect(() => {
        // Khởi tạo toggleStates từ data ban đầu
        const initialToggleStates = {};
        data.forEach((row) => {
            initialToggleStates[row.id] = row.isActive;
        });
        setToggleStates(initialToggleStates);
    }, []);

    const handleToggleChange = (e, id) => {
        const { checked } = e.target;
        setToggleStates((prevState) => ({
            ...prevState,
            [id]: checked,
        }));

        // Gọi API cập nhật trạng thái
        updateStatusAPI(id, checked);
    };

    const updateStatusAPI = async (id, checked) => {};

    return (
        <table className="table table-striped table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    {header.map((value, index) => (
                        <th key={index} scope="col">
                            {value}
                        </th>
                    ))}
                    {editPath && <th scope="col">Edit</th>}

                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td scope="row" className={cx('custom-row')}>
                            {rowIndex + 1}
                        </td>
                        {Object.entries(row).map(([key, value], index) => (
                            <td key={index} className={cx('custom-row')}>
                                {key === 'isActive' ? (
                                    <Form.Check
                                        className={cx('pt-10')}
                                        type="switch"
                                        id={`custom-switch-${rowIndex}`}
                                        checked={toggleStates[row.id] || false}
                                        onChange={(e) => handleToggleChange(e, row.id)}
                                    />
                                ) : key === 'rewardPercentage' || key === 'discountValue' ? (
                                    `${value}%`
                                ) : (
                                    value
                                )}
                            </td>
                        ))}
                        {editPath && (
                            <td>
                                <Link to={`${editPath}/${row.id}`} className={cx('btn', 'line-height')}>
                                    Edit
                                </Link>
                            </td>
                        )}
                        <td>
                            <Button className={cx('btn')} onClick={handleShow}>
                                Delete
                            </Button>
                            <Modal show={show} onHide={handleClose} className={cx('custom-modal')}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm delete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Do you want to implement data deletion method?</p>
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
