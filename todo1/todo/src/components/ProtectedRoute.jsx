import { useUser } from "../context/useUser.jsx"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const { user } = useUser()
    if (!user || !user.token ){
        return <Navigate to="/login" replace />
    }
    return (<Outlet />)
}