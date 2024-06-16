import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import Product from "@/models/Product";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  // Function to fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = db.collection("products");
      const snapshot = await productsCollection.get();
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add a new product
  const addProduct = async (product) => {
    try {
      const { name, description, image, price } = product;
      await db.collection("products").add({
        name,
        description,
        image,
        price: parseFloat(price), // Convert price to number if necessary
      });
      console.log("Product added successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      await db.collection("products").doc(productId).delete();
      console.log("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <ProductList products={products} deleteProduct={deleteProduct} />
      <ProductForm addProduct={addProduct} />
    </div>
  );
};

export default AdminDashboard;
