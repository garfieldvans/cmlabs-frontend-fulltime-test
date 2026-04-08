"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import IngredientCard from "./IngredientCard";
import Pagination from "../Pagination";
import "./IngredientsList.css";
import { CiFilter } from "react-icons/ci";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function IngredientsList({ ingredients }: { ingredients: any[] }) {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [perPage, setPerPage] = useState(24);
  const [page, setPage] = useState(1);

  const filterRef = useRef<HTMLDivElement>(null);

  /* CLICK OUTSIDE */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* FILTER LOGIC */
  const filtered = useMemo(() => {
    let data = ingredients;

    if (letter !== "All") {
      data = data.filter((i) =>
        i.strIngredient.toUpperCase().startsWith(letter)
      );
    }

    if (search) {
      data = data.filter((i) =>
        i.strIngredient.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [ingredients, letter, search]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  function changeLetter(l: string) {
    setLetter(l);
    setPage(1);
  }

  function changePerPage(n: number) {
    setPerPage(n);
    setPage(1);
  }

  return (
    <section className="ingredients-section">

      <h2 className="ingredients-title">Ingredients</h2>

      <div className="content-toolbar">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search ingredient..."
          className="search-field"
          value={search}
          onFocus={() => setShowFilter(false)}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* FILTER */}
        <div className="filter-wrapper" ref={filterRef}>
          <p className="ingredients-count">
            {filtered.length} ingredients found
          </p>
          <button
            className="filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            <span style={{ color: "#777" }}>
              Filter
            </span>
            <CiFilter />
          </button>

          {showFilter && (
            <div className="filter-popup">

              {/* ALPHABET FILTER*/}
              <div className="filter-group">
                <p className="filter-title">Alphabet</p>

                <div className="alphabet-grid">
                  <button
                    className={letter === "All" ? "active" : ""}
                    onClick={() => changeLetter("All")}
                  >
                    All
                  </button>

                  {alphabet.map((l) => (
                    <button
                      key={l}
                      className={letter === l ? "active" : ""}
                      onClick={() => changeLetter(l)}
                    >
                      {l}
                    </button>
                  ))}

                </div>
              </div>

              <div className="filter-group">
                <p className="filter-title">Show per page</p>

                <div className="item-show">
                  {[24, 50, 100].map((n) => (
                    <button
                      key={n}
                      className={perPage === n ? "active" : ""}
                      onClick={() => changePerPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      <div className="ingredients-grid">
        {paginated.map((item: any) => (
          <IngredientCard
            key={item.idIngredient}
            ingredient={item}
          />
        ))}
      </div>

      <Pagination 
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </section>
  );
}