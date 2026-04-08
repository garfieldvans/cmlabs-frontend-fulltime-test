
import IngredientsList from "../components/ingredients/IngredientsList";
import { getIngredients } from "../lib/datadb";

export default async function IngredientsPage() {
    const ingredients = await getIngredients();

    return (
        <div className="content-container">
            <IngredientsList ingredients={ingredients} />
        </div>
    );
}