// app/components/GlobalAlert.js
'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../services/state/hooks';
import { hideAlert } from '../services/state/alert/alertSlice';

export default function GlobalAlert() {
  const { message, type } = useAppSelector((state) => state.alertReducer);
  const dispatch = useAppDispatch();

  // Automatically hide the alert after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  // Simple styling logic (you would use Tailwind or CSS classes here)
  const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 text-white ${bgColor} rounded-b-lg shadow-xl z-50`}>
      <p>{message}</p>
      <button onClick={() => dispatch(hideAlert())} className="ml-4 font-bold">
        &times;
      </button>
    </div>
  );
}