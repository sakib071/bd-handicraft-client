import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser, updateUserProfile, logOut } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        displayName: '',
        photoURL: '',
    });


    useEffect(() => {
        if (user) {
            setProfileData({
                displayName: user?.displayName || '',
                email: user?.email || '',
                photoURL: user?.photoURL || '',
            });
        }
    }, [user]);

    console.log(profileData.displayName);

    const onSubmit = async (data) => {
        try {
            const updatedData = {
                displayName: data.displayName,
                photoURL: data.photoURL || user.photoURL,
            };

            const response = await axiosSecure.patch(`/users/${user.email}`, updatedData);

            if (response.data.success) {
                setLoading(true);
                await updateUserProfile(data.displayName, data.photoURL);
                const updatedUser = await axiosSecure.get(`/users/${user.email}`);
                setUser(updatedUser.data);
                toast.success(`${data.displayName}'s Profile updated successfully!`);
                fetchUserProfile();
            } else {
                console.error('Backend reported failure:', response.data);
                toast.error('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error("Error while updating:", error);
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    // Fetch updated user profile data from MongoDB
    const fetchUserProfile = async () => {
        try {
            const { data } = await axiosSecure.get(`/users/${user.email}`);
            setProfileData({
                displayName: data.displayName,
                email: data.email,
                photoURL: data.photoURL,
            });
            console.log(data);
        } catch (error) {
            console.error("Error fetching updated user profile:", error);
        }
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="min-h-screen max-w-3xl flex flex-col justify-center mx-auto">
            <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 p-5 rounded-lg'>
                <h2 className="text-2xl font-bold mb-5 text-black dark:text-white">Profile Information</h2>
                <div>
                    <div className='flex items-center gap-5 mb-5 border dark:border-gray-800 rounded-lg p-5'>
                        <figure className='w-1/3'>
                            <img
                                className='rounded-full w-[150px] h-[150px] object-cover'
                                src={user?.photoURL || profileData?.photoURL || "/avatar.jpg"}
                                alt="Profile"
                            />
                        </figure>
                        <div className='justify-between w-full space-y-5'>
                            <p className='text-lg dark:text-white text-gray-700'>{profileData?.displayName || 'N/A'}</p>
                            <button onClick={handleLogOut} className="btn btn-sm bg-red-500 text-white hover:bg-red-600 border-0 text-xs font-bold">Log Out</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Display Name Input */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-black dark:text-white">Full Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName || ""}
                                placeholder="Display Name"
                                {...register("displayName", { required: true })}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white bg-white dark:bg-gray-900"
                            />
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-black dark:text-white">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.photoURL || ""}
                                placeholder="Photo URL"
                                {...register("photoURL")}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white bg-white dark:bg-gray-900"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-black text-white bg-teal-400 shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default Profile;
