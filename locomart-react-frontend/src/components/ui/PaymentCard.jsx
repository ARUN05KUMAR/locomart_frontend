import React from 'react'

const PaymentCard = ({ payment }) => {
    return (
        <div className="payment-card">
            <h4>Payment ID: {payment.id}</h4>
            <p>Method: {payment.method}</p>
            <p>Amount: ₹{payment.amount}</p>
            <p>Date: {payment.date}</p>
        </div>
    )
}

export default PaymentCard
