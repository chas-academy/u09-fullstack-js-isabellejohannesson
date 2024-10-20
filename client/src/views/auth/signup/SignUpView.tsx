import { FaUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
/* import { FaRepeat } from "react-icons/fa6"; */

const SignUpView = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-9/12 mx-auto">
        <h2 className="text-center p-4 my-6 mx-auto font-bold text-lg">
          Sign up
        </h2>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <FaUser />
          <input
            type="text"
            className="w-full text-center"
            placeholder="Choose a username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <FaPencilAlt />
          <input
            type="text"
            className="w-full text-center"
            placeholder="Input your full name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <MdEmail />
          <input
            type="text"
            className="w-full text-center"
            placeholder="banterly@email.com"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <FaLock />
          <input
            type="text"
            className="w-full text-center"
            placeholder="Password must be at least 6 characters long"
          />
        </label>
        {/*  <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <FaRepeat />
          <input
            type="text"
            className="w-full text-center"
            placeholder="Repeat password"
          />
        </label> */}
      </div>
    </>
  );
};

export default SignUpView;
