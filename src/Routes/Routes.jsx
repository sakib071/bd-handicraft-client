import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "../providers/PrivateRoute";
import Blogs from "../pages/Blogs/Blogs";
import SingleBusiness from "../pages/Home/ProductsPage/Singlebusiness";
import Products from "../pages/Home/ProductsPage/Products";
import ErrorPage from "../ErrorPage";
import Profile from "../pages/Profile/Profile";

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
                path: "profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
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
    }
]);
