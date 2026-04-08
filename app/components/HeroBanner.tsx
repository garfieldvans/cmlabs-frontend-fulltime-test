import Image from "next/image";
import Link from "next/link";
import "./HeroBanner.css";

export default function HeroBanner() {
    return (
        <section className="hero-banner">

            {/* Background Image */}
            <Image
                src="/images/food-banner.jpg"
                alt="Food Banner"
                fill
                priority
                className="hero-banner-image"
            />

            {/* Overlay */}
            <div className="hero-banner-overlay"></div>

            {/* Content */}
            <div className="hero-banner-content">
                <h1 className="hero-banner-title">
                    Discover Delicious Recipes
                </h1>

                <p className="hero-banner-description">
                    Explore a collection of foods, ingredients, and recipes from around
                    the world. Start your food diary today.
                </p>

                <div className="hero-banner-buttons">
                    <Link href="/ingredients" className="hero-btn hero-btn-primary">
                        Browse Ingredients
                    </Link>

                    <Link href="/foods" className="hero-btn hero-btn-outline">
                        Explore Foods
                    </Link>
                </div>
            </div>

        </section>
    );
}