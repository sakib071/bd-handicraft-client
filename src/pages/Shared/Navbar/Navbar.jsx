import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { ThemeContext } from "../../../providers/ThemeProvider";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { theme, toggleTheme } = useContext(ThemeContext);
    // const [isAdmin] = useAdmin();

    const { data } = useQueryErrorResetBoundary({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${user.email}`); // Use GET method
            return response.data;
        },
        refetchOnWindowFocus: false,
    });
    console.log(data);

    // const handleLogOut = () => {
    //     logOut()
    //         .then(() => { })
    //         .catch(error => console.log(error));
    // }
    const navOptions = <>
        <li><Link to='/' className="hover:text-teal-500 text-base font-semibold">Home</Link></li>
        <li><Link to='/products' className="hover:text-teal-500 text-base font-semibold">Products</Link></li>
        <li><Link to='/favorites' className="hover:text-teal-500 text-base font-semibold">Favorite Products</Link></li>
        <li><Link to='/blogs' className="hover:text-teal-500 text-base font-semibold">Blog</Link></li>
    </>

    return (
        <>
            <div className={`navbar fixed z-10 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} max-w-screen mx-auto px-10`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost dark:text-white text-black lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a href="/" className="uppercase text-xl dark:text-white text-black">Bangladeshi<span className="font-bold text-teal-500">Handcrafts</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-10 px-1 dark:text-white text-black transition-all ease-in-out">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end flex gap-4">
                    {
                        user ?
                            <a href="/profile" className="flex gap-3 items-center">
                                {/* <a className="ml-4 font-semibold hover:text-teal-500 dark:text-white text-black">{user?.displayName || "user"}</a> */}
                                <figure><img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL || "/avatar.jpg"} alt="" /></figure>
                                {/* <button onClick={handleLogOut} className="text-red-500 hover:text-red-600 font-bold">Log Out</button> */}
                            </a> :
                            <div className="flex gap-2">
                                <p className="dark:text-white text-black hover:text-teal-500 transition-all ease-in-out"><Link to='/signup'>Register</Link></p>
                                <div>|</div>
                                <p className="dark:text-white text-black hover:text-teal-500 transition-all ease-in-out"><Link to='/login'>Login</Link></p>
                            </div>
                    }

                    <input
                        onClick={toggleTheme} type="checkbox"
                        className={`rounded-full toggle toggle-sm ${theme === 'dark' ? 'bg-teal-500' : 'bg-white'}`} defaultChecked
                    />
                </div>
            </div>
        </>
    );
};

export default Navbar;