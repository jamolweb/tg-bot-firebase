import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the path as per your Firebase setup
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState("Loading...");
  const [quantity, setQuantity] = useState(1); // State for quantity
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
            setLoading("Product not found.");
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Fetch product whenever `id` changes

  const handleAddToCart = () => {
    try {
      const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

      const existingCartItem = existingCartItems.find((item) => item.id == id);

      if (existingCartItem) {
        alert("This product already added to cart");
      } else {
        existingCartItems.push({
          id,
          name: product.name,
          imageUrl: product.imageUrl,
          description: product.description,
          price: product.price,
          quantity,
        });
        const addProductToCart = (data) => {
          localStorage.setItem("cart", JSON.stringify(data));
          alert("Product added to cart...");
        };
        addProductToCart(existingCartItems);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-8">
        {product ? (
          <div className="max-w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mx-auto"
            />
            <h1 className="text-2xl text-center font-bold mt-4">
              {product.name}
            </h1>
            <p className="text-center text-gray-700">{product.description}</p>
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-md"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xl mt-4">{loading}</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
