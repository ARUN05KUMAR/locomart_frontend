import axios from 'axios'

const VENDOR_API_URL = 'http://localhost:8000/vendors'

class Vendor {
    async getAllVendors() {
        const response = await axios.get(`${VENDOR_API_URL}`)
        return response.data
    }

    async getVendorById(id) {
        const response = await axios.get(`${VENDOR_API_URL}/${id}`)
        return response.data
    }
}

const VendorService = new Vendor()
export default VendorService
