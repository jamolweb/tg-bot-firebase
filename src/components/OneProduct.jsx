import { useRouter } from "next/router";

const OneProduct = ({ product }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <div className="flex justify-center">
        <img
          src={product.imageUrl}
          className="w-full object-contain min-h-16 h-24"
          alt={product.name}
        />
      </div>
      <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
      <button
        onClick={() => router.push(`/products/${product.id}`)}
        className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded cursor-pointer"
      >
        Shop
      </button>
    </div>
  );
};

export default OneProduct;
