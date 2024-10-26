import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type User from "../types/User";
import type Post from "../types/Post";

import Suggested from "./Suggested";
import LoadingSpinner from "./LoadingSpinner";

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");

  // Kontrollerar om användaren är inloggad
  const { data: authCheck, isLoading: authLoading } = useQuery<User>({
    queryKey: ["authCheck"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/authCheck`
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
        fetch(`${import.meta.env.VITE_API_URL}/api/users/search?q=${query}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/posts/search?q=${query}`),
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
      search(); // Starta sökningen
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

        {authLoading && <LoadingSpinner />}

        {(searchLoading || !searchResults) && query && <p>Searching...</p>}

        {searchResults && (
          <div>
            <h2>Users</h2>
            <ul>
              {searchResults.users.map((user) => (
                <li key={user._id}>
                  <a href={`/profile/${user.userName}`}>
                    {user.fullName} (@{user.userName})
                  </a>
                </li>
              ))}
            </ul>

            <h2>Posts</h2>
            <ul>
              {searchResults.posts.map((post) => (
                <li key={post._id}>
                  <a href={`/posts/${post._id}`}>{post.text}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Suggested />
      </div>
    </>
  );
};

export default Searchbar;
