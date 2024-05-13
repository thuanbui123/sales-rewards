import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { publicRoutes, userRoutes, adminRoutes } from '~/routes';
import NotFound from '~/pages/NotFound';
import DefaultLayout from '~/components/Layouts/Admin/DefaultLayout';
import DefaultLayoutUser from './components/Layouts/user/DefaultLayout';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    var isAdmin = token === 'admin';
    var isLoggedIn = !!token;
    var isSessionValid = checkSessionValidity();

    return (
        <Router>
            <div className="App">
                <Routes>
                    {isLoggedIn && isSessionValid ? (
                        isAdmin ? (
                            adminRoutes.map((route, index) => {
                                let Layout = DefaultLayout;
                                return (
                                    <Route key={index} path={route.path} element={<Layout>{route.component}</Layout>} />
                                );
                            })
                        ) : (
                            userRoutes.map((route, index) => {
                                let LayoutUser = DefaultLayoutUser;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={<LayoutUser>{route.component}</LayoutUser>}
                                    />
                                );
                            })
                        )
                    ) : (
                        <Navigate to="/login" />
                    )}
                    {publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={route.component} />;
                    })}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
