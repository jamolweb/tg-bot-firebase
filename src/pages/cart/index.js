import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [allAmount, setAllAmount] = useState(0); // Initialize with 0 as a number

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems.map((item) => ({ ...item, quantity: 1 }))); // Initialize quantity property
    updateTotalAmount(storedCartItems);
  }, []);

  const updateTotalAmount = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setAllAmount(total);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    updateTotalAmount(updatedCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([])); // Set empty array as string
    setAllAmount(0); // Reset total amount
  };

  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    updateTotalAmount(updatedCartItems);
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    updateTotalAmount(updatedCartItems);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">
          Cart ($ {allAmount.toFixed(2)})
        </h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <div className="flex">
                        <p className="text-lg font-semibold">{item.name}</p>
                        <span className="text-yellow-700">
                          x{item.quantity}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-1 bg-gray-200 rounded-md w-5 h-5 text-center flex align-middle items-center justify-center"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <button
                          className="p-1 bg-gray-200 rounded-md w-5 h-5 text-center flex align-middle items-center justify-center"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={() =>
                  alert("Checkout functionality is in development.")
                }
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
