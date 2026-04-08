"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./Breadcrumb.css";
import { FiChevronRight } from "react-icons/fi";

export default function AutoBreadcrumb() {
    const pathname = usePathname();
    const [mealName, setMealName] = useState<string | null>(null);
    const [ingredientName, setIngredientName] = useState<string | null>(null);

    const pathSegments = pathname
        .split("/")
        .filter(Boolean)
        .map(segment => decodeURIComponent(segment));

    useEffect(() => {
        const isMealDetail = pathSegments.length >= 2 && 
                            pathSegments[0] === "foods" && 
                            !isNaN(Number(pathSegments[pathSegments.length - 1]));
        
        const isIngredientDetail = pathSegments.length >= 2 && 
                                   pathSegments[0] === "ingredients" && 
                                   pathSegments.length > 1;

        if (isMealDetail) {
            const mealId = pathSegments[pathSegments.length - 1];
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(res => res.json())
                .then(data => {
                    setMealName(data.meals?.[0]?.strMeal || null);
                })
                .catch(err => console.error("Error fetching meal:", err));
        }

        if (isIngredientDetail) {
            const ingredientSegment = pathSegments[pathSegments.length - 1];
            setIngredientName(ingredientSegment);
        }
    }, [pathname]);

    const crumbs = pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");

        let label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

        const isLastSegment = index === pathSegments.length - 1;
        const isMealDetailPage = pathSegments.length >= 2 && 
                                pathSegments[0] === "foods" && 
                                !isNaN(Number(pathSegments[pathSegments.length - 1]));

        if (isLastSegment && isMealDetailPage && mealName) {
            label = mealName;
        } else if (isLastSegment && ingredientName && pathSegments[0] === "ingredients") {
            label = ingredientName;
        }

        return { label, href };
    });

    return (
        <>
            {crumbs.length > 0 && (
                <nav className="breadcrumb flex max-w-7xl w-full mx-auto py-2 px-6">
                    <Link href="/" className="flex w-max items-center">
                        Home
                    </Link>

                    {crumbs.map((crumb, index) => (
                        <span key={index} className="flex w-max items-center">
                            <div className="breadcrumb-separator">
                                <FiChevronRight size={20} />
                            </div>

                            {index === crumbs.length - 1 ? (
                                <span className="breadcrumb-current">{crumb.label}</span>
                            ) : (
                                <Link href={crumb.href}>{crumb.label}</Link>
                            )}
                        </span>
                    ))}
                </nav>
            )}
        </>
    );
}