import React from "react";
import { FaUser } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <FaUser className="text-2xl" />
      <HiOutlineHome className="text-2xl" />
      <FaShoppingCart className="text-2xl" />
    </div>
  );
}
