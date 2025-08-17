import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileCard from '../components/ui/ProfileCard'
import ProfileService from '../services/ProfileService'
import OrdersPage from '../pages/ProfileOrder'
import PaymentsPage from '../pages/ProfilePayment'

const ProfilePage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [showOrders, setShowOrders] = useState(false)
    const [showPayments, setShowPayments] = useState(false)
    const phone = localStorage.getItem('ph_no');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await ProfileService.getUserData(phone)
                setUser(userData)
            } catch (error) {
                console.error('Failed to load user data:', error)
            }
        }
        fetchUserData()
    }, [])

    const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser)
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/')
    }

    const handleOrdersClick = () => {
        setShowOrders(!showOrders)
        setShowPayments(false)
    }

    const handlePaymentsClick = () => {
        setShowPayments(!showPayments)
        setShowOrders(false)
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
                Loading profile...
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-xl rounded-tr-3xl rounded-br-3xl p-6 flex flex-col items-center sticky top-0 h-screen">
                <div className="mb-5 relative group">
                    <img
                        src={user.image || 'https://via.placeholder.com/100'}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg group-hover:scale-105 transition duration-300 cursor-pointer"
                        onClick={() => document.getElementById('image-upload').click()}
                    />
                </div>
                <div className="text-2xl font-bold text-gray-800 text-center mb-6">{user.name}</div>
                <nav className="w-full flex flex-col gap-4">
                    <button
                        onClick={handleOrdersClick}
                        className={`py-2 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                            showOrders
                                ? 'bg-indigo-100 text-indigo-700 shadow-inner'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        📦 My Orders
                    </button>
                    <button
                        onClick={handlePaymentsClick}
                        className={`py-2 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                            showPayments
                                ? 'bg-indigo-100 text-indigo-700 shadow-inner'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        💳 Payment History
                    </button>
                    <button
                        onClick={handleLogout}
                        className="py-2 px-4 text-red-600 hover:text-white hover:bg-red-500 transition-all duration-300 font-semibold rounded-xl"
                    >
                        🚪 Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 px-10 py-10 overflow-y-auto">
                <section className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 border-b pb-3">
                        👤 Profile Overview
                    </h2>
                </section>
                <section className="mb-10">
                    <ProfileCard user={user} onProfileUpdate={handleProfileUpdate} />
                </section>
                {showOrders && (
                    <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Orders</h3>
                        <OrdersPage userId={user.id} />
                    </section>
                )}
                {showPayments && (
                    <section className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Payment Details
                        </h3>
                        <PaymentsPage userId={user.id} />
                    </section>
                )}
            </main>
        </div>
    )
}

export default ProfilePage
