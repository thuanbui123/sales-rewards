import HomeUser from '~/pages/user/Home';
import HomeAdmin from '~/pages/admin/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import EditCategory from '~/pages/admin/EditCategory';
import Products from '~/pages/admin/Products';
import EditProduct from '~/pages/admin/EditProduct';
import UserAccount from '~/pages/admin/UserAccount';

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
    { path: '/admin/categories', component: <HomeAdmin /> },
    { path: '/admin/categories/edit/:id', component: <EditCategory /> },
    { path: '/admin/products', component: <Products /> },
    { path: '/admin/products/edit/:id', component: <EditProduct /> },
    { path: '/admin/user-account', component: <UserAccount /> },
];

export { publicRoutes, userRoutes, adminRoutes };
