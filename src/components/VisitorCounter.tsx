import React from 'react';
import { Users } from 'lucide-react';
import { useVisitor } from '../contexts/VisitorContext';

export function VisitorCounter() {
  const { visitorCount } = useVisitor();

  return (
    <div className="flex items-center gap-2 text-gray-300">
      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
        <Users className="w-4 h-4 text-white" />
      </div>
      <div className="text-sm">
        <span className="font-semibold">{visitorCount.toLocaleString()}</span>
        <span className="ml-1">visiteurs</span>
      </div>
    </div>
  );
}