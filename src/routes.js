import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Home from './pages/Home';
import Payment from './pages/Payment';
import NotFound from './pages/Page404';
import Admin from './pages/Admin';

// ----------------------------------------------------------------------

export default function Router() {
  const isLoggedIn = localStorage.getItem('userInfo');

  return useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        // { element: <Navigate to="/dashboard/app" replace /> },
        { path: '', element: <DashboardApp /> },
        { path: 'payment', element: <Payment /> }
      ]
    },
    { path: '/home', element: <Home /> },
    { path: '/admin', element: <Admin /> },
    {
      path: '/',
      element: !isLoggedIn ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '', element: <Navigate to="/login" replace /> }
      ]
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
