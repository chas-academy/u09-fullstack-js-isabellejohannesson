import { POSTS } from "../utils/mockdb/mockPosts.tsx";
import PostSkeleton from "./skeletons/PostSkeleton.tsx";
import Post from "../types/Post.tsx";

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
        <div className="flex flex-col justify-center overflow-y-auto px-4 my-4">
          {POSTS.map((post: Post) => (
            <div
              key={post._id}
              className="post-container bg-white mb-6 rounded-lg shadow-md max-w-xl w-full mx-auto"
            >
              <div className="avatar mx-4">
                <div className="w-12 rounded-full">
                  <img
                    src={post.user.profileImg || "../Placeholder_avatar.png"}
                    alt={`${post.user.userName}'s profile`}
                  />
                </div>
                <h2 className="font-bold text-sm px-2 text-center">
                  {post.user.userName}
                </h2>
              </div>
              <p className="p-4">{post.text}</p>
              <div className="max-w-fit p-4 rounded-lg">
                <img
                  src={post.img}
                  alt={`${post.user.userName}'s post picture`}
                />
              </div>
              <div className="border-b border-secondary w-full my-4"></div>
              <div className="mt-4 mx-4">
                <h3 className="text-sm font-bold mb-2">Comments</h3>
                {post.comments.map((comment) => (
                  <div key={comment._id} className="flex items-start mb-2">
                    <img
                      src={
                        comment.user.profileImg || "../Placeholder_avatar.png"
                      }
                      alt={`${comment.user.userName}'s profile`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <h4 className="text-xs font-semibold">
                        {comment.user.userName}
                      </h4>
                      <p className="text-xs">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
