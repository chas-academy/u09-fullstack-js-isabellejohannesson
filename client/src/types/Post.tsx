import User from "./User.tsx";
import Comment from "./Comment.tsx";

interface Post {
  _id: string;
  user: User;
  text: string;
  img: string;
  likes: string[];
  comments: Comment[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export default Post;
