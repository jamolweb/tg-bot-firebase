import React, { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const ProductFormEdit = ({ productId, closeModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "products", productId);
        const productSnap = await getDoc(productDoc);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          setCurrentImageUrl(productData.imageUrl);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productDoc = doc(db, "products", productId);
      let imageUrl = currentImageUrl;

      // If a new image is uploaded, handle the image upload and deletion of the old image
      if (image) {
        if (currentImageUrl) {
          const oldImageRef = ref(storage, currentImageUrl);
          await deleteObject(oldImageRef);
        }

        const storageRef = ref(storage, `product_images/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Update product details in Firestore
      const updatedProductData = {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
      };

      await updateDoc(productDoc, updatedProductData);

      alert("Product updated successfully!");
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating product: ", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          required
        />
        <textarea
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
        />
        {currentImageUrl && (
          <img src={currentImageUrl} alt="Current Product" className="mb-2" />
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductFormEdit;
