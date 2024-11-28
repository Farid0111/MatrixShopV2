import { collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy, serverTimestamp, limit, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import { HomepageContent } from '../types/homepage';
import { retryOperation, handleFirebaseError } from './firebaseService';

export async function createHomepage(content: Omit<HomepageContent, 'id'>): Promise<string> {
  try {
    const batch = writeBatch(db);
    
    // If this homepage is set to active, deactivate others first
    if (content.isActive) {
      const activeHomepages = await getDocs(
        query(collection(db, 'homepages'), where('isActive', '==', true))
      );
      
      activeHomepages.docs.forEach(doc => {
        batch.update(doc.ref, { isActive: false, updatedAt: serverTimestamp() });
      });
    }
    
    // Create the new homepage
    const docRef = await addDoc(collection(db, 'homepages'), {
      ...content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    await batch.commit();
    return docRef.id;
  } catch (error) {
    console.error('Error creating homepage:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function updateHomepage(id: string, content: Partial<HomepageContent>): Promise<void> {
  try {
    const batch = writeBatch(db);
    
    // If this homepage is being set to active, deactivate others first
    if (content.isActive) {
      const activeHomepages = await getDocs(
        query(collection(db, 'homepages'), where('isActive', '==', true))
      );
      
      activeHomepages.docs.forEach(doc => {
        if (doc.id !== id) {
          batch.update(doc.ref, { isActive: false, updatedAt: serverTimestamp() });
        }
      });
    }
    
    // Update the homepage
    const homepageRef = doc(db, 'homepages', id);
    await updateDoc(homepageRef, {
      ...content,
      updatedAt: serverTimestamp()
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error updating homepage:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function getAllHomepages(): Promise<HomepageContent[]> {
  try {
    const homepagesRef = collection(db, 'homepages');
    const q = query(homepagesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as HomepageContent[];
  } catch (error) {
    console.error('Error fetching homepages:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function getActiveHomepage(): Promise<HomepageContent | null> {
  try {
    const homepagesRef = collection(db, 'homepages');
    // Simplified query to avoid composite index requirement
    const q = query(
      homepagesRef,
      where('isActive', '==', true)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    // Sort manually if needed
    const docs = snapshot.docs.sort((a, b) => {
      const aDate = a.data().createdAt?.toDate() || new Date(0);
      const bDate = b.data().createdAt?.toDate() || new Date(0);
      return bDate.getTime() - aDate.getTime();
    });
    
    const doc = docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    } as HomepageContent;
  } catch (error) {
    console.error('Error fetching active homepage:', error);
    throw new Error(handleFirebaseError(error));
  }
}