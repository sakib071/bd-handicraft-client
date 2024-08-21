import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaAngleLeft } from "react-icons/fa6";

const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user added to the database");
                                    reset();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Sign Up Successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/");
                                }
                            })

                    }).catch(error => console.log(error))
            });
    };


    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="card shrink-0 w-full max-w-lg">
                <div className='flex gap-1 text-teal-400 my-5 items-center w-full hover:cursor-pointer'>
                    <FaAngleLeft />
                    <a href="/" className='hover:underline'>Back to Home</a>
                </div>
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600 mt-1 text-xs">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600 mt-1 text-xs">Photo URL is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600 mt-1 text-xs">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary text-white bg-teal-500 hover:bg-teal-600 border-0" type="submit" value="Sign up" />
                    </div>
                    <SocialLogin></SocialLogin>
                    <p className='mt-6 mx-auto text-sm text-black'><Link to="/login" className='hover:underline'>Already have an account? </Link></p>
                </form>

            </div>

        </div>
    );
};

export default SignUp;