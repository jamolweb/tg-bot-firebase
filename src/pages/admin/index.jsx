import { useRecoilState } from "recoil";
import isAdminState from "@/atoms/isAdmin";
import ProductForm from "@/components/ProductForm";
import ProductFormEdit from "@/components/ProductFormEdit";
import ProductList from "@/components/ProductList";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin, adminPassword } from "@/dotenv";

Modal.setAppElement("#__next"); // For accessibility

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const login = () => {
    if (username === adminLogin && password === adminPassword) {
      setIsAdmin(true);
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const addProduct = async (product) => {
    try {
      const { name, description, image, price } = product;
      const docRef = await db.collection("products").add({
        name,
        description,
        price: parseFloat(price),
      });

      if (image) {
        const imageRef = ref(
          storage,
          `product_images/${docRef.id}/${image.name}`
        );
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "products", docRef.id), { image: imageUrl });
      }

      toast.success("Product added successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const productDoc = doc(db, "products", productId);
      const productData = (await productDoc.get()).data();

      if (productData.image) {
        const imageRef = ref(storage, productData.image);
        await deleteObject(imageRef);
      }

      await deleteDoc(productDoc);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      const productDoc = doc(db, "products", productId);
      const currentProductRef = await productDoc.get();
      const currentProductData = currentProductRef.data();

      if (
        updatedProduct.imageUrl &&
        updatedProduct.imageUrl !== currentProductData.image
      ) {
        const oldImageRef = ref(storage, currentProductData.image);
        await deleteObject(oldImageRef);

        const imageRef = ref(
          storage,
          `products/${productId}/${updatedProduct.imageUrl.name}`
        );
        await uploadBytes(imageRef, updatedProduct.imageUrl);
        const imageUrl = await getDownloadURL(imageRef);
        updatedProduct.imageUrl = imageUrl;
      }

      await updateDoc(productDoc, updatedProduct);

      toast.success("Product updated successfully");
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const openModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md border-2 border-gray-300 mb-2 focus:outline-none"
          />
          <button
            onClick={login}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <ProductForm addProduct={addProduct} />
      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        openModal={openModal}
      />
      {isModalOpen && currentProduct && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Product"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <ProductFormEdit
            product={currentProduct}
            saveProduct={updateProduct}
          />
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
