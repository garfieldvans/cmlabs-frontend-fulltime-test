"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./Breadcrumb.css";
import { FiChevronRight } from "react-icons/fi";

export default function AutoBreadcrumb() {
    const pathname = usePathname();
    const [mealName, setMealName] = useState<string | null>(null);

    const pathSegments = pathname.split("/").filter(Boolean);

    useEffect(() => {
        const lastSegment = pathSegments[pathSegments.length - 1];

        if (pathSegments[0] === "foods" && lastSegment && !isNaN(Number(lastSegment))) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${lastSegment}`)
                .then(res => res.json())
                .then(data => {
                    setMealName(data.meals?.[0]?.strMeal);
                });
        }
    }, [pathname]);

    const crumbs = pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");

        let label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

        if (index === pathSegments.length - 1 && mealName) {
            label = mealName;
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