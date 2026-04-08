import HeroBanner from "./components/HeroBanner";
import IngredientsList from "./components/ingredients/IngredientsList";
import { getIngredients } from "./lib/datadb";

export default async function Home() {
  const ingredients = await getIngredients();
  return (
    <div className="content-container">
      <HeroBanner />
      <IngredientsList ingredients={ingredients} />
    </div>
  );
}
