import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCamera, FaImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Post from "../types/Post";
import User from "../types/User";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    text: "",
    img: "",
  });
  const [isUrl, setIsUrl] = useState(true);
  const [img, setImg] = useState<string | null>(null);

  const imgRef = useRef<HTMLInputElement>(null);

  const { data: authCheck } = useQuery<User>({ queryKey: ["authCheck"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newPost: { text: string; img: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newPost),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      return response.json();
    },
    onSuccess: (data: Post) => {
      console.log("Post created successfully:", data);
      setFormData({ ...formData, text: "" });
      setImg(null);
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error creating post:", error.message);
      toast.error("Error creating post");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postImg = isUrl ? formData.img : img;
    const newPost = {
      text: formData.text,
      img: postImg || "",
    };

    createPost(newPost);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
        setIsUrl(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center overflow-y-auto px-4 my-4">
      <div className="flex flex-row">
        <div className="flex flex-col justify-center align-middle">
          <img
            src={authCheck?.profileImg || "../Placeholder_avatar.png"}
            alt={`${authCheck?.userName}` + "'s profile image"}
            className="w-10 h-10 rounded-full mr-2 mb-2"
          />
          <div className="border-l border-secondary h-full mx-6 py-4 ml-4"></div>
        </div>
        <div className="flex flex-col">
          <Link
            to={`/profile/${authCheck?.userName}`}
            className="font-bold px-1 text-primary text-sm"
          >
            {authCheck?.fullName}
          </Link>
          <span className="text-gray-700 flex gap-1 text-sm">
            <Link to={`/profile/${authCheck?.userName}`}>
              @{authCheck?.userName}
            </Link>
          </span>
          <form onSubmit={handleSubmit} className="flex flex-col py-4">
            <textarea
              className="textarea w-full p-0 mb-4 text-pretty resize-none border-none focus:outline-none"
              aria-label="Create post"
              name="text"
              placeholder="What's new?"
              value={formData.text}
              onChange={handleInputChange}
            ></textarea>

            <label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={(e) => {
                  handleInputChange(e);
                  if (e.target.value) setIsUrl(true);
                }}
                placeholder="Paste image URL here"
              />
            </label>
            {img && (
              <div className="relative w-72 mx-auto">
                <IoCloseSharp
                  className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setImg(null);
                    if (imgRef.current) {
                      imgRef.current.value = "";
                    }
                  }}
                />
                <img
                  src={img}
                  className="w-full mx-auto h-72 object-contain rounded"
                />
              </div>
            )}
            <label>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imgRef}
                onChange={handleImgChange}
              />
            </label>

            <div className="flex flex-row space-x-2">
              <button
                type="button"
                aria-label="choose images"
                className="ghost"
                onClick={() => {
                  if (imgRef.current) {
                    imgRef.current.click();
                  }
                }}
              >
                <FaImages />
              </button>
              <button aria-label="use camera" className="ghost" type="button">
                <FaCamera />
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-full btn-sm text-white px-4"
              >
                {isPending ? "Loading..." : "Post"}
              </button>
            </div>
            {isError && (
              <div className="text-red-500">Error: {error?.message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
