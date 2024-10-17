import { POSTS } from "../utils/mockdb/mockPosts.tsx";
import PostSkeleton from "./skeletons/PostSkeleton.tsx";
import Post from "../types/post.tsx";

const Posts = () => {
  const isLoading: boolean = false;

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && POSTS?.length === 0 && (
        <p className="text-center my-4">No posts here yet!</p>
      )}
      {!isLoading && POSTS && (
        <div className="flex flex-col justify-center overflow-y-auto h-screen px-4">
          {POSTS.map((post: Post) => (
            <div
              key={post._id}
              className="post-container bg-white p-a mb-6 rounded-lg shadow-md max-w-xl w-full mx-auto"
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={post.user.profileImg || "../Placeholder_avatar.png"}
                    alt={`${post.user.userName}'s profile`}
                  />
                </div>
                <h2 className="font-bold text-sm px-2">{post.user.userName}</h2>
              </div>
              <p className="p-4">{post.text}</p>
              <div className="max-w-fit p-4 rounded-lg">
                <img
                  src={post.img}
                  alt={`${post.user.userName}'s post picture`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
