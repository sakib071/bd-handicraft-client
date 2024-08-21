import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
// import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const navOptions = <>
        <li><Link to='/' className="text-black hover:text-teal-500 text-base font-semibold">Home</Link></li>
        <li><Link to='/products' className="text-black hover:text-teal-500 text-base font-semibold">Products</Link></li>
        <li><Link to='/blogs' className="text-black hover:text-teal-500 text-base font-semibold">Blog</Link></li>
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-white max-w-screen mx-auto px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost text-black lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a href="/" className="uppercase text-xl text-black">Bangladeshi<span className="font-bold text-teal-500">Handcrafts</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-10 px-1 text-black hover:text-teal-500 transition-all ease-in-out">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="flex gap-3 items-center">
                                <figure><img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL} alt="" /></figure>
                                <span className="ml-4 text-black">{user?.displayName}</span>
                                <button onClick={handleLogOut} className="text-red-500 hover:text-red-600 font-bold">Log Out</button>
                            </div> :
                            <div className="flex gap-2 text-black">
                                <p className="text-black hover:text-teal-500 transition-all ease-in-out"><Link to='/signup'>Register</Link></p>
                                <div>|</div>
                                <p className="text-black hover:text-teal-500 transition-all ease-in-out"><Link to='/login'>Login</Link></p>
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;