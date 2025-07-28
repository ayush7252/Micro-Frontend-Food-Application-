import React, { useRef, useEffect, useState } from "react";
import Carousel from "./Carousel";
import MealCard from "./MealCard";

interface Meal {
  id: number | string;
  title: string;
  image: string;
  time?: string;
  price?: string;
}

function HomePage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("../assets/ConstantData/QuickMeal.json")
      .then((data) => {
        setMeals(data.default);
      })
      .catch((err) => console.error(err));
  }, []);

  const scroll = (direction: string) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current?.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current?.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 min-h-screen flex flex-col">
      <section className="w-full mb-10 px-4 mt-4">
        <div className="rounded-xl overflow-hidden scrollbar-hide">
          <Carousel />
        </div>
      </section>

      <section className="relative px-4 mb-10">
        <h2 className="text-2xl font-bold mb-4">Meals in 30 Minutes</h2>

        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-100/70 p-3 rounded-full shadow hover:bg-gray-200"
        >
          ◀️
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100/70 p-3 rounded-full shadow hover:bg-gray-200"
        >
          ▶️
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide"
        >
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
