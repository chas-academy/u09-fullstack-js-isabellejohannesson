import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormData = {
  userName: string;
  password: string;
};

const LoginView = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formData.userName,
            password: formData.password,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      <Navigate to={"/home"} />;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-9/12 mx-auto">
        <h2 className="text-center p-4 my-6 mx-auto font-heading font-bold text-primary text-3xl">
          Log in
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 max-w-md w-full my-2">
            <FaUser />
            <input
              type="text"
              name="userName"
              className="w-full text-center"
              placeholder="Choose a username"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 max-w-md w-full my-2">
            <FaLock />
            <input
              type="password"
              name="password"
              className="w-full text-center"
              placeholder="Input password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <div className="flex flex-row justify-end">
            <div className="flex flex-col">
              <button type="submit" className="btn btn-primary">
                {isPending ? "Loading..." : "Log in"}
              </button>
              {isError && <p className="text-red-600 py-4">{error.message}</p>}
            </div>
          </div>
        </form>
        <div className="flex flex-col py-6">
          <p className="text-sm font-sans font-semibold">
            Haven't signed up yet? Do it now!
          </p>
          <Link to="/signup" className="flex flex-col">
            <button className="btn btn-primary">Sign up</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginView;
