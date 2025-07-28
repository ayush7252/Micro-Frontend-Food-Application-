import React, { useState } from 'react';
import Restaurants from './Resturants';
import Users from './Users';
import Notifications from './Notifications';

const Adminpage = () => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'users' | 'notifications'>('restaurants');

  return (
    <div className="bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 min-h-screen flex flex-col">
      <header className="w-full p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-60 border-r border-gray-300 px-6 py-8">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`text-left block px-4 py-2 rounded-lg transition ${
                activeTab === 'restaurants'
                  ? 'bg-yellow-300 text-gray-900 font-semibold'
                  : 'hover:bg-yellow-100'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`text-left block px-4 py-2 rounded-lg transition ${
                activeTab === 'users'
                  ? 'bg-yellow-300 text-gray-900 font-semibold'
                  : 'hover:bg-yellow-100'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`text-left block px-4 py-2 rounded-lg transition ${
                activeTab === 'notifications'
                  ? 'bg-yellow-300 text-gray-900 font-semibold'
                  : 'hover:bg-yellow-100'
              }`}
            >
              Notifications
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {activeTab === 'restaurants' && <Restaurants />}
          {activeTab === 'users' && <Users />}
          {activeTab === 'notifications' && <Notifications />}
        </main>
      </div>
    </div>
  );
};

export default Adminpage;
