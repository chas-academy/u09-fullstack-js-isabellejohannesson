import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import ProcessingWheel from "../components/ProcessingWheel";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser, FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BsEmojiExpressionless } from "react-icons/bs";

import type Notification from "../types/Notifications";

const NotificationsView = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error in notifications-view:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications/delete`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error in notifications-view:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="wrapper flex flex-col min-h-screen overflow-y-auto w-full lg:max-w-md">
      <div className="flex justify-between items-center p-4 border-b border-primary">
        <p className="font-bold font-heading">Notifications</p>
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="m-1">
            <IoSettingsOutline className="w-4" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-6 rounded-box w-auto"
          >
            <li className="flex items-center text-red-600">
              <a onClick={() => deleteNotifications()}>
                Delete all notifications?
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <ProcessingWheel />
        </div>
      )}
      {notifications?.length === 0 && (
        <div className="text-center text-primary font-semibold">
          No notifications <BsEmojiExpressionless className="text-primary" />
        </div>
      )}
      {notifications?.map((notification: Notification) => (
        <div className="flex gap-2 p-4">
          {notification.type === "follow" && (
            <FaUser className="w-7 h-7 text-primary" />
          )}
          {notification.type === "like" && (
            <FaHeart className="w-7 h-7 text-red-600" />
          )}
          {notification.type === "comment" && (
            <FaRegComment className="w-7 h-7 text-accent" />
          )}
          <Link to={`/profile/${notification.from.userName}`}>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  src={
                    notification.from.profileImg || "/Placeholder_avatar.png"
                  }
                />
              </div>
            </div>
            <div className="flex gap-1">
              <span className="font-bold">@{notification.from.userName}</span>{" "}
              {notification.type === "follow"
                ? "followed you"
                : notification.type === "like"
                ? "liked your post"
                : "commented on your post"}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NotificationsView;
