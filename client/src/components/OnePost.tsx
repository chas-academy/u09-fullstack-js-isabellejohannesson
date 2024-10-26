import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { FaRegComment, FaRegHeart, FaTrash, FaPen } from "react-icons/fa";

import { formatPostDate } from "../utils/formatPostDate";

import LoadingSpinner from "./LoadingSpinner";

import type Post from "../types/Post";
import type User from "../types/User";

interface PostProp {
  post: Post;
}

const OnePost = ({ post }: PostProp) => {
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");

  const { data: authCheck } = useQuery<User>({ queryKey: ["authCheck"] });

  const queryClient = useQueryClient();

  const postOwner = post.user;
  const isLiked = post.likes.includes(authCheck?._id ?? "Unknown");

  const isMyPost = authCheck?._id === post.user._id;

  const formattedDate = formatPostDate(post.createdAt ?? "Unknown");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(false);
    handleDeletePost();
  };

  // Delete Post
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${post._id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error deleting post:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); //Uppdatera state efter delete
    },
  });

  const handleDeletePost = () => {
    deletePost();
  };

  //Like post
  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/like/${post._id}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error liking post:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData: Post[]) => {
        return oldData.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  //Create comment
  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/comment/${post._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: comment }),
          }
        );
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
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlePostComment = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost();
  };

  //Edit comment text
  const { mutate: updateComment, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      commentId,
      text,
    }: {
      commentId: string;
      text: string;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${
          post._id
        }/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Comment edited successfully");
      setEditCommentId(null);
      setEditCommentText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateComment = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isUpdating) return;

    if (!editCommentId || !editCommentText) {
      toast.error("Invalid comment data");
      return;
    }

    updateComment({ commentId: editCommentId, text: editCommentText });
  };

  const { mutate: deleteComment, isPending: isDeletingComment } = useMutation({
    mutationFn: async (commentId: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${
          post._id
        }/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteComment = (commentId: string) => {
    if (isDeletingComment) return;

    if (!commentId) {
      toast.error("Comment not found");
      return;
    }

    deleteComment(commentId);
  };

  return (
    <>
      <div className="wrapper flex flex-col justify-center overflow-y-auto max-w-2xl p-4">
        <div className="avatar pt-2">
          <Link
            to={`/profile/${postOwner.userName}`}
            className="w-8 h-8 rounded-full overflow-hidden"
          >
            <img src={postOwner.profileImg || "/Placeholder_avatar.png"} />
          </Link>
          <div className="user-info flex flex-col pl-2">
            <Link
              to={`/profile/${postOwner.userName}`}
              className="font-bold px-1 text-primary text-sm"
            >
              {postOwner.fullName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.userName}`}>
                @{postOwner.userName}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4">
          <div className="flex gap-2 items-center px-2">
            {isMyPost && (
              <span className="flex justify-end ml-auto">
                {!isDeleting && (
                  <>
                    <FaTrash
                      className="cursor-pointer hover:text-red-500 focus:text-red"
                      onClick={handleDeleteConfirmation}
                    />

                    {showConfirmModal && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                          <h3 className="text-lg font-bold">
                            Bekräfta borttagning
                          </h3>
                          <p>Är du säker på att du vill ta bort inlägget?</p>
                          <div className="flex justify-end mt-4 space-x-2">
                            <button
                              className="btn btn-secondary"
                              onClick={() => setShowConfirmModal(false)}
                            >
                              Avbryt
                            </button>
                            <button
                              className="btn btn-error"
                              onClick={handleConfirmDelete}
                            >
                              Ta bort
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="post-container flex flex-col">
            <span className="px-2 text-sm">{post.text}</span>
            {post.img && (
              <div className="flex img-container max-w-fit p-4 rounded-lg justify-center">
                <img
                  src={post.img}
                  alt={`${post.user.userName}'s post picture`}
                  className="max-w-full md:max-w-lg max-h-96 object-contain rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>
          {/* Likes and comments divider */}
          <div className="likes-comments-wrapper border-b-2 border-secondary h-full mx-4 py-2"></div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-2 items-center justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() => {
                  const modal = document.getElementById(
                    "comments_modal" + post._id
                  );
                  if (modal) {
                    (modal as HTMLDialogElement).showModal();
                  }
                }}
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>

              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-accent">
                  <h3 className="font-heading text-primary text-lg mb-4">
                    Comments
                  </h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-primary">
                        No comments yet, start bantering!
                      </p>
                    )}
                    {post.comments.map((comment) => {
                      const isMyComment =
                        authCheck?.userName === comment.user.userName;
                      console.log(authCheck?._id, comment.user.userName);
                      return (
                        <div
                          key={comment._id}
                          className="flex gap-2 items-start"
                        >
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <img
                                src={
                                  comment.user.profileImg ||
                                  "/Placeholder_avatar.png"
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-bold">
                                {comment.user.fullName}
                              </span>
                              <span className="text-gray-700 text-sm">
                                @{comment.user.userName}
                              </span>
                            </div>
                            <div className="text-sm flex flex-row">
                              {comment.text}
                              {isMyComment && (
                                <>
                                  <div>
                                    <FaTrash
                                      onClick={() => {
                                        handleDeleteComment(comment._id);
                                      }}
                                    />

                                    <FaPen
                                      className="flex flex-col ml-0 space-y-4 cursor-pointer"
                                      onClick={() => {
                                        setEditCommentId(comment._id);
                                        setEditCommentText(comment.text);
                                        const modal = document.getElementById(
                                          "commentOwner_modal" + comment._id
                                        );
                                        if (modal) {
                                          (
                                            modal as HTMLDialogElement
                                          ).showModal();
                                        }
                                      }}
                                    />
                                  </div>
                                  <dialog
                                    id={`commentOwner_modal${comment._id}`}
                                  >
                                    <form
                                      className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                                      onSubmit={handleUpdateComment}
                                    >
                                      <textarea
                                        className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800"
                                        placeholder="Edit your comment..."
                                        value={editCommentText}
                                        onChange={(e) =>
                                          setEditCommentText(e.target.value)
                                        }
                                      />
                                      <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                                        {isUpdating ? (
                                          <LoadingSpinner size="md" />
                                        ) : (
                                          "Save"
                                        )}
                                      </button>
                                    </form>
                                  </dialog>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog>

              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {isLiking && <LoadingSpinner size="sm" />}
                {!isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}

                <span
                  className={`text-sm  group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-secondary h-full mx-4 py-2"></div>
      </div>
    </>
  );
};

export default OnePost;
