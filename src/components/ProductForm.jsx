import React, { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image file

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image file to Firebase Storage
      const storageRef = ref(storage, `product_images/${image.name}`);
      await uploadBytes(storageRef, image);

      // Get image download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Add product details to Firestore
      const productData = {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
      };
      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", docRef.id);

      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
