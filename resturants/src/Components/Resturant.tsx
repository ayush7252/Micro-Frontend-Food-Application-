import React, { useEffect, useState } from 'react';
import RestaurantCard from './ResturantCard';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  phone: string;
  email: string;
  tagline: string;
  pictureUrl: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

function Restaurant() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://foodapp-backend-a3ew.onrender.com/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((rest) => (
          <RestaurantCard key={rest._id} restaurant={rest} />
        ))}
      </div>
    </div>
  );
}

export default Restaurant;
