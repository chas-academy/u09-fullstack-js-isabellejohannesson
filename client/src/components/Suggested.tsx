import FollowSkeleton from "./skeletons/PostSkeleton.tsx";
import LoadingSpinner from "./loadingSpinner.tsx";

import useFollow from "../hooks/useFollow.tsx";
import User from "../types/User.tsx";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Suggested = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
  });
  const { follow, isPending } = useFollow();

  if (suggestedUsers?.length === 0) return <div className="md:w-64 w-0"></div>;

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <FollowSkeleton />
          <FollowSkeleton />
        </div>
      )}

      {!isLoading && suggestedUsers && (
        <div className="flex flex-col justify-center overflow-y-auto px-4 my-4">
          {suggestedUsers.map((user: User) => (
            <Link
              to={`/profile/${user.userName}`}
              className="flex items-center justify-between gap-4"
              key={user._id}
            >
              <div className="flex gap-2 items-center">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={user.profileImg || "/Placeholder_avatar.png"} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight truncate w-28">
                    {user.fullName}
                  </span>
                  <span className="text-sm text-slate-500">
                    @{user.userName}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    follow(user._id);
                  }}
                >
                  {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Suggested;
