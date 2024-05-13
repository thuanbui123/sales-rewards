import HomeUser from '~/pages/user/Home';
import HomeAdmin from '~/pages/admin/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import EditCategory from '~/pages/admin/EditCategory';

// public routes
const publicRoutes = [
    { path: '/register', component: <Register /> },
    { path: '/login', component: <Login /> },
];

// user routes
const userRoutes = [{ path: '/user/home', component: <HomeUser /> }];

// admin routes
const adminRoutes = [
    { path: '/admin/home', component: <HomeAdmin /> },
    // sửa lại component
    { path: '/admin/home/edit/:id', component: <EditCategory /> },
];

export { publicRoutes, userRoutes, adminRoutes };
