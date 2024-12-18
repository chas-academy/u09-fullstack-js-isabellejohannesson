import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type User from "../types/User";
import type Post from "../types/Post";

import Suggested from "./Suggested";
import ProcessingWheel from "./ProcessingWheel";

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");

  const { data: authCheck, isLoading: authLoading } = useQuery<User>({
    queryKey: ["authCheck"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/authCheck`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to check auth");
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
    retry: false,
  });

  const {
    data: searchResults,
    refetch: search,
    isLoading: searchLoading,
  } = useQuery<{
    users: User[];
    posts: Post[];
  }>({
    queryKey: ["searchResults", query],
    queryFn: async () => {
      const [usersRes, postsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/users/search?q=${query}`, {
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/posts/search?q=${query}`, {
          credentials: "include",
        }),
      ]);

      if (!usersRes.ok || !postsRes.ok) {
        throw new Error("Failed to fetch search results");
      }

      const users = await usersRes.json();
      const posts = await postsRes.json();

      return { users, posts };
    },
    enabled: false, // Kör endast när användaren trycker på sök
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (authLoading) {
      toast.loading("Checking authentication...");
      return;
    }

    if (!authCheck) {
      toast.error("You need to be logged in to search");
      return;
    }

    if (query) {
      search();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center overflow-y-auto px-4 my-4">
        <div className="flex justify-center items-center mx-auto max-w-xl w-full my-4">
          <form onSubmit={handleSearch} className="w-full p-4">
            <label className="input input-ghost bg-secondary rounded-2xl flex gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-ghost" type="submit">
                <FaSearch />
              </button>
            </label>
          </form>
        </div>

        {authLoading && <ProcessingWheel />}

        {(searchLoading || !searchResults) && query && <p>Searching...</p>}

        {searchResults?.users && (
          <div>
            <h2 className="font-heading text-lg">Users</h2>
            <ul>
              {searchResults.users.map((user) => (
                <li key={user._id} className="border-b-primary px-2 py-4">
                  <a
                    className="hover:bg-primary hover:text-accent cursor-pointer"
                    href={`/profile/${user.userName}`}
                  >
                    {user.fullName} (@{user.userName})
                  </a>
                </li>
              ))}
            </ul>
            {searchResults.posts && (
              <>
                <h2 className="font-heading text-lg">Posts</h2>
                <ul>
                  {searchResults.posts.map((post) => (
                    <li
                      className="hover:bg-primary hover:text-accent cursor-pointer px-2 py-4"
                      key={post._id}
                    >
                      <a href={`/posts/${post.user._id}`}>{post.text}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div className="flex flex-col p-4 m-4">
          <h2 className="font-heading font-primary text-lg px-2 py-4">
            Who to follow
          </h2>{" "}
          <Suggested />
        </div>
      </div>
    </>
  );
};

export default Searchbar;
