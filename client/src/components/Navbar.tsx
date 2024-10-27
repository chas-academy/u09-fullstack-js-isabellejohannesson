import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import User from "../types/User";

const Navbar = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating account:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
    },
  });
  const { data: authCheck } = useQuery<User>({ queryKey: ["authCheck"] });

  return (
    <>
      <nav className="bg-secondary text-base-content p-6 fixed bottom-0 w-full flex flex-row justify-evenly lg:flex-col lg:top-0 lg:left-0 lg:bottom-0 lg:w-20 lg:justify-start lg:items-center lg:py-10 lg:space-y-8">
        <Link to={"/"} className="link link:hover">
          <FaHome />
        </Link>
        <Link
          to={`/profile/${authCheck?.userName}`}
          className="link link:hover"
        >
          <FaUser />
        </Link>
        <Link to={"/search"} className="link link:hover">
          <FaSearch />
        </Link>
        <Link to={"/home"} className="link link:hover">
          <FaHeart />
        </Link>
        <Link to={"/notifications"} className="link link:hover">
          <FaBell />
        </Link>
        <Link to={"/suggested"}>
          <FaStar />
        </Link>
        <MdOutlineLogin
          className="w-5 h-5 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        />
      </nav>
    </>
  );
};

export default Navbar;
