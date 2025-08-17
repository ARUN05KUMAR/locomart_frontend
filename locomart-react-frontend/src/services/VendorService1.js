import axios from 'axios';

const VENDOR_API_URL = 'http://localhost:8000/products';
const VENDOR_BASE_URL = 'http://localhost:5001';

class Vendor {
    async getAllProducts() {
        const response = await axios.get(VENDOR_API_URL);
        return response.data;
    }

    async getVendor(shopname) {
        const response = await axios.get(`${VENDOR_BASE_URL}/vendor/${shopname}`);
        return response.data;
    }

    async addProduct(product) {
        const response = await axios.post(VENDOR_API_URL, product);
        return response.data;
    }

    async updateProduct(product) {
        const response = await axios.put(`${VENDOR_API_URL}/${product.id}`, product);
        return response.data;
    }

    async deleteProduct(productId) {
        const response = await axios.delete(`${VENDOR_API_URL}/${productId}`);
        return response.data;
    }

    async getProductById(productId) {
        const response = await axios.get(`${VENDOR_API_URL}/${productId}`);
        return response.data;
    }

    async getProductByVendor(vendorId) {
        const response = await axios.get(`${VENDOR_API_URL}/vendor/${vendorId}`);
        return response.data;
    }

    async getOrderByVendor(vendorId) {
        const response = await axios.get(`${VENDOR_BASE_URL}/order/vendor/${vendorId}`);
        return response.data;
    }
}

const VendorService = new Vendor();
export default VendorService;
