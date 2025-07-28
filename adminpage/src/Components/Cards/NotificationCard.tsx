// NotificationCard.tsx
import React from 'react';

interface NotificationProps {
  requestType: string;
  name: string;
  cuisine: string;
  ownerName: string;
  timestamp: string;
  status: string;
}

const NotificationCard: React.FC<NotificationProps> = ({
  requestType,
  name,
  cuisine,
  ownerName,
  timestamp,
  status,
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Request:</span> {requestType}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Cuisine:</span> {cuisine}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Owner:</span> {ownerName}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Status:</span> {status}
      </p>
      <p className="text-gray-500 text-sm">
        <span className="font-semibold">Time:</span> {new Date(timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default NotificationCard;
