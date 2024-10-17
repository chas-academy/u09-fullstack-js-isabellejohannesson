interface User {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  followers: string[];
  following: string[];
  profileImg: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likedPosts: string[];
}

export default User;
