import React, { useState, useEffect } from 'react';
import { PurchaseNotification } from './PurchaseNotification';

export function NotificationManager() {
  const [notifications, setNotifications] = useState<number[]>([]);

  useEffect(() => {
    // Show a new notification every 8-15 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.floor(Math.random() * (15000 - 8000) + 8000);
      setNotifications(prev => [...prev, Date.now()]);
      
      // Update interval with new random delay
      clearInterval(interval);
      setTimeout(() => {
        const newInterval = setInterval(() => {
          setNotifications(prev => [...prev, Date.now()]);
        }, randomDelay);
        return () => clearInterval(newInterval);
      }, randomDelay);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {notifications.map(id => (
        <PurchaseNotification
          key={id}
          onClose={() => {
            setNotifications(prev => prev.filter(notifId => notifId !== id));
          }}
        />
      ))}
    </>
  );
}