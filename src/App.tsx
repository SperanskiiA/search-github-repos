import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Favourites } from "./pages/Favourites";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
