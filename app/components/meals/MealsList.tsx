"use client";

import { useState, useMemo } from "react";
import MealCard from "./MealCard";
import Pagination from "../Pagination";
import "./MealsList.css";

const ITEMS_PER_PAGE = 12;

export default function MealsList({ items, title }: { items: any[], title?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter meals (live search)
  const filteredMeals = useMemo(() => {
    return items.filter((meal) =>
      meal.strMeal.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);

  const paginatedMeals = filteredMeals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1); // reset ke page pertama
  }

  if (!items.length) {
    return <p>No meals found.</p>;
  }

  return (
    <div className="meals-container">

      {/* SEARCH */}
      <div className="meals-search">
        {title && <h2 className="">{title}</h2>}
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          className="search-field"
          onChange={handleSearch}
        />
      </div>

      {/* RESULT COUNT */}
      <p className="meals-count">
        {filteredMeals.length} meals found
      </p>

      {/* GRID */}
      <div className="meals-grid">
        {paginatedMeals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination 
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </div>
  );
}