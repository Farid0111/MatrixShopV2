import { db } from '../config/firebase';
import { collection, query, getDocs, enableNetwork, disableNetwork } from 'firebase/firestore';
import type { FirebaseError } from 'firebase/app';

let isReconnecting = false;

export async function checkFirebaseConnection(): Promise<boolean> {
  try {
    const testQuery = query(collection(db, 'products'));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    if ((error as FirebaseError).code === 'unavailable' && !isReconnecting) {
      isReconnecting = true;
      // Try to reconnect
      try {
        await disableNetwork(db);
        await enableNetwork(db);
        isReconnecting = false;
        return true;
      } catch (reconnectError) {
        console.error('Reconnection failed:', reconnectError);
        isReconnecting = false;
      }
    }
    
    if ((error as FirebaseError).code) {
      console.error('Firebase connection error:', (error as FirebaseError).code, (error as FirebaseError).message);
    } else {
      console.error('Unknown error:', error);
    }
    return false;
  }
}

export function handleFirebaseError(error: unknown): string {
  if ((error as FirebaseError).code) {
    const fbError = error as FirebaseError;
    console.error('Firebase error:', fbError.code, fbError.message);
    
    switch (fbError.code) {
      case 'permission-denied':
        return 'Accès non autorisé. Veuillez vérifier vos permissions.';
      case 'unavailable':
        return 'Service temporairement indisponible. Veuillez réessayer plus tard.';
      case 'not-found':
        return 'La ressource demandée n\'existe pas.';
      case 'already-exists':
        return 'Cette ressource existe déjà.';
      default:
        return fbError.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Une erreur inattendue est survenue';
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if ((error as FirebaseError).code === 'unavailable') {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        // Try to reconnect before retrying
        await checkFirebaseConnection();
        continue;
      }
      throw error;
    }
  }
  
  throw lastError;
}

export const firestoreCache = {
  _cache: new Map<string, { data: any; timestamp: number }>(),
  _cacheDuration: 5 * 60 * 1000, // 5 minutes

  set(key: string, data: any) {
    this._cache.set(key, { data, timestamp: Date.now() });
  },

  get(key: string) {
    const cached = this._cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this._cacheDuration) {
      this._cache.delete(key);
      return null;
    }
    
    return cached.data;
  },

  clear() {
    this._cache.clear();
  }
};