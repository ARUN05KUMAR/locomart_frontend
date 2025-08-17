import React, { useEffect, useState } from 'react'
import VendorService from '../services/VendorService1'
import { useNavigate } from 'react-router-dom'

const VendorPage = () => {
    const [filterStatus, setFilterStatus] = useState(null)
    const [totalProducts, setTotalProducts] = useState(0)
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [completedCount, setCompletedCount] = useState(0)
    const [pendingCount, setPendingCount] = useState(0)

    const shopname = localStorage.getItem('vendor_unique')

    const [vendorId, setVendorId] = useState(null)
    const [vendorName, setVendorName] = useState('')
    const [vendorImage, setVendorImage] = useState('')

    const navigate = useNavigate()

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        vendorId: null,
        stock: 10
    })

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login/vendor')
    }

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const vendor = await VendorService.getVendor(shopname)
                setVendorId(vendor.id)
                setVendorName(vendor.name)
                setVendorImage(vendor.image)
                setNewProduct(prev => ({ ...prev, vendorId: vendor.id }))
            } catch (err) {
                console.error('Error fetching vendor:', err)
            }
        }

        fetchVendor()
    }, [shopname])

    useEffect(() => {
        if (vendorId) {
            fetchProducts()
            fetchOrders()
        }
    }, [vendorId])

    const fetchProducts = async () => {
        try {
            const allProducts = await VendorService.getProductByVendor(vendorId)
            setProducts(allProducts)
            setTotalProducts(allProducts.length)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const fetchOrders = async () => {
        try {
            const allOrders = await VendorService.getOrderByVendor(vendorId)
            setOrders(allOrders)

            const confirmed = allOrders.filter(order => order.status === 'confirmed').length
            const pending = allOrders.filter(order => order.status === 'pending').length

            setCompletedCount(confirmed)
            setPendingCount(pending)
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleAddProduct = async () => {
        try {
            await VendorService.addProduct(newProduct)
            await fetchProducts()
            setNewProduct({ name: '', description: '', price: '', image: '', vendorId, stock: 10 })
        } catch (error) {
            console.error('Error adding product:', error)
        }
    }

    const stats = [
        {
            title: 'Total Products',
            value: totalProducts,
            icon: '🛒',
            bg: 'bg-teal-100',
            text: 'text-teal-800',
        },
        {
            title: 'Orders Completed',
            value: completedCount,
            icon: '✅',
            bg: 'bg-blue-100',
            text: 'text-blue-800',
        },
        {
            title: 'Pending Orders',
            value: pendingCount,
            icon: '🕒',
            bg: 'bg-orange-100',
            text: 'text-orange-800',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
                <h1 className="text-2xl font-bold">🛍 VENDOR</h1>
                <nav className="space-y-4">
                    <a href="#" className="block px-3 py-2 bg-gray-800 rounded">Dashboard</a>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-800 rounded">Add Product</a>
                    <div className="pt-2 border-t border-gray-700 space-y-2">
                        <button
                            onClick={() => setFilterStatus('pending')}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded"
                        >
                            Pending Orders
                        </button>
                        <button
                            onClick={() => setFilterStatus(null)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Order History
                        </button>
                    </div>
                    <div className="pt-2 border-t border-gray-700 space-y-2">
                        <a href="#" className="block px-3 py-2 hover:bg-gray-800 rounded">Profile</a>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">{vendorName}</span>
                        <img src={vendorImage || 'https://via.placeholder.com/40'} alt="vendor" className="w-10 h-10 object-cover rounded-full" />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className={`p-6 rounded-xl shadow ${stat.bg}`}>
                            <div className="text-2xl">{stat.icon}</div>
                            <div className={`text-xl font-semibold ${stat.text}`}>{stat.title}</div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Product and Add Form */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow space-y-4">
                        <h3 className="text-xl font-bold">My Products</h3>
                        <div className="flex justify-between gap-4">
                            <input type="text" placeholder="Search product..." className="w-full px-4 py-2 border rounded" />
                            <select className="px-4 py-2 border rounded">
                                <option>Category</option>
                            </select>
                        </div>
                        <table className="w-full mt-4 text-sm">
                            <thead className="text-left border-b">
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((prod, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="py-2">
                                            <img src={prod.image || 'https://via.placeholder.com/40'} alt="product" className="w-10 h-10 object-cover rounded" />
                                        </td>
                                        <td>{prod.name}</td>
                                        <td>${prod.price}.00</td>
                                        <td>
                                            <span className={`text-xs px-2 py-1 rounded-full ${prod.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {prod.stock}
                                            </span>
                                        </td>
                                        <td className="space-x-2">
                                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs">Edit</button>
                                            <button className="px-3 py-1 bg-red-500 text-white rounded text-xs">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow space-y-4">
                        <h3 className="text-xl font-bold">Add New Product</h3>
                        <input name="name" value={newProduct.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" placeholder="Product Name" />
                        <textarea name="description" value={newProduct.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
                        <input name="price" value={newProduct.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" placeholder="Price" />
                        <input name="image" value={newProduct.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" placeholder="Image URL" />
                        <button onClick={handleAddProduct} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                            Submit
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Orders</h3>
                            <button className="text-sm text-blue-600 hover:underline">Mark all as read</button>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="text-left border-b">
                                <tr>
                                    <th>OrderID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders
                                    .filter(order => !filterStatus || order.status === filterStatus)
                                    .map((order, i) => (
                                        <tr key={i} className="border-b">
                                            <td>{order.id}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className={order.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}>{order.status}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default VendorPage
