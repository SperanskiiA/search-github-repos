import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { IRepo } from "../../models/models";

const LS_FAV_KEY = "rgfk";
interface GithubState {
  fav: string[];
}

const initialState: GithubState = {
  fav: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addToFav(state, action: PayloadAction<IRepo>) {
      state.fav.push(JSON.stringify(action.payload));
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.fav));
    },
    removeFromFav(state, action: PayloadAction<IRepo>) {
      state.fav = state.fav.filter(
        (item) => JSON.parse(item).html_url !== action.payload.html_url
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.fav));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
