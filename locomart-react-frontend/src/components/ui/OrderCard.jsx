import React, { useState } from 'react'
import ProfileService from '../../services/ProfileService'

const OrderCard = ({ order }) => {
    const [orderStatus, setOrderStatus] = useState(order.status)

    const handleStatusChange = async (status) => {
        try {
            const updatedOrder = { ...order, status }
            await ProfileService.updateOrder(updatedOrder)
            setOrderStatus(status)
            console.log(`Order status updated to ${status}`)
        } catch (error) {
            console.error('Failed to update order status:', error)
        }
    }

    return (
        <div className="order-card">
            <div className="order-details">
                <h4>{order.item}</h4>
                <p>{order.date}</p>
            </div>
            <div className={`order-status ${orderStatus.toLowerCase().replaceAll(' ', '-')}`}>
                {orderStatus}
            </div>
            <button onClick={() => handleStatusChange('Delivered')}>Mark as Delivered</button>
        </div>
    )
}

export default OrderCard
