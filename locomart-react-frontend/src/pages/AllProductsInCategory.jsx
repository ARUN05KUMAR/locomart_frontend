import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductService from '../services/productService';
import Loader from '../components/ui/Loader';
import ProductCard from '../components/ui/ProductCard';

const AllProductsInCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await ProductService.getAllProducts();
        setProducts(fetchedProducts);
        console.log("Fetched products:", fetchedProducts);
        console.log("Route category:", category);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [category]);

  // Frontend filtering by type (case-insensitive, whitespace trimmed)
  const groupedProducts = products.filter((product) => {
    const productType = (product.type || '').trim().toLowerCase();
    const routeCategory = (category || '').trim().toLowerCase();
    return productType === routeCategory;
  });

  // Optional: To help with debugging, show available categories
  const allCategories = [...new Set(products.map((p) => p.type))];

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
          {category} Products
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : groupedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg">
              No products found in <span className="font-semibold">{category}</span> category.
            </p>

            <p className="mt-4 text-sm">Available categories:</p>
            <ul className="text-sm text-gray-600 mt-2">
              {allCategories.map((cat, index) => (
                <li key={index}>• {cat}</li>
              ))}
            </ul>

            <Link
              to="/"
              className="mt-6 inline-block text-blue-600 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllProductsInCategory;
