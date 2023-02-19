import React, { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [drobdownVisible, setDropdownVisible] = useState(false);
  const debounced = useDebounce(search);
  const { data, isError, isLoading } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 1,
  });
  const [fetchRepos, { isLoading: isReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (str: string) => {
    console.log("clicked" + str);
    fetchRepos(str);
  };
  useEffect(() => {
    setDropdownVisible(debounced.length > 1 && data?.length! > 0);
  }, [debounced, data]);

  return (
    <div className="flex justify-start items-center flex-col pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-800">Somthing went wrong...</p>
      )}
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border-gray-700 border-solid py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {drobdownVisible && (
          <ul className="list-none absolute top-[45px] left-0 right-0 max-h-[200px] shadow-md bg-white text-grey-800 py-2 px-4 overflow-y-scroll">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => {
              return (
                <li
                  className="py-2 px-4 hover:bg-green-300 hover:text-white transition-colors cursor-pointer"
                  key={user.id}
                  onClick={() => clickHandler(user.login)}
                >
                  {user.login}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="container mt-[200px]">
        {isReposLoading && (
          <p className="text-center text-yellow-400">Loading user repos</p>
        )}
        {repos?.map((repo) => {
          return <RepoCard repo={repo} key={repo.id} />;
        })}
      </div>
    </div>
  );
};
