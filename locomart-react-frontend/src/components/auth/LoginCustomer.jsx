import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { showToast } from '../ui/Toast'
import LoginBg from '@/assets/login_illustrations/LoginBg.png'

function LoginCustomer() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (token) {
            navigate('/') // or home page
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/login/customer', {
                phone_number: phone,
                password: password,
            })
            const token = res.data.access_token
            localStorage.setItem('access', token)
            localStorage.setItem('ph_no', phone)
            navigate('/')
        } catch (error) {
            showToast(error.response?.data?.detail || 'Login failed', 'error')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-gray-100">
            <div className="flex">
                <div>
                    <img
                        src={LoginBg}
                        width={'600px'}
                        height="auto"
                        alt="Login_illustration_image"
                    />
                </div>
                <div className="w-full max-w-md bg-gradient-to-r from-violet-600 to-indigo-600 bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-sm">
                    <div className="flex flex-col">
                        <h2 className="text-4xl font-popping text-wrap text-center font-bold leading-none mb-2 text-white flex justify-center items-center w-full">
                            LocoMart Customer Login
                        </h2>
                        <div className="text-center font-palanquin mb-6 text-sm text-gray-400">
                            Connect with your regional network
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="">
                            <label className="block font-medium font-montserrat text-gray-300 ml-2 my-1 text-md">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 border border-gray-300  bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={15}
                                required
                            />
                        </div>

                        <div className=" ">
                            <label className="block font-medium font-montserrat text-gray-300 ml-2 my-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                maxLength={12}
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 font-medium mt-6 text-lg font-montserrat hover:bg-slate-400  bg-slate-50 transition duration-300 ease-in-out"
                            >
                                Login as Customer
                            </button>
                        </div>
                    </form>
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 font-medium text-lg font-montserrat hover:bg-slate-400  bg-slate-50 transition duration-300 ease-in-out"
                    >
                        <Link to="/register/customer">Register as Customer</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginCustomer
