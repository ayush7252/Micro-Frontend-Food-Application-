import React from 'react';

interface Meal {
  id: number | string;
  title: string;
  image: string;
  time?: string;
  price?: string;
}

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => {
  return (
    <div className="min-w-[200px] bg-white border rounded-lg shadow-md p-4">
      <img
        src={meal.image}
        alt={meal.title}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{meal.title}</h3>
      <p className="text-gray-500 text-sm">{meal.time}</p>
      <p className="text-gray-700 font-bold">{meal.price}</p>
    </div>
  );
};

export default MealCard;
