import React, { useEffect, useState } from 'react'
import ProductService from '../../services/productService'

const CartCard = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const [currentItem, setCurrentItem] = useState(null)

    useEffect(() => {
        if (quantity !== item.quantity) {
            onUpdateQuantity({ ...item, quantity })
        }
    }, [quantity])

    useEffect(() => {
        const fetchItem = async () => {
            const data = await ProductService.getProductById(item.product_id)
            setCurrentItem(data)
        }
        fetchItem()
    }, [item.product_id])

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
        }
    }

    // Handle remove item click
    const handleRemoveClick = () => {
        onRemoveItem(item.product_id) // Remove item from cart using its ID
    }

    // Increment quantity
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    // Decrement quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1)
        }
    }

    if (!currentItem) {
        return <div className="cart-card">Loading...</div>
    } else {
        return (
            <div className="cart-card flex flex-col md:flex-row justify-between items-center gap-6 p-4 bg-white rounded-xl shadow-md border">
                <div className="cart-card-details w-full md:w-2/3 space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800">{currentItem.name}</h3>
                    <p className="text-gray-600">
                        Category: <span className="font-medium">{currentItem.type}</span>
                    </p>
                    <p className="text-gray-600">Price per unit: ₹{currentItem.price}</p>
                    <p className="text-gray-800 font-semibold">
                        Total: ₹{currentItem.price * quantity}
                    </p>
                </div>

                <div className="cart-card-actions flex flex-col md:flex-row items-center gap-4">
                    <div className="quantity-control flex items-center gap-2">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={decrementQuantity}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                        />
                        <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="remove-item-btn text-red-600 hover:text-red-800 font-medium"
                        onClick={handleRemoveClick}
                    >
                        Remove
                    </button>
                </div>
            </div>
        )
    }
}

export default CartCard
