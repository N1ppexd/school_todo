import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

export default function UserProvider({children}) {

    const apiUrl = import.meta.env.VITE_API_URL;


    const uderFromStorage = sessionStorage.getItem('user')
    const [user, setUser] = useState(uderFromStorage ? JSON.parse(uderFromStorage) : {email: '', password: ''})

    
    const signUp = async () => {
        const headers = {headers: {'Content-Type': 'application/json'}}
        await axios.post(`${apiUrl}/user/signup`, {user: {email: user.email, password: user.password}}, headers)
        setUser({email: '', password: ''})
    }

    const logIn = async () => {
        const headers = {headers: {'Content-Type': 'application/json'}}
        const response = await axios.post(`${apiUrl}/user/login`, {user: {email, password}}, headers)
        setUser(response.data)
        sessionStorage.setItem('user', JSON.stringify(response.data))
    }

    return (
        <UserContext.Provider value={{user, setUser, signUp, logIn}}>
            {children}
        </UserContext.Provider>
    )
}