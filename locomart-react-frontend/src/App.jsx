import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import './index.css'
import HomePage from './pages/HomePage'
import CategoryProduct from './pages/CategoryProduct'
import Layout from './components/ui/Layout'
import Toast from './components/ui/Toast'
import AllProductsInCategory from './pages/AllProductsInCategory'
import OrdersPage from './pages/ProfileOrder'
import PaymentsPage from './pages/ProfilePayment'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import VendorPage from './pages/VendorPage'
import ProtectedRoutes from '@/components/ProtectedRoutes.jsx'
import LoginVendor from '@/components/auth/LoginVendor'
import LoginCustomer from '@/components/auth/LoginCustomer'
import RegisterCustomer from '@/components/auth/RegisterCustomer'
import RegisterVendor from '@/components/auth/RegisterVendor'

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* Public (no Layout) */}
                    <Route path="/login/customer" element={<LoginCustomer />} />
                    <Route path="/login/vendor" element={<LoginVendor />} />
                    <Route path="/register/customer" element={<RegisterCustomer />} />
                    <Route path="/register/vendor" element={<RegisterVendor />} />

                    {/* Protected / App routes */}
                    <Route
                        element={
                            <ProtectedRoutes>
                                <Layout />
                            </ProtectedRoutes>
                        }
                    >
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<CategoryProduct />} />
                        <Route path="/product/category/:cat" element={<AllProductsInCategory />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/orders" element={<OrdersPage />} />
                        <Route path="/profile/payments" element={<PaymentsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/vendor" element={<VendorPage />} />
                    </Route>
                </Routes>
                <Toast />
            </Router>
        </Provider>
    )
}

export default App
