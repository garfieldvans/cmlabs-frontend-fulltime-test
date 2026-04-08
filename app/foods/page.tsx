import { getMealsForFoodsPage } from "../lib/datadb";
import MealsList from "../components/meals/MealsList";
import "./Foods.css";

export default async function FoodsPage() {

  const meals = await getMealsForFoodsPage();

  return (
    <div className="content-container">

      <h1 className="page-title">
        Simple and tasty recipes
      </h1>

      <MealsList items={meals} />

    </div>
  );
}