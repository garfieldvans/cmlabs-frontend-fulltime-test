"use client";

import { useMemo } from "react";
import "./Pagination.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const paginationNumbers = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        className={`nav-btn ${page === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {paginationNumbers.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="pagination-dots">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={p === page ? "active" : ""}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        className={`nav-btn ${page === totalPages ? "disabled" : ""}`}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
