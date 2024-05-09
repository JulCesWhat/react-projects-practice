import RecipeItem from "../../components/recipe-item";
import { useGlobalContext } from "../../context/hook";

export default function Home() {
  const {
    data: { recipes, status },
  } = useGlobalContext();

  if (status === "LOADING") {
    return (
      <div className="flex justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)
      ) : (
        <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
          Nothing to show. Please search something.
        </p>
      )}
    </div>
  );
}
