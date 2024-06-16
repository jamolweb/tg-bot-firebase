const OneProduct = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <div className="flex justify-center">
        <img
          src={product.imageUrl}
          className="w-full h-auto object-contain"
          alt={product.name}
        />
      </div>
      <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
      <button className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded">
        Shop
      </button>
    </div>
  );
};

export default OneProduct;
