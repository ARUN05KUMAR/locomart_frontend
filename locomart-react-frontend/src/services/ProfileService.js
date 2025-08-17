import axios from 'axios'

const PROFILE_API_URL = 'http://localhost:8000'

class Profile {
    // Fetch user data
    async getUserData(ph_number) {
        const response = await axios.get(`${PROFILE_API_URL}/customer/phone/${ph_number}`)
        return response.data
    }

    // Fetch orders data
    async getOrdersData() {
        const response = await axios.get(`${PROFILE_API_URL}/orders`)
        return response.data
    }

    // Update an order
    async updateOrder(order) {
        const response = await axios.put(`${PROFILE_API_URL}/orders/${order.id}`, order)
        return response.data
    }

    // Update user profile data
    async updateUserData(updatedUser) {
        const response = await axios.put(`${PROFILE_API_URL}/user`, updatedUser)
        return response.data
    }

    // Fetch payments data
    async getPaymentsData() {
        const response = await axios.get(`${PROFILE_API_URL}/payments`)
        return response.data
    }

    // Update the profile image
    async updateProfileImage(imageURL) {
        try {
            // You would ideally send this to the server, and here we're simulating it
            const response = await axios.put(`${PROFILE_API_URL}/user/image`, { image: imageURL })
            return response.data // Assuming the backend returns the updated user data
        } catch (error) {
            console.error('Error updating profile image', error)
            throw error
        }
    }
}

const ProfileService = new Profile()
export default ProfileService
