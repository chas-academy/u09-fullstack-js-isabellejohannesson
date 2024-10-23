import Suggested from "../../components/Suggested";

const Profile = () => {
  return (
    <div className="flex flex-col justify-center overflow-y-auto px-4 my-4">
      <div>Member since (show created at) + Following</div>
      <Suggested />
    </div>
  );
};

export default Profile;
