/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import your custom CSS file here if needed

import { request } from '~/utils/httpRequest';

function LoginForm() {
    let navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const saveDataToSession = (username, path) => {
        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        setIsLogin(true);
        localStorage.setItem('token', username);
        localStorage.setItem('expirationTime', expirationTime.toString());
        navigate(path);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                email: email,
                password: password,
            };

            const res = await request('post', '/account/login', postData);
            let data = res.data;

            console.log(data);

            if (!!data.username) {
                if (data.username.toLowerCase() === 'admin') {
                    saveDataToSession(data.username, '/home-admin');
                } else {
                    saveDataToSession(data.username, '/home-user');
                }

                window.location.reload();
            } else {
                setIsLogin(false);
            }
        } catch (error) {
            setIsLogin(false);
        }
    };

    return (
        <div className="container">
            <div className="card login">
                <div className="card-body">
                    <nav className="nav">
                        <a className="nav-link active" href="#">
                            Sign in
                        </a>
                        <a className="nav-link" onClick={handleRegister}>
                            Sign up
                        </a>
                    </nav>

                    <div className="card-body">
                        <h2 className="card-title">Login with your email</h2>
                        <form onSubmit={handleLogin}>
                            <div className={!isLogin ? 'alert alert-danger' : 'alert alert-danger hide'} role="alert">
                                Please enter a valid email address.
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
                            <button type="submit" className="btn btn-primary submitform">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
