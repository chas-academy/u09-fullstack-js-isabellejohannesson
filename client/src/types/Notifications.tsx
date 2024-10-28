import User from "./User.tsx";

interface Notification {
  _id: string;
  from: User;
  to: User;
  type: "follow" | "like" | "comment";
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export default Notification;
