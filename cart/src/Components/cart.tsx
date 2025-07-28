import React, { useState } from 'react';

const initialCartItems = [
  {
    id: 1,
    name: 'Veg Biryani',
    image: 'https://via.placeholder.com/100',
    price: 180,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    image: 'https://via.placeholder.com/100',
    price: 220,
    quantity: 1,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const increment = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 min-h-screen flex flex-col p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 max-h-[70vh] overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 text-lg"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600 text-lg">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-500 mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-20">
          <h3 className="text-xl font-medium mb-4">Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={cartItems.length === 0}
          >
            Proceed to Pay
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
            <div className="flex flex-col gap-3">
              <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Pay with UPI
              </button>
              <button className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                Pay with Wallet
              </button>
              <button className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                Pay with Card
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-sm text-gray-600 hover:underline mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
