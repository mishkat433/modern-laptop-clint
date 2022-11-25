import { useEffect, useState } from "react";

const useCheckUser = email => {
    const [checkUser, setCheckUser] = useState('')
    const [userCheckLoading, setUserCheckLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:5000/users/check/${email}`)
            .then(res => res.json())
            .then(data => {
                setCheckUser(data.useCheck)
                setUserCheckLoading(false)
            })
    }, [email, userCheckLoading])
    return [checkUser, userCheckLoading]
}

export default useCheckUser;