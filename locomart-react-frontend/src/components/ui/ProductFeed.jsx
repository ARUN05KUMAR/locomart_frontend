import React from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const ProductFeed = ({ products, category }) => {
    return (
        <div className="my-6 py-2 bg-slate-200 rounded-xl">
            <div className="border-b-2 border-blue-200 mb-4 border-opacity-50">
                <div className="flex justify-between items-center rounded-xl px-6">
                    <h2 className="productCategory text-slate-gray text-3xl underline underline-offset-4 font-bold my-4 mx-2 capitalize">
                        {category}
                    </h2>
                    {products.length > 5 && (
                        <h2 className="seeAll">
                            <Link to={`/product/category/${category}`}>See All &rarr;</Link>
                        </h2>
                    )}
                </div>
            </div>

            <ul className="flex flex-row space-x-6 overflow-x-auto scrollbar-hide px-6">
                {products.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductFeed
