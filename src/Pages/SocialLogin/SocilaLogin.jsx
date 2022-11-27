import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGithubAlt, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../Contex/AuthProvider';

const SocilaLogin = () => {
    const { googleSiginIn, setLoading } = useContext(AuthContex)
    const [error, setError] = useState("")

    const location = useLocation();
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/";

    const googleSiginHandle = () => {
        setLoading(true)
        googleSiginIn()
            .then(result => {
                const user = result.user;
                const userType = 'user';
                const currentUser = {
                    email: user.email,
                }
                fetch('http://localhost:5000/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                }).then(res => res.json())
                    .then(data => {
                        localStorage.setItem("laptop-token", data.accessToken)
                        checkAlreadyLogin(user?.displayName, user?.email, user?.photoURL, userType)
                        navigate(from, { replace: true })
                    })
                setError("")
            })
            .catch(err => setError(err.message))
    }

    const checkAlreadyLogin = (name, email, photo, userType) => {
        fetch(`http://localhost:5000/saveUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    saveLoginUser(name, email, photo, userType)
                }
                else {
                    toast.success('user login successful')
                }
            })
    }

    const saveLoginUser = (name, email, photo, userType) => {
        const user = { name, email, photo, userType, verify: "notVerified" }
        fetch('http://localhost:5000/saveUser', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('user login successful')

                }
            })
    }

    // const githubLoginhandle = () => {
    //     githubLogin()
    //         .then(result => {
    //             const user = result.user;
    //             const currentUser = {
    //                 email: user.email,
    //                 name: user.displayName
    //             }
    //             fetch('https://perfect-click-server.vercel.app/jwt', {
    //                 method: "POST",
    //                 headers: {
    //                     'content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify(currentUser)
    //             }).then(res => res.json())
    //                 .then(data => {
    //                     localStorage.setItem("photo-token", data.token)
    //                     toast("Login successful")
    //                     navigate(from, { replace: true })
    //                 })
    //             setError("")
    //         })
    //         .catch(err => setError(err.message))
    // }
    return (
        <div>
            {error && <p className='text-center text-red-600 my-3'>{error}</p>}
            <div className='flex justify-evenly mb-3 mt-3'>
                <button onClick={googleSiginHandle} className='bg-gray-300 p-3 rounded-full text-orange-600 text-xl' ><FaGoogle /></button>
                <button className='bg-gray-300 p-3 rounded-full text-gray-600 text-xl'><FaGithubAlt /></button>
                <button className='bg-gray-300 p-3 rounded-full text-blue-800 text-xl'><FaTwitter /></button>
            </div>
        </div>
    );
};

export default SocilaLogin;