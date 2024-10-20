import { FaUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpView = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError: boolean = true;

  const passwordsMatch =
    formData.password === formData.repeatPassword &&
    formData.repeatPassword !== "";

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-9/12 mx-auto">
        <h2 className="text-center p-4 my-6 mx-auto font-bold text-lg">
          Sign up
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
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
          <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
            <FaPencilAlt />
            <input
              type="text"
              name="fullName"
              className="w-full text-center"
              placeholder="Input your full name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
            <MdEmail />
            <input
              type="text"
              name="email"
              className="w-full text-center"
              placeholder="banterly@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
            <FaLock />
            <input
              type="password"
              name="password"
              className="w-full text-center"
              placeholder="Password must be at least 6 characters long"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          {formData.password.length < 6 && formData.password !== "" && (
            <p className="text-red-600">
              Password must be at least 6 characters
            </p>
          )}
          <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
            <FaRepeat />
            <input
              type="password"
              name="repeatPassword"
              className="w-full text-center"
              placeholder="Repeat password"
              value={formData.repeatPassword}
              onChange={handleInputChange}
            />
          </label>
          {formData.password && formData.repeatPassword && !passwordsMatch && (
            <p className="text-red-600">Passwords do not match</p>
          )}
          <div className="flex flex-row justify-end">
            <div className="flex flex-col">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!passwordsMatch || formData.password.length < 6}
              >
                Sign up!
              </button>
              {isError && (
                <p className="text-red-600 py-4">
                  Something went wrong, please try again
                </p>
              )}
            </div>
          </div>
        </form>
        <div className="flex flex-col py-6">
          <p className="text-sm">Already have an account?</p>
          <Link to="/login" className="flex flex-col">
            <button className="btn btn-primary">Log in</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpView;
