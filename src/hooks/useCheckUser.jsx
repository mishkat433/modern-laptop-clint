import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckUser = (email, logout) => {
    const [checkUser, setCheckUser] = useState('')
    const [userCheckLoading, setUserCheckLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/check/${email}?email=${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("laptop-token")}`
                }
            })
                .then(res => {
                    if (res.status === 403 || res.status === 401) {
                        toast.error("Not Access")
                        navigate('/')
                        return logout()
                    }
                    return res.json()
                })
                .then(data => {
                    setCheckUser(data.useCheck)
                    setUserCheckLoading(false)
                })
        }
    }, [email, userCheckLoading, logout, navigate])
    return [checkUser, userCheckLoading]
}

export default useCheckUser;
