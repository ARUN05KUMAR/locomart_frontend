import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../services/productService'
import VendorService from '../services/VendorService'
import productimg from '../assets/product.jpeg'
import ProductFeed from '../components/ui/ProductFeed'
import cartService from '../services/CartService'

const CategoryProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [categorizedProducts, setCategorizedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [vendor, setVendor] = useState(null)

    const cartId = localStorage.getItem('cartId')

    const handleAddToCart = async (productId) => {
        if (!cartId) {
            alert('Cart ID not found. Please log in or refresh the page.')
            return
        }
        try {
            await cartService.addItemToCart(cartId, productId, 1)
            alert('Product added to cart!')
        } catch (error) {
            console.error('Failed to add to cart', error)
            alert('Failed to add product to cart.')
        }
    }

    // Assuming you have a way to get customerId, e.g., from localStorage or context
    const customerId = localStorage.getItem('customerId')

    useEffect(() => {
        const fetchProductAndSimilar = async () => {
            try {
                const fetchedProduct = await ProductService.getProductById(id)
                setProduct(fetchedProduct)

                const allProducts = await ProductService.getAllProducts()
                const filtered = allProducts.filter(
                    (item) => item.type === fetchedProduct.type && item.id !== fetchedProduct.id
                )
                setCategorizedProducts(filtered)
            } catch (error) {
                console.error('Error fetching product data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductAndSimilar()
    }, [id])

    // Then fetch vendor once product is loaded
    useEffect(() => {
        const fetchVendorDetails = async () => {
            if (product && product.vendor_id) {
                try {
                    const vendorData = await VendorService.getVendorById(product.vendor_id)
                    setVendor(vendorData)
                } catch (error) {
                    console.error('Error fetching vendor data:', error)
                }
            }
        }

        fetchVendorDetails()
    }, [product])

    const vendorRating = (rating) => {
        const fullStars = Math.floor(rating)
        const halfStar = rating - fullStars >= 0.5
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} className="text-yellow-500">
                    ★
                </span>
            )
        }

        if (halfStar) {
            stars.push(
                <span key="half" className="text-yellow-500">
                    ☆
                </span>
            )
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="text-gray-300">
                    ☆
                </span>
            )
        }

        return (
            <div className="flex items-center space-x-1">
                {stars}
                <span className="ml-1 text-sm text-gray-600">({rating})</span>
            </div>
        )
    }

    return (
        <main className="px-4 md:px-20 py-8 bg-gray-50 min-h-screen text-gray-800 font-sans">
            {loading || !product ? (
                <p className="text-center text-lg font-medium animate-pulse">Loading products...</p>
            ) : (
                <>
                    {/* Product Main Info */}
                    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md p-6 mb-10">
                        <img
                            src={product.image_url}
                            alt="product"
                            className="w-full md:w-1/3 object-cover rounded-xl"
                        />
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                                <p className="text-sm text-gray-500 mb-1">
                                    <strong>Quantity:</strong> {product.quantity}
                                </p>
                                <p className="text-lg font-semibold text-green-600 mb-4">
                                    ₹{product.price}
                                </p>
                            </div>
                            <button
                                className="w-full md:w-1/2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
                        <h2 className="text-xl font-bold mb-2">Product Details</h2>
                        <p className="text-gray-700">
                            {product.description || 'No description available.'}
                        </p>
                    </div>

                    {/* Vendor Info */}
                    {vendor && (
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
                            <h2 className="text-xl font-bold mb-2">Vendor Details</h2>
                            <div className="flex items-center gap-2 mb-2">
                                <p className="text-lg font-semibold">{vendor.shop_name}</p>
                                {vendorRating(vendor.rating)}
                            </div>
                            <p className="text-sm text-gray-600">
                                Email: <strong>{vendor.email}</strong>
                            </p>
                            <p className="text-sm text-gray-600">
                                Phone Number: <strong>{vendor.phone_number}</strong>
                            </p>
                            <p className="text-sm text-gray-600">
                                Address: <strong>{vendor.address}</strong>
                            </p>
                            <p className="text-sm text-gray-600">
                                City: <strong>{vendor.city}</strong>
                            </p>
                        </div>
                    )}

                    {/* Related Products */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">More products in this category</h2>
                        <ProductFeed products={categorizedProducts} category={product.type} />
                    </div>
                </>
            )}
        </main>
    )
}

export default CategoryProduct
