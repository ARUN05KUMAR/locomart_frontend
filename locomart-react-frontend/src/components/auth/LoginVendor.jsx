import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import LoginBg from '@/assets/login_illustrations/LoginBg.png'
function LoginVendor() {
    const [shopName, setShopName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/login/vendor', {
                shop_name: shopName,
                password: password,
            })
            localStorage.setItem('access', res.data.access_token)
            localStorage.setItem('vendor_unique', shopName)
            navigate('/vendor')
        } catch (error) {
            alert('Invalid credentials or server error')
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex">
                <div>
                    <img
                        src={LoginBg}
                        width={'600px'}
                        height="auto"
                        alt="Login_illustration_image"
                    />
                </div>
                <div className="w-full max-w-md bg-white bg-gradient-to-r from-violet-600 to-indigo-600 p-8 rounded-lg bg-opacity-80 shadow-lg">
                    <div className="flex flex-col">
                        <h2 className="text-4xl font-popping text-wrap text-center font-bold leading-none mb-2 text-white flex justify-center items-center w-full">
                            Vendor Login
                        </h2>
                        <div className="text-center font-palanquin mb-6 text-sm text-gray-400">
                            Connect with your regional network
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-medium font-montserrat text-gray-300 ml-2 my-1 text-md">
                                Shop Name
                            </label>

                            <input
                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300  bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium font-montserrat text-gray-300 ml-2 my-1 text-md">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300  bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 mt-6 text-lg font-medium font-montserrat hover:bg-slate-400  bg-slate-50 transition duration-300 ease-in-out"
                            >
                                Login as Vendor
                            </button>
                        </div>
                    </form>
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 text-lg font-medium font-montserrat hover:bg-slate-400  bg-slate-50 transition duration-300 ease-in-out"
                    >
                        <Link to="/register/vendor">SignIn as Vendor</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginVendor
