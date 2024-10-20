const CreatePost = () => {
  return (
    <div className="post-container bg-white mb-6 mt-4 rounded-lg max-w-xl w-full mx-auto px-4 my-4">
      <div className="flex flex-row">
        <div className="flex flex-col justify-center align-middle">
          <img
            src="../Placeholder_avatar.png"
            alt="{`${post.user.userName}'s profile`}"
            className="w-10 h-10 rounded-full mr-2 mb-2"
          />
          <div className="border-l border-secondary h-full mx-6 py-4 ml-4"></div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm">Maria Doe</h2>
          <textarea
            className="textarea-ghost"
            aria-label="Create post"
            placeholder="What's new?"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default CreatePost;
