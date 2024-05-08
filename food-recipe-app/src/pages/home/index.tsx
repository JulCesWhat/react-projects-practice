import { useGlobalContext } from "../../context/hook";

export default function Home() {
  const {
    data: { recipes, status },
  } = useGlobalContext();

  if (status === "LOADING") {
    return <h1>Loading...</h1>;
  }
  
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipes.length > 0
        ? recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="w-64 h-96 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold">{recipe.title}</h1>
                <p className="text-sm text-gray-500">{recipe.publisher}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
