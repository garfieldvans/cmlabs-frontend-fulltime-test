import { getMealById } from "@/app/lib/datadb";
import Image from "next/image";
import "./Meal.css";

export default async function MealDetailPage({
    params,
}: {
    params: Promise<{ mealid: string }>;
}) {
    const { mealid } = await params;
    const meal = await getMealById(mealid);

    if (!meal) {
        return <p>Meal not found.</p>;
    }

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal?.[`strIngredient${i}`];
        const measure = meal?.[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                ingredient,
                measure,
            });
        }
    }

    return (
        <div className="content-container meal-detail">
            <h1 className="meal-title">{meal.strMeal}</h1>

            {/* HEAD SECTION */}
            <div className="head-content">

                <div className="meal-image-wrapper">
                    <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={500}
                        height={500}
                        className="meal-image"
                    />
                </div>

                <div className="meal-ingredients">
                    <h2>Ingredients</h2>

                    <ul className="ingredients-grid">
                        {ingredients.map((item, index) => (
                            <li key={index} className="ingredient-item">
                                <span className="ingredient-name">{item.ingredient}</span>
                                <span className="ingredient-measure">~{item.measure}</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

            <div className="tags-wrapper">
                {meal.strTags && (
                    <div className="tags-list">
                        {meal.strTags.split(",").map((tag: string, index: number) => (
                            <span key={index} className="meal-tag">#{tag.trim()}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* INSTRUCTIONS */}
            <section className="meal-instructions">

                <h2>Instructions</h2>

                <div className="instructions-content">
                    {meal.strInstructions.split("\n").map((step: string, index: number) => (
                        step.trim() && (
                            <div className="step-item" key={index}>
                                <span className="step-point">•</span>
                                <p>{step}</p>
                            </div>
                        )
                    ))}
                </div>

            </section>

            { meal.strYoutube && (
                <section className="meal-video">
                    <h2 className="">Video Tutorial</h2>
                    <iframe
                        src={meal.strYoutube.replace("watch?v=", "embed/")}
                        title="Video Tutorial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </section>
            )}

        </div>
    );
}