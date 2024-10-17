const SignUpView = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-9/12 mx-auto">
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          Name
          <input type="text" className="w-full" placeholder="Daisy" />
        </label>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          Email
          <input type="text" className="w-full" placeholder="daisy@site.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <input type="text" className="w-full" placeholder="Search" />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
        <label className="input input-bordered flex items-center gap-2 max-w-sm w-full my-2">
          <input type="text" className="w-full" placeholder="Search" />
          <span className="badge badge-info">Optional</span>
        </label>
      </div>
    </>
  );
};

export default SignUpView;
