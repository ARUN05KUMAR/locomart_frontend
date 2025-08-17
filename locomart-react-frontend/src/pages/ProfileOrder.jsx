import React, { useEffect, useState } from 'react'
import ProfileService from '../services/ProfileService'
import OrderCard from '../components/ui/OrderCard'

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ProfileService.getOrdersData()
                setOrders(data)
            } catch (err) {
                console.error('Error fetching orders:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    return (
        <div className="p-8 bg-gradient-to-b from-white via-gray-50 to-blue-50 rounded-xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">🛍️ Your Orders</h2>
                <span className="text-sm text-gray-500">
                    {loading ? 'Loading...' : `${orders.length} orders found`}
                </span>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                    <p className="text-gray-600 mt-4">Fetching your orders...</p>
                </div>
            ) : orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <img
                        src="https://illustrations.popsy.co/gray/shopping-bag.svg"
                        alt="No orders"
                        className="h-48 mb-6"
                    />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 max-w-md">
                        It looks like you haven’t placed any orders yet. Browse our collection and
                        treat yourself!
                    </p>
                </div>
            )}
        </div>
    )
}

export default OrdersPage
