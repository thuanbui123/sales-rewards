import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomeUser from '~/pages/user/Home';
import HomeAdmin from '~/pages/admin/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

const checkSessionValidity = () => {
    const tokenExpiration = localStorage.getItem('expirationTime');
    if (tokenExpiration === null) return false;

    const currentTime = new Date().getTime();

    if (!(tokenExpiration > currentTime)) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    }

    return tokenExpiration > currentTime;
};

function App() {
    var token = localStorage.getItem('token');
    var isLoggedIn = !!token;
    const isAdmin = token === 'admin';
    var isSessionValid = checkSessionValidity();
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/home-user"
                        element={isLoggedIn && isSessionValid && !isAdmin ? <HomeUser /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/home-admin"
                        element={isLoggedIn && isSessionValid && isAdmin ? <HomeAdmin /> : <Navigate to="/login" />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
