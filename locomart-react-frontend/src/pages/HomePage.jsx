import React, { useEffect, useState } from "react";
import ProductFeed from "../components/ui/ProductFeed";
import ProductService from "../services/productService";
import Loader from "../components/ui/Loader";
import { useSelector } from "react-redux"; // <-- Add this

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = useSelector((state) => state.search.query); // <-- Get query from Redux

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await ProductService.getAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    getProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered products by type
  const groupedProducts =
    filteredProducts.length > 0
      ? filteredProducts.reduce((acc, product) => {
          if (!acc[product.type]) {
            acc[product.type] = [];
          }
          acc[product.type].push(product);
          return acc;
        }, {})
      : {};

  return (
    <main>
      <div className="max-w-[1200px] mx-auto mt-6">
        <h1 className="text-4xl font-bold text-black">Home</h1>

        {loading ? (
          <Loader />
        ) : Object.keys(groupedProducts).length > 0 ? (
          Object.keys(groupedProducts).map((category) => (
            <ProductFeed
              key={category}
              products={groupedProducts[category]}
              category={category}
            />
          ))
        ) : (
          <p className="mt-6 text-lg text-gray-600">No products found.</p>
        )}
      </div>
    </main>
  );
};

export default HomePage;
