import React, { useContext, useState } from 'react';
import { AuthContex } from '../../Contex/AuthProvider';
import loginImg from "../../assets/loginRegister.gif";
import SocialLogin from "../SocialLogin/SocilaLogin";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import SmallSpinner from '../../Componemts/SmallSpinner';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { UserLogin } = useContext(AuthContex);
    const [loginError, setLoginError] = useState('')
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data) => {
        setLoading(true)
        UserLogin(data?.email, data?.password)
            .then(result => {
                const user = result.user;
                const currentUser = {
                    email: user.email
                }
                setLoginError('')
                setLoading(false)
                fetch('http://localhost:5000/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                }).then(res => res.json())
                    .then(data => {
                        toast.success('login successful')
                        navigate(from, { replace: true })
                        localStorage.setItem("laptop-token", data.accessToken)

                    })
            })
            .catch(err => {
                setLoginError(err.message)
                toast.error("Something Wrong", err.message)
                setLoading(false)
            })
    }

    // const passwordResetHandle = () => 
    // if (formData?.email) {
    //     setError('')
    //     forgetPassword(formData?.email)
    // }
    // else {
    //     setError("emter your email")
    // }
    // }
    return (
        <div className="w-11/12 mx-auto h-full  my-5 md:my-10">
            <div className="flex justify-around items-center gap-10">
                <div className="text-center lg:text-left hidden lg:block" data-aos="fade-right">
                    <img className='w-4/5 hidden md:block' src={loginImg} alt="" />
                </div>
                <div className='card w-2/6 shadow-md p-5 '>
                    <h2 className='text-2xl text-center font-semibold'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)} className='w-full mb-3'>
                        {/* <div className="form-control w-full mt-3">
                            <label className="label">Account Type </label>
                            <select name="" id="" className="input input-bordered w-full "{...register("userType")} >
                                <option value='user'>User</option>
                                <option value='sealer'>Sealer</option>
                            </select>
                        </div> */}
                        <div className="form-control w-full">
                            <label className="label">Email </label>
                            <input type='email' {...register("email", { required: "Email is required" })} className="input input-bordered w-full " />
                            {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Password </label>
                            <input type={show ? "text" : 'password'} {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters or longer" },
                                pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "password must be strong use special charecter" }
                            })} className="input input-bordered w-full " placeholder='Must be uppercase, digit, spacial character' />
                            {errors.password && <p className='text-red-500'>{errors?.password.message}</p>}
                            <div className="flex items-center gap-3 my-2" >
                                <input type="checkbox" id='showPass' onClick={() => setShow(!show)} className="checkbox" />
                                <label className="cursor-pointer" htmlFor='showPass'>Show password </label>
                            </div>
                            <span>Forget password?</span>
                        </div>
                        {
                            loading ? <button className='btn btn-primary w-full mt-3' disabled><SmallSpinner /> </button> :
                                <input type="submit" className='btn bg-orange-500 border-none w-full mt-3 text-white' value='Login' />
                        }
                        <div className='mt-2'>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                    </form>
                    <p>Don't have an account <Link to='/register' className='text-primary font-bold '>Create an Account </Link> </p>
                    <div className="divider">OR</div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;