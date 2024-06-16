import React from "react";

const ProductList = ({ products, deleteProduct, openModal }) => {
  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 border border-gray-300 rounded mb-2 flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 object-contain"
            />
            <p>${product.price}</p>
          </div>
          <div>
            <button
              onClick={() => openModal(product)}
              className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteProduct(product.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
