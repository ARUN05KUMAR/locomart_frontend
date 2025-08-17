import axios from 'axios'

const CART_API_URL = 'http://localhost:8000/cart'

class CartService {
    async createNewCart(customerId) {
        const response = await axios.post(`${CART_API_URL}?customer_id=${customerId}`)
        return response.data
    }

    // Fetch cart data
    async getCartData(cartId) {
        const response = await axios.get(`${CART_API_URL}/${cartId}/products`)
        return response.data
    }

    async addItemToCart(cartId, productId, Quantity) {
        const body = {
            product_id: productId,
            quantity: Quantity,
        }
        const response = await axios.post(`${CART_API_URL}/${cartId}/add_product`, body)
        return response.data
    }

    // Update a cart item
    async updateCartItem(cartId, updatedItem) {
        const body = { quantity: updatedItem.quantity }
        const response = await axios.put(
            `${CART_API_URL}/${cartId}/update_product/${updatedItem.product_id}`,
            body
        )
        return response.data
    }

    // Remove an item from the cart
    async removeCartItem(cartId, productId) {
        const response = await axios.delete(`${CART_API_URL}/${cartId}/remove_product/${productId}`)
        return response.data
    }
}

const cartService = new CartService()
export default cartService
