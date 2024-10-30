import Posts from "../../components/Posts";
import EditProfileModal from "./editProfileModal";
import ProfileSkeleton from "../../components/skeletons/PostSkeleton";
import { formatMemberSinceDate } from "../../utils/formatPostDate";

import type User from "../../types/User";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import toast from "react-hot-toast";

const ProfileView = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [feedType, setFeedType] = useState("posts");

  const profileImgRef = useRef(null);

  const { userName } = useParams();
  console.log("username from params:", userName); //Returneras

  const { follow, isPending } = useFollow();
  const { data: authCheck } = useQuery<User>({ queryKey: ["authCheck"] });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/profile/${userName}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log("Från profile-fetch: ", data);
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data || null;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error in profile-view:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    enabled: !!userName,
  });

  const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();
  const isMyProfile = authCheck?._id === user?._id;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const amIFollowing = authCheck?.following.includes(user?._id);

  const handleImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (state === "profileImg") {
          setProfileImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [userName, refetch]);

  return (
    <div className="flex flex-col justify-center overflow-y-auto px-4 my-4">
      {(isLoading || isRefetching) && <ProfileSkeleton />}
      {!isLoading && !isRefetching && !user && (
        <p className="text-sm text-red-600 font-bold mt-4 text-center">
          User not found
        </p>
      )}

      <div className="max-w-3xl mx-auto p-4">
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          {/* User Information */}
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {user?.fullName}
            </h1>
            <p className="text-sm text-gray-500">
              @{user?.userName.toLowerCase()}
            </p>
            {user?.bio && (
              <p className="text-sm mt-1 text-secondary">{user?.bio}</p>
            )}

            <div className="flex mt-4 space-x-6 text-sm text-primary">
              <div>
                <span className="font-semibold">{user?.followers.length}</span>{" "}
                Followers
              </div>
              <div>
                <span className="font-semibold">{user?.following.length}</span>{" "}
                Following
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {/*profileImg and Edit Button */}
        <div className="flex flex-col items-center">
          <img
            src={user.profileImg}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-300"
          />

          {isMyProfile && authCheck && (
            <EditProfileModal authCheck={authCheck} />
          )}
          {!isMyProfile && (
            <button
              className="btn btn-outline rounded-full btn-sm"
              onClick={() => follow(user?._id)}
            >
              {isPending && "Loading..."}
              {!isPending && amIFollowing && "Unfollow"}
              {!isPending && !amIFollowing && "Follow"}
            </button>
          )}
          {isMyProfile && (
            <>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={profileImgRef}
                onChange={(e) => handleImgChange(e, "profileImg")}
              />
              {isMyProfile && profileImg && (
                <button
                  className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
                  onClick={async () => {
                    await updateProfile({ profileImg });
                    setProfileImg(null);
                  }}
                >
                  {isUpdatingProfile ? "Updating..." : "Update"}
                </button>
              )}
            </>
          )}
          <div>{memberSinceDate}</div>
        </div>
      </>
      <div className="flex w-full border-b border-gray-700 mt-4">
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
          onClick={() => setFeedType("posts")}
        >
          Posts
          {feedType === "posts" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
          )}
        </div>
        <div
          className="flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer"
          onClick={() => setFeedType("likes")}
        >
          Likes
          {feedType === "likes" && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
          )}
        </div>
      </div>
      <Posts feedType={feedType} userName={userName} _id={user?._id} />
    </div>
  );
};

export default ProfileView;
