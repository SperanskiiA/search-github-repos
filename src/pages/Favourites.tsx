import { RepoCard } from "../components/RepoCard";
import { useAppSelector } from "../hooks/redux";

export const Favourites = () => {
  const { fav } = useAppSelector((state) => state.github);
  if (fav.length === 0)
    return (
      <p className="font-bold text-center mx-4 my-4">this page is empty yet!</p>
    );
  return (
    <div>
      {fav.map((item) => {
        console.log(item);
        const el = JSON.parse(item);
        return <RepoCard key={el.html_url} repo={el} />;
      })}
    </div>
  );
};
