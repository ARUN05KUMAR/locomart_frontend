import React from 'react'
import cartService from '../../services/CartService'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
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

    return (
        <div className="relative w-full max-w-72 max-h-72 overflow-hidden rounded-lg bg-gray-100 shadow-md">
            <Link to={`/product/${product.id}`}>
                <img
                    className="h-32 rounded-t-lg object-cover w-full"
                    src={product.image_url}
                    alt="product"
                />
            </Link>

            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                {product.quantity}
            </span>

            <div className="mt-2 px-5 pb-5">
                <h5 className="text-md font-semibold tracking-wider text-slate-800">
                    {product.name.length > 16 ? product.name.slice(0, 12) + '...' : product.name}
                </h5>

                <div className="mt-2.5 mb-3 flex items-center">
                    <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-semibold">
                        5.0
                    </span>
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <span className="text-xl font-bold text-slate-900">₹{product.price}</span>
                        <span className="text-sm text-slate-900 line-through">$299</span>
                    </div>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition duration-300 shadow-md"
                        onClick={() => handleAddToCart(product.id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h14l1-5H6.4M7 13L5.4 6H3m4 7v7m6-7v7m6-7v7"
                            />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
