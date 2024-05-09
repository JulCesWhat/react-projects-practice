import { Link } from "react-router-dom";

import { IRecipe } from "../../context/index";

const RecipeItem = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <div
      key={recipe.id}
      className="w-64 h-96 bg-white shadow-md rounded-lg overflow-hidden"
    >
      <Link to={`/recipe-item/${recipe.id}`}>
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold">{recipe.title}</h1>
          <p className="text-sm text-gray-500">{recipe.publisher}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeItem;
