import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the path as per your Firebase setup
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState("Loading... ");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productRef = doc(db, "products", id);
          const docSnap = await getDoc(productRef);
          if (docSnap.exists()) {
            setProduct(docSnap.data());
          } else {
            setLoading("Product not found.")
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Fetch product whenever `id` changes

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto bg-white p-8 shadow-md rounded-lg">
        {product ? (
          <>
            <h1 className="text-3xl font-bold mt-4">Product ID: {id}</h1>
            <p className="mt-4">Product Name: {product.name}</p>
            <p className="mt-2">Price: ${product.price}</p>
          </>
        ) : (
          <p className="text-xl mt-4">{loading}</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
