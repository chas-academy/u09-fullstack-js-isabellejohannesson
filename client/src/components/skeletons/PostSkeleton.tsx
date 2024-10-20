const PostSkeleton = () => {
  return (
    <div className="flex w-52 flex-col gap-4 bg-slate-400">
      <div className="flex items-center gap-4 bg-white">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-accent"></div>
        <div className="flex flex-col gap-4 bg-white">
          <div className="skeleton h-4 w-20 bg-slate-400"></div>
          <div className="skeleton h-4 w-28 bg-slate-700"></div>
        </div>
      </div>
      <div className="skeleton h-40 w-full"></div>
    </div>
  );
};

export default PostSkeleton;
