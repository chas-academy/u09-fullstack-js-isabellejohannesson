import Posts from "../../components/Posts";
import EditProfileModal from "./editProfileModal";
import ProfileSkeleton from "../../components/skeletons/PostSkeleton";
import { formatMemberSinceDate } from "../../utils/formatPostDate";

import type User from "../../types/User";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useFollow from "../../hooks/useFollow";
import toast from "react-hot-toast";

const ProfileView = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [feedType, setFeedType] = useState("posts");

  const profileImgRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userName } = useParams();

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
        <div className="flex flex-row justify-between">
          {/* User Information */}
          <div className="user-info-div">
            <h1 className="text-2xl font-bold font-heading text-primary">
              {user?.fullName}
            </h1>
            <p className="text-sm text-gray-800">
              @{user?.userName.toLowerCase()}
            </p>
            {user?.bio && (
              <p className="text-sm mt-1 text-gray-500">{user?.bio}</p>
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
          {/*profileImg and Edit */}
          <div className="Profile-img-container flex flex-col items-center cursor-pointer">
            <div onClick={() => profileImgRef.current?.click()}>
              <img
                src={profileImg || user?.profileImg}
                alt="../../../Placeholder_avatar"
                className="w-28 h-28 rounded-full border-primary p-2"
              />
            </div>

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
                {/* Edit Profile Modal and Button */}
                {isMyProfile && authCheck && (
                  <>
                    <button
                      className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2 my-4"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Update Profile
                    </button>

                    {isModalOpen && (
                      <EditProfileModal
                        authCheck={authCheck}
                        onClose={() => setIsModalOpen(false)}
                      />
                    )}
                  </>
                )}
                <div className="text-xs font-semibold text-gray-900 items-center">
                  {memberSinceDate}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <>
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
      </>
    </div>
  );
};

export default ProfileView;
