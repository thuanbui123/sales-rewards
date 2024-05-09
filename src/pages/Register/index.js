/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Import your custom CSS file here if needed

import { request } from '~/utils/httpRequest';

function Register() {
    let navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                id: 1,
                email: email,
                name: name,
                password: password,
            };
            const res = await request('post', '/account/register', postData);
            switch (res.status) {
                case 201:
                    setIsRegister(true);
                    break;
                default:
                    break;
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('System error');
            } else if (error.response && error.response.status === 409) {
                setIsRegister(false);
            } else {
                alert('Unknown error occurred');
            }
        }
    };

    return (
        <div className="container">
            <div className="card register">
                <div className="card-body">
                    <nav className="nav">
                        <a className="nav-link" onClick={handleLogin}>
                            Sign in
                        </a>
                        <a className="nav-link active" href="#">
                            Sign up
                        </a>
                    </nav>

                    <div className="card-body">
                        <h2 className="card-title">Register a new account</h2>
                        <form onSubmit={handleRegister}>
                            <div
                                className={!isRegister ? 'alert alert-danger' : 'alert alert-danger hide'}
                                role="alert"
                            >
                                Email is already in use.
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleUsername1">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleUsername1"
                                    placeholder="Enter username"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <div className="wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control input"
                                        id="exampleInputPassword1"
                                        placeholder="Enter password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <button type="button" className="btn-toggle" onClick={togglePasswordVisibility}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
