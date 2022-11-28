import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../Contex/AuthProvider';
import loginImg from "../../assets/loginRegister.gif"
import SocialLogin from "../SocialLogin/SocilaLogin";
import { useForm } from "react-hook-form";
import SmallSpinner from '../../Componemts/SmallSpinner';


const Register = () => {
    const { createUser, profileUpdate, setLoading } = useContext(AuthContex)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [show, setShow] = useState(false)
    const [spin, setSpin] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/";

    const signUpHandle = (data) => {
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)
        setLoading(true)
        setSpin(true)

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_uploadKey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(photo => {
                createUser(data?.email, data?.password)
                    .then(result => {
                        const userType = data.userType;
                        const user = result.user;
                        const currentUser = {
                            email: user.email
                        }
                        profileUpdate(data?.name, photo?.data?.display_url)
                            .then(() => {
                                fetch('https://modern-laptop-server.vercel.app/jwt', {
                                    method: "POST",
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(currentUser)
                                }).then(res => res.json())
                                    .then(data => {
                                        localStorage.setItem("laptop-token", data.accessToken)
                                        saveLoginUser(user?.displayName, user?.email, photo?.data?.display_url, userType)
                                    })
                            }).catch((error) => {
                                console.log(error.message)
                            });
                    })
                    .catch(err => {
                        toast.error(err.message)
                        setLoading(false)
                    })

            })
            .catch(err => console.log(err.message))
    }

    const saveLoginUser = (name, email, photo, userType) => {
        // console.log(name, email, photo, userType);
        const user = { name, email, photo, userType, verify: "notVerified" }
        fetch('https://modern-laptop-server.vercel.app/saveUser', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('user created successful')
                    setLoading(false)
                    setSpin(false)
                    navigate(from, { replace: true })
                }
            })
    }

    return (
        <div className="w-11/12 mx-auto h-full  my-5 md:my-10 ">
            <div className="flex justify-around items-center gap-10" data-aos="fade-right">
                <div className="text-center lg:text-left hidden lg:block ">
                    <img src={loginImg} alt="" />
                </div>
                <div className='card w-full lg:w-2/6 shadow-md p-5 '>
                    <h2 className='text-2xl text-center font-semibold'> Sign Up</h2>
                    <form className='w-full mb-3' onSubmit={handleSubmit(signUpHandle)}>
                        <div className="form-control w-full mt-3">
                            <label className="label">Account Type </label>
                            <select name="userType" id="" className="input input-bordered w-full "{...register("userType")} >
                                <option value='user'>User</option>
                                <option value='sealer'>Sealer</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">FullName </label>
                            <input type='text' {...register("name", { required: 'name is required' })} className="input input-bordered w-full " />
                            {errors.name && <p className='text-red-500'>{errors?.name.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Photo </label>
                            <input type='file' {...register("image")} className=" file-input file-input-bordered file-input-primary w-full " />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Email </label>
                            <input type='email' {...register("email", { required: "Email is required" })} className="h-10 input input-bordered w-full " />
                            {errors.email && <p className='text-red-500'>{errors?.email.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Password </label>
                            <input type={show ? "text" : 'password'} {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters or longer" },
                                pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "password must be strong" }
                            })} className="input input-bordered w-full " placeholder='Must be uppercase, digit, spacial character' />
                            {errors.password && <p className='text-red-500'>{errors?.password.message}</p>}
                            <div className="flex items-center gap-3 my-2" >
                                <input type="checkbox" id='showPass' onClick={() => setShow(!show)} className="checkbox" />
                                <label className="cursor-pointer" htmlFor='showPass'>Show password </label>
                            </div>
                        </div>
                        {
                            spin ? <button className='btn btn-info w-full mt-3' disabled><SmallSpinner /> </button> :
                                <input type="submit" className='btn bg-primary hover:bg-blue-700 border-none w-full mt-3 text-white' value='Login' />
                        }

                    </form>
                    <p>Already have an account? <Link to='/login' className='text-primary font-bold hover:underline'>Login </Link> </p>
                    <div className="divider">OR</div>
                    <SocialLogin />

                </div>
            </div>
        </div>
    );
};

export default Register;