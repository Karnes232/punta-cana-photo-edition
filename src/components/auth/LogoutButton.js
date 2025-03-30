import React from "react";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
const LogoutButton = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      className="flex justify-center items-center px-5 py-2 gap-4 border rounded-lg w-full max-w-4xl bg-white mt-5"
      onClick={logout}
    >
      <CiLogout /> Logout
    </button>
  );
};

export default LogoutButton;
