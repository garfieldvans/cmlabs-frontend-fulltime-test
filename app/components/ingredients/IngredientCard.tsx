import Link from "next/link";
import "./IngredientCard.css";
import Image from "next/image";

export default function IngredientCard({ ingredient }: { ingredient: any }) {
  return (
    <Link
      href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}
      className="ingredient-card"
    > 
      <Image
        src={ingredient.strThumb}
        alt={ingredient.strIngredient}
        loading="lazy"
        className="ingredient-image"
        width={100}
        height={100}
      />

      <div className="ingredient-overlay">
        <p>{ingredient.strIngredient}</p>
      </div>
    </Link>
  );
}