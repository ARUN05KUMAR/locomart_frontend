import axios from 'axios'

const PRODUCT_API_URL = 'http://localhost:8000/products'

class Product {
    async getAllProducts() {
        const response = await axios.get(`${PRODUCT_API_URL}`)
        console.log(response.data)
        return response.data
    }

    async getProductById(id) {
        const response = await axios.get(`${PRODUCT_API_URL}/${id}`)
        console.log(response.data)
        return response.data
    }
}

const ProductService = new Product()
export default ProductService
