import React, { useState, useEffect } from 'react'
import PaymentCard from '../components/ui/PaymentCard'
import ProfileService from '../services/ProfileService'

const PaymentsPage = () => {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentsData = await ProfileService.getPaymentsData()
                setPayments(paymentsData)
            } catch (error) {
                console.error('Failed to load payments:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPayments()
    }, [])

    return (
        <div className="p-8 bg-gradient-to-b from-white via-gray-50 to-indigo-50 rounded-xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">💳 Payment History</h2>
                <span className="text-sm text-gray-500">
                    {loading ? 'Loading...' : `${payments.length} payments found`}
                </span>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500"></div>
                    <p className="text-gray-600 mt-4">Fetching your payments...</p>
                </div>
            ) : payments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {payments.map((payment) => (
                        <PaymentCard key={payment.id} payment={payment} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <img
                        src="https://illustrations.popsy.co/gray/wallet.svg"
                        alt="No payments"
                        className="h-48 mb-6"
                    />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Payments Found</h3>
                    <p className="text-gray-500 max-w-md">
                        It looks like you haven't made any payments yet. Explore the platform to get
                        started.
                    </p>
                </div>
            )}
        </div>
    )
}

export default PaymentsPage
