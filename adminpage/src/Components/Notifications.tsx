import React, { useEffect, useState } from 'react';
import NotificationCard from './Cards/NotificationCard';

interface Notification {
  _id: string;
  requestType: string;
  name: string;
  cuisine: string;
  ownerName: string;
  timestamp: string;
  status: string;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('https://foodapp-backend-a3ew.onrender.com/api/admin/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotifications(data.data);
        } else {
          console.error('Failed to fetch notifications');
        }
      })
      .catch((err) => console.error('API Error:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found.</p>
      ) : (
        notifications.map((note) => (
          <NotificationCard
            key={note._id}
            requestType={note.requestType}
            name={note.name}
            cuisine={note.cuisine}
            ownerName={note.ownerName}
            timestamp={note.timestamp}
            status={note.status}
          />
        ))
      )}
    </div>
  );
}

export default Notifications;
