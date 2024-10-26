import PostSkeleton from "./skeletons/PostSkeleton.tsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

import type Post from "../types/Post.tsx";
import type User from "../types/User.tsx";

import OnePost from "./OnePost.tsx";

type FeedType = string;

interface PostProps {
  feedType: FeedType;
  userName?: User;
  _id?: Post;
}

const Posts = ({ feedType, userName, _id }: PostProps) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return `${import.meta.env.VITE_API_URL}/api/posts/all`;
      case "following":
        return `${import.meta.env.VITE_API_URL}/api/posts/following`;
      case "posts":
        return `${import.meta.env.VITE_API_URL}/api/posts/user/${userName}`;
      case "likes":
        return `${import.meta.env.VITE_API_URL}/api/posts/likes/${_id}`;
      default:
        return `${import.meta.env.VITE_API_URL}/api/posts/all`;
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error creating account:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, userName]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No banter here yet</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div className="flex flex-col justify-center">
          {posts.map((post: Post) => (
            <OnePost key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
