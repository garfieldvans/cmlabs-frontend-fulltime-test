import Link from "next/link";
import "./MealCard.css";

export default function MealCard({ meal }: { meal: any }) {

  return (
    <Link
      href={`/foods/${meal.idMeal}`}
      className="meal-card"
    >

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        loading="lazy"
      />

      <div className="meal-overlay">
        <p>{meal.strMeal}</p>
      </div>

    </Link>
  );
}