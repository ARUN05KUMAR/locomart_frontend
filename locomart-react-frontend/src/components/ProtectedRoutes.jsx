import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access')

    return token ? children : <Navigate to="/login/customer" />
}

export default ProtectedRoute
