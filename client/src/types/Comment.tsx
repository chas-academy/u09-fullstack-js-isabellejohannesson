import CommentUser from "./CommentUser.tsx";

interface Comment {
  _id: string;
  text: string;
  user: CommentUser;
}

export default Comment;
