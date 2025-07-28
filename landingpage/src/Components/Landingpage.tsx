import React from 'react';
import Lottie from 'lottie-react';
import deliveryAnimation from '../lottie/Cooking.json'; // Adjust the path if needed

function Landingpage() {
  return (
    <div className="bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 min-h-screen flex flex-col">
      <section className="flex flex-1 flex-row items-center justify-between max-w-7xl w-full mx-auto px-6 md:px-10 py-12 md:py-20 gap-10">
        <div className="flex flex-col justify-center items-center text-center max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Delicious food, <span className="text-yellow-500">delivered fast</span>
          </h1>
          <p className="text-gray-700 mb-8 text-lg md:text-xl">
            Order from your favorite restaurants and get meals delivered fresh to your door. Fast, easy, and always delicious!
          </p>
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-200">
            Get Started
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] flex items-center justify-center bg-white rounded-2xl shadow-xl">
            <Lottie animationData={deliveryAnimation} loop={true} className="w-full h-full" />
          </div>
        </div>
      </section>
      <section className="max-w-5xl w-full mx-auto mt-4 md:mt-12 px-4 pb-12">
        <h2 className="text-2xl font-bold mb-10 text-gray-800 text-center">
          Why choose <span className="text-yellow-500">Foodify?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:shadow-xl transition">
            <span className="text-4xl mb-3" role="img" aria-label="Fast delivery">🚀</span>
            <h3 className="font-semibold text-lg mb-2">Super Fast Delivery</h3>
            <p className="text-gray-500 text-center text-base">Get your food delivered to your doorstep in under 30 minutes.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:shadow-xl transition">
            <span className="text-4xl mb-3" role="img" aria-label="Variety">🍔</span>
            <h3 className="font-semibold text-lg mb-2">Wide Variety</h3>
            <p className="text-gray-500 text-center text-base">Choose from hundreds of local restaurants and global cuisines.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:shadow-xl transition">
            <span className="text-4xl mb-3" role="img" aria-label="Secure">🔒</span>
            <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
            <p className="text-gray-500 text-center text-base">Your information and payments are always secure with us.</p>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Landingpage;