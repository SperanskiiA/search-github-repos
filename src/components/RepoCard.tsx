import React, { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/models";

export const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addToFav, removeFromFav } = useActions();
  const { fav } = useAppSelector((state) => state.github);
  const [isFav, setFav] = useState(fav.includes(JSON.stringify(repo)));

  const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToFav(repo);
    setFav(true);
  };

  const removeFromoFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const item = JSON.stringify(repo);
    removeFromFav(repo);
    setFav(false);
  };

  return (
    <div className="border-stone-700 py-3 px-4 bg-slate-300 mb-2 hover:shadow-md hover:bg-slate-100 transition-colors">
      <h3>{repo.full_name}</h3>
      <div>
        <p>
          Forks <span className="font-bold mr-2">{repo.forks}</span>
          Watchers <span className="font-bold ">{repo.watchers}</span>
        </p>
      </div>
      <p>{repo?.description}</p>

      {!isFav && (
        <button
          className="py-2 px-4 bg-yellow-500 rounded hover:shadow-md transition-all"
          onClick={addToFavourite}
        >
          Add
        </button>
      )}

      {isFav && (
        <button
          className="py-2 px-4 bg-red-600 rounded hover:shadow-md transition-all"
          onClick={removeFromoFavourite}
        >
          Remove
        </button>
      )}
    </div>
  );
};
