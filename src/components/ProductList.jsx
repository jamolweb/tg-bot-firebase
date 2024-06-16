import React from "react";

const ProductList = ({ products, deleteProduct }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <div>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete
              </button>
              {/* Add Edit button and functionality */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
