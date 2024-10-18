import User from "./user.tsx";

interface Comment {
  _id: string;
  text: string;
  user: User;
}

export default Comment;
