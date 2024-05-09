import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/hook";
import { IRecipeDetails } from "../../context";

const URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";

export default function Details() {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails } = useGlobalContext();

  useEffect(() => {
    if (!id) return;

    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(URL + id);
        const data = await response.json();
        if (data?.data?.recipe) {
          setRecipeDetails(data.data.recipe as IRecipeDetails);
        }
      } catch (error) {
        console.error("There was an error", error);
      }
    };

    fetchRecipeDetails();
  }, [id, setRecipeDetails]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetails?.image_url}
            alt={recipeDetails?.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">{recipeDetails?.publisher}</p>
        <h1 className="text-lg font-semibold">{recipeDetails?.title}</h1>
        <div>
          <button className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white">
            Save as favorites
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetails?.ingredients.map((ingredient) => (
              <li key={ingredient.description}>
                <span>
                  {ingredient.quantity} {ingredient.unit} {`of `}
                </span>
                <span>{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
