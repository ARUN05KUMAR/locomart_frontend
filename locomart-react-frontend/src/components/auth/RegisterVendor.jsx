import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import SignUp from '@/assets/login_illustrations/SignUpBg.png'

function RegisterVendor() {
    const [formData, setFormData] = useState({
        shop_name: '',
        name: '',
        phone_number: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state_region: '',
        postal_code: '',
    })

    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.phone_number.match(/^\d{10}$/)) {
            newErrors.phone_number = 'Phone number must be 10 digits'
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Invalid email address'
        }
        if (formData.password.length < 6 || formData.password.length > 12) {
            newErrors.password = 'Password must be 6-12 characters long'
        }
        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        try {
            await api.post('/vendors', {
                ...formData,
                rating: 0,
                active_status: true,
            })
            navigate('/login/vendor')
        } catch (err) {
            alert(`Exception while doing something: ${err}`)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-100">
            <div className="flex">
                <div>
                    <img src={SignUp} width={'600px'} height={'auto'} alt="Sign_Up_Bg" />
                </div>
                <div className="w-full max-w-xl max-h-[700px] p-8 space-y-6 bg-white bg-gradient-to-r from-violet-600 to-indigo-600  bg-opacity-80 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">
                        LocoMart Vendor Registration
                    </h2>{' '}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Shop Name', name: 'shop_name' },
                            { label: 'Your Name', name: 'name' },
                            { label: 'Phone Number', name: 'phone_number' },
                            { label: 'Email', name: 'email', type: 'email' },
                            { label: 'Password', name: 'password', type: 'password' },
                            {
                                label: 'Confirm Password',
                                name: 'confirmPassword',
                                type: 'password',
                            },
                            { label: 'Address', name: 'address' },
                            { label: 'City', name: 'city' },
                            { label: 'State/Region', name: 'state_region' },
                            { label: 'Postal Code', name: 'postal_code' },
                        ].map(({ label, name, type = 'text' }) => (
                            <div key={name}>
                                <label className="block tracking-wider font-montserrat text-sm font-medium text-white mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={
                                        name === 'confirmPassword'
                                            ? confirmPassword
                                            : formData[name] || ''
                                    }
                                    onChange={
                                        name === 'confirmPassword'
                                            ? (e) => setConfirmPassword(e.target.value)
                                            : handleChange
                                    }
                                    className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
                                />
                                {errors[name] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center justify-center">
                            <input type="checkbox" id="terms" required className="mr-2" />
                            <label htmlFor="terms" className="text-sm text-gray-200">
                                I agree to the Terms and Conditions
                            </label>
                        </div>

                        <div className="md:col-span-2 font-montserrat font-lg">
                            <button
                                type="submit"
                                className="w-full  bg-white text-black font-medium text-lg py-3  hover:bg-gray-400 transition duration-300"
                            >
                                Register as Vendor
                            </button>
                        </div>
                    </form>
                    <div className="md:col-span-2 font-montserrat font-lg">
                        <button
                            type="submit"
                            className="w-full  bg-white text-black font-medium text-lg py-3  hover:bg-gray-400 transition duration-300"
                        >
                            <Link to="/login/vendor">Login as Vendor</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterVendor
