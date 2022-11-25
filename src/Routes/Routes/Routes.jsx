import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home/Home";
import HomeLayout from "../../Pages/Layout/HomeLayout";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import NotFound from "../../Pages/NotFound/NotFound";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import BrandCategory from "../../Pages/BrandCategory/BrandCategory";
import Blog from "../../Pages/Blog/Blog";
import DashboardLayout from "../../Pages/Layout/DashboardLayout";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import SeallerRoute from "../SeallerRoute/SeallerRoute";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/category/:id",
                element: <PrivateRoute>< BrandCategory /></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <NotFound />,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SeallerRoute><AddProduct /></SeallerRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <AdminRoute><AddProduct /></AdminRoute>
            },
            {
                path: '/dashboard/myOrders',
                element: <PrivateRoute><MyOrders /></PrivateRoute>
            },
            {
                path: '/dashboard/myProduct',
                element: <AdminRoute><MyProducts /></AdminRoute>
            },
            {
                path: '/dashboard/myProduct',
                element: <SeallerRoute><MyProducts /></SeallerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
            {
                path: '/dashboard/allUsers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            }
        ]
    }
])

export default routes;