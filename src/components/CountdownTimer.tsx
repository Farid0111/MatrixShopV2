import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CountdownTimerProps {
  initialMinutes: number;
  onExpire: () => void;
}

export function CountdownTimer({ initialMinutes, onExpire }: CountdownTimerProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (initialMinutes * 60)) * 100;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mix-blend-overlay opacity-20">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white rounded-full animate-pulse" 
               style={{ animationDuration: '3s' }} />
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white rounded-full animate-pulse" 
               style={{ animationDuration: '4s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg tracking-wider">
              {t('timer.flashSale')}
            </h3>
          </div>
          <div className="h-1.5 flex-grow mx-4 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex justify-center items-center gap-4">
          {/* Minutes */}
          <div className="group relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 transform transition-transform group-hover:scale-105">
              <span className="block text-5xl font-bold font-mono text-white tabular-nums text-center">
                {String(minutes).padStart(2, '0')}
              </span>
              <p className="text-xs uppercase tracking-widest mt-2 text-white text-opacity-80 text-center">
                {t('timer.minutes')}
              </p>
            </div>
          </div>

          <span className="text-4xl font-bold text-white animate-pulse">:</span>

          {/* Seconds */}
          <div className="group relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 transform transition-transform group-hover:scale-105">
              <span className="block text-5xl font-bold font-mono text-white tabular-nums text-center">
                {String(seconds).padStart(2, '0')}
              </span>
              <p className="text-xs uppercase tracking-widest mt-2 text-white text-opacity-80 text-center">
                {t('timer.seconds')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}