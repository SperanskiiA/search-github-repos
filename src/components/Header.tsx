import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-black text-white">
      <h3 className="mx-2 font-bold">Github Search</h3>
      <span className="flex justify-around w-[200px]">
        <Link to={"/"}>HOME</Link>
        <Link to={"/fav"}>FAVOURITES</Link>
      </span>
    </nav>
  );
};
