import { useState } from "react"
import { UserContext } from "./UserContext.jsx"
import axios from "axios"

export default function UserProvider({children}) {

    const apiUrl = import.meta.env.VITE_API_URL;


    const uderFromStorage = localStorage.getItem('user')
    const [user, setUser] = useState(uderFromStorage ? JSON.parse(uderFromStorage) : {email: '', password: ''})

    
    const signUp = async () => {
        const headers = {headers: {'Content-Type': 'application/json'}}
        await axios.post(`${apiUrl}/user/signup`, {user: {email: user.email, password: user.password}}, headers)
        setUser({email: '', password: ''})
    }

    const login = async (email, password) => {
        const headers = {headers: {'Content-Type': 'application/json'}}
        await axios.post(`${apiUrl}/user/login`, {user: {email, password}}, headers)
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return (
        <UserContext.Provider value={{user, setUser, signUp, login}}>
            {children}
        </UserContext.Provider>
    )
}