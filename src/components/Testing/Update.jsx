import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Update = () => {
    const { user, setUser, updateUserProfile } = useContext(AuthContext); // Access updateUserProfile and setUser from AuthContext
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure(); // Secure Axios instance
    const [profileData, setProfileData] = useState({
        displayName: '',
        photoURL: '',
    });

    const onSubmit = async (data) => {
        try {
            // Prepare the updated data to be sent to MongoDB
            const updatedData = {
                displayName: data.displayName,
                photoURL: data.photoURL || user.photoURL,
            };

            // Make a PATCH request to update the user data in the MongoDB database
            const response = await axiosSecure.patch(`/users/${user.email}`, updatedData);

            if (response.data.success) {
                // After MongoDB update is successful, update Firebase profile as well
                await updateUserProfile(data.displayName, data.photoURL);

                // Refetch the updated user data from MongoDB
                const updatedUser = await axiosSecure.get(`/users/${user.email}`);

                // Update the user context with the new data
                setUser(updatedUser.data);

                // Show success message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.displayName} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Optionally, refetch the user profile data if necessary
                fetchUserProfile();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.data.error || "Failed to update data.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            // Handle any errors during the update
            console.error("Error while updating:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong. Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
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

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Display Name Input */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Display Name*</span>
                        </label>
                        <p>Profile: {profileData.displayName}</p>
                        <input
                            type="text"
                            defaultValue={user?.displayName || ""}
                            placeholder="Display Name"
                            {...register("displayName", { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Photo URL Input (Optional) */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={user?.photoURL || ""}
                            placeholder="Photo URL"
                            {...register("photoURL")}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="btn">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
