import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCamera, FaImages } from "react-icons/fa";
import toast from "react-hot-toast";
import Post from "../types/Post";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    text: "",
    img: "",
  });
  const [isUrl, setIsUrl] = useState(true);
  const [img, setImg] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const { data: authCheck } = useQuery({ queryKey: ["authCheck"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newPost: { text: string; img: string }) => {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
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
    <div className="post-container bg-white mb-6 mt-4 rounded-lg max-w-xl w-full mx-auto px-4 my-4">
      <div className="flex flex-row">
        <div className="flex flex-col justify-center align-middle">
          <img
            src={authCheck?.profileImg || "../default-avatar.png"}
            alt="User's profile"
            className="w-10 h-10 rounded-full mr-2 mb-2"
            onClick={() => {
              setImg(null);
              if (imgRef.current) {
                imgRef.current.value = "";
              }
            }}
          />
          <div className="border-l border-secondary h-full mx-6 py-4 ml-4"></div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm">{authCheck?.name || "User Name"}</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="textarea-ghost"
              aria-label="Create post"
              name="text"
              placeholder="What's new?"
              value={formData.text}
              onChange={handleInputChange}
            ></textarea>

            <label>
              Image URL (optional):
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

            <label>
              Upload or Take a Photo:
              <input
                type="file"
                accept="image/*"
                ref={imgRef}
                onChange={handleImgChange}
              />
            </label>

            <div className="flex flex-row space-x-2">
              <button className="ghost">
                <FaImages />
              </button>
              <button className="ghost">
                <FaCamera />
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-full btn-sm text-white px-4"
              >
                {isLoading ? "Posting..." : "Post"}
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
