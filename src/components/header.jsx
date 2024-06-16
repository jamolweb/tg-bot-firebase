// components/Header.jsx

import React from "react";
import { FaUser } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <FaUser
        onClick={() => router.push("/me")}
        className="text-2xl cursor-pointer"
      />
      <HiOutlineHome
        onClick={() => router.push("/")}
        className="text-2xl cursor-pointer"
      />
      <FaShoppingCart
        onClick={() => router.push("/cart")}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
};

export default Header;
