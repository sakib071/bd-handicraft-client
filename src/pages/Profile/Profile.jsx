import { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Update from '../../components/Testing/Update';

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        displayName: '',
        email: '',
        photoURL: '',
        password: ''
    });

    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                displayName: user?.displayName || '',
                email: user?.email || '',
                photoURL: user?.photoURL || '',
                password: '', // Leaving password empty for security reasons
            });
        }
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target; // Correctly destructure name and value
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value // Use name to dynamically update the correct property
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!profileData.displayName) newErrors.displayName = 'Name is required';
        return newErrors;
    };

    console.log(profileData.displayName);

    const fetchUserProfile = async () => {
        try {
            const { data } = await axiosSecure.get(`/users/${profileData.email}`);
            setProfileData({
                displayName: data.displayName,
                email: data.email,
                photoURL: data.photoURL,
            });
        } catch (error) {
            console.error('Error fetching updated user profile:', error);
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            try {
                setLoading(true);
                const { displayName, photoURL, password } = profileData;
                const updateData = { displayName, photoURL, password };

                const response = await axiosSecure.patch(`/users/${profileData.email}`, updateData);

                if (response.data.modifiedCount > 0) {
                    toast.success('Profile updated successfully!');
                    fetchUserProfile()
                } else {
                    toast.error('No changes were made to the profile.');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('Failed to update profile. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(validationErrors);
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
                <div className='inter-500'>
                    {editing ? (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium dark:text-white text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    id="name"
                                    value={profileData?.displayName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black dark:text-white bg-white dark:bg-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {errors?.displayName && <p className="text-red-500 text-xs mt-1">{errors?.displayName}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium dark:text-white text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={profileData?.email}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white bg-white dark:bg-gray-800" disabled
                                />
                                {errors?.email && <p className="text-red-500 text-xs mt-1">{errors?.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="photoURL" className="block text-sm font-medium dark:text-white text-gray-700">Profile picture URL</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    id="photoURL"
                                    value={profileData?.photoURL}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white bg-white dark:bg-gray-900"
                                />
                                {errors?.photoURL && <p className="text-red-500 text-xs mt-1">{errors?.photoURL}</p>}
                            </div>

                            <div className="flex items-center justify-between mt-20">
                                <button
                                    type="submit"
                                    className={`inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-black text-white bg-teal-400 shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
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
                            <div className='grid grid-cols-2 gap-10 border dark:border-gray-800 rounded-lg p-5'>
                                <div>
                                    <p className='text-gray-400'>Name</p>
                                    <p className='text-lg text-black dark:text-white'>{profileData?.displayName || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>Email</p>
                                    <p className='text-lg text-black dark:text-white'>{profileData?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEditing(true)}
                                className="mt-5 px-4 py-2 bg-teal-400 text-black rounded-md hover:bg-teal-500 transition-all ease-in-out"
                            >
                                Edit Profile
                            </button>

                            <Update/>
                        </div>
                    )}
                </div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default Profile;
