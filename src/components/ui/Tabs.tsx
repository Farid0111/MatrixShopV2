import React from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');
  
  const isSelected = context.value === value;

  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isSelected
          ? 'bg-white text-gray-900 shadow'
          : 'text-gray-600 hover:text-gray-900'
      }`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');
  
  if (context.value !== value) return null;
  return <div>{children}</div>;
}