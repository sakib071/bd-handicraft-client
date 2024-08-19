import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrash, FaUsers } from 'react-icons/fa';


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Done!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${user.name} is an admin now`,
                        icon: "success"
                    });
                }
            })
    }

    return (
        <div className="mt-5">
            <div className="flex justify-evenly items-center mb-6">
                <h3>Total Users: <span className="font-bold">{users.length}</span></h3>
                {/* <h3>Total Price: <span className="font-bold">${totalPrice}</span> </h3> */}
                <button className="btn btn-neutral btn-xs px-5 rounded-md">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user?._id}>
                                <th>
                                    <p>{index + 1}</p>
                                </th>
                                <td>
                                    <div className="font-bold">{user?.email}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{user?.name}</div>
                                </td>
                                <th>
                                    {
                                        user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-error btn-square bg-[#D1A054] border-0 text-white text-2xl"><FaUsers></FaUsers></button>
                                    }
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(user)} className="btn btn-error btn-square text-white text-lg"><FaTrash></FaTrash></button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllUsers;