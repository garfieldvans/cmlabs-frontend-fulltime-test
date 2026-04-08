import MealsList from "@/app/components/meals/MealsList";
import { getIngredientByName, getMealsByIngredient } from "@/app/lib/datadb";
import Image from "next/image";
import "./IngredientPage.css";
// import IngredientHero from "@/app/components/ingredients/IngredientHero";

export default async function IngredientPage({
    params,
}: {
    params: Promise<{ ingredients: string }>;
}) {
    const { ingredients } = await params;
    const ingredientData = await getIngredientByName(decodeURIComponent(ingredients));
    const meals = await getMealsByIngredient(decodeURIComponent(ingredients));
    return (
        <div className="content-container">
            <div className="content-hero">
                <Image src={ingredientData.strThumb} alt={ingredientData.strIngredient} width={200} height={200} priority />
                <div className="ingredient-info">
                    <h1 className="ingredient-title">{ingredientData.strIngredient}</h1>
                    <p className="ingredient-description">{ingredientData.strDescription}</p>
                </div>
            </div>
            <section className="meals-section">
                 <MealsList items={meals} title={`Meals with ${decodeURIComponent(ingredients)}`} />
            </section>
        </div>
    );
}