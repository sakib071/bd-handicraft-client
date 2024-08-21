import { FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-teal-500 text-white pt-10">
                <ul className="menu p-4 space-y-3">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/addItems" className="hover:text-white">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems" className="hover:text-white">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" className="hover:text-white">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome" className="hover:text-white">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="hover:text-white">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;