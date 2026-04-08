export async function getIngredients() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
    {
      cache: "force-cache",
    }
  );

  const data = await res.json();
  return data.meals;
}

export async function getIngredientByName(name: string) {
  const ingredients = await getIngredients();

  return ingredients.find(
    (i: any) =>
      i.strIngredient.toLowerCase() === name.toLowerCase()
  );
}

export async function getMealsByIngredient(ingredient: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    {
      next: { revalidate: 3600 }
    }
  );

  const data = await res.json();

  return data.meals || [];
}

export async function getMealsForFoodsPage() {
  const letters = ["a", "b", "c"];

  const requests = letters.map((letter) =>
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      { cache: "no-store" }
    ).then((res) => res.json())
  );

  const responses = await Promise.all(requests);

  const meals = responses
    .flatMap((r) => r.meals || []);

  // shuffle meals
  const shuffled = meals.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 20);
}

export async function getMealById(id: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    {
      next: { revalidate: 3600 }
    }
  );

  const data = await res.json();

  return data.meals?.[0];
}
