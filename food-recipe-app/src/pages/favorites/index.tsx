import RecipeItem from "../../components/recipe-item";
import { useGlobalContext } from "../../context/hook";

export default function Favorites() {
  const { favorites } = useGlobalContext();

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favorites.length ? (
        favorites.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing has been added to favorites.
          </p>
        </div>
      )}
    </div>
  );
}
