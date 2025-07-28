import React from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface RestaurantProps {
  name: string;
  cuisine: string;
  phone: string;
  email: string;
  tagline: string;
  pictureUrl: string;
  address: Address;
}

const RestaurantCard: React.FC<{ restaurant: RestaurantProps }> = ({ restaurant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:w-80">
      <img
        src={restaurant.pictureUrl}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
        <p className="text-gray-600 mb-2">{restaurant.tagline}</p>
        <p className="text-sm text-gray-500 mb-1"><strong>Cuisine:</strong> {restaurant.cuisine}</p>
        <p className="text-sm text-gray-500 mb-1"><strong>Phone:</strong> {restaurant.phone}</p>
        <p className="text-sm text-gray-500 mb-1"><strong>Email:</strong> {restaurant.email}</p>
        <p className="text-sm text-gray-500">
          <strong>Address:</strong> {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} - {restaurant.address.zipCode}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
