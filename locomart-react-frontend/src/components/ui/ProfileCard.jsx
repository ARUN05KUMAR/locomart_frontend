import React, { useState } from 'react'
import ProfileService from '../../services/ProfileService'

const ProfileCard = ({ user, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(user)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {
            const updatedUser = await ProfileService.updateUserData(formData)
            onProfileUpdate(updatedUser)
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to update profile:', error)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                const updatedUser = { ...user, image: reader.result }
                setFormData(updatedUser)
                try {
                    await ProfileService.updateUserData(updatedUser)
                    onProfileUpdate(updatedUser)
                } catch (error) {
                    console.error('Failed to update profile image:', error)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden p-6">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        src={formData.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover cursor-pointer border-4 border-blue-500 hover:opacity-90 transition"
                        onClick={() => document.getElementById('image-upload').click()}
                    />
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                {isEditing ? (
                    <div className="mt-6 w-full space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Full Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Address"
                        />
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 text-center space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-500">{user.address}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileCard
