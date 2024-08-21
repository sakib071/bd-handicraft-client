import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Update = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            // Prepare data to be sent as JSON (not FormData)
            const updatedData = {
                displayName: data.displayName,
                photoURL: data.photoURL || user.photoURL,  // If you want to update photoURL
            };

            const response = await axiosSecure.patch(`/users/${user.email}`, updatedData);
            console.log(response);

            if (response.data.success) {
                // Show success popup with specific message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.displayName} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Reset the form after a successful update
                reset();
            } else {
                // Handle specific errors from the server
                const errorMessage = response.data.error || "Failed to update data.";
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
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

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Display Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={user?.displayName || ""}
                            placeholder="Display Name"
                            {...register("displayName", { required: true })}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button className="btn">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
