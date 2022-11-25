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
        element: <DashboardLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProduct />
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            }
        ]
    }
])

export default routes;