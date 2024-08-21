import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "../providers/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/All Users/AllUsers";
import AdminRoute from "../providers/AdminRoute";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Blogs from "../pages/Blogs/Blogs";
import SingleBusiness from "../pages/Home/ProductsPage/Singlebusiness";
import Products from "../pages/Home/ProductsPage/Products";
import ErrorPage from "../ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                errorElement: <ErrorPage />,
            },
            {
                path: "products",
                element: <Products></Products>,
                errorElement: <ErrorPage />,
            },
            {
                path: "products/:_id",
                element: <SingleBusiness></SingleBusiness>,
                errorElement: <ErrorPage />,
            },
            {
                path: "blogs",
                element: <Blogs></Blogs>,
                errorElement: <ErrorPage />,
            },
            {
                path: "login",
                element: <Login></Login>,
                errorElement: <ErrorPage />,
            },
            {
                path: "signup",
                element: <SignUp></SignUp>,
                errorElement: <ErrorPage />,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
]);
