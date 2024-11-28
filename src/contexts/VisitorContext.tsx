import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';

interface VisitorContextType {
  visitorCount: number;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        const visitorRef = doc(db, 'stats', 'visitors');
        const visitorDoc = await getDoc(visitorRef);

        if (!visitorDoc.exists()) {
          await setDoc(visitorRef, { count: 1 });
          setVisitorCount(1);
        } else {
          await setDoc(visitorRef, { count: increment(1) }, { merge: true });
          setVisitorCount(visitorDoc.data().count + 1);
        }

        // Subscribe to real-time updates
        return onSnapshot(visitorRef, (doc) => {
          if (doc.exists()) {
            setVisitorCount(doc.data().count);
          }
        });
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    };

    const unsubscribe = updateVisitorCount();
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return (
    <VisitorContext.Provider value={{ visitorCount }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error('useVisitor must be used within a VisitorProvider');
  }
  return context;
}