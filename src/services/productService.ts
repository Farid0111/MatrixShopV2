import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Product } from '../types/product';
import { retryOperation, handleFirebaseError, firestoreCache } from './firebaseService';

export interface NewProduct {
  translations: {
    en: {
      name: string;
      description: string;
    };
    fr: {
      name: string;
      description: string;
    };
  };
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
}

export async function uploadProductImage(file: File): Promise<string> {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function addProduct(productData: NewProduct): Promise<string> {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('translations.fr.name', '==', productData.translations.fr.name)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error('Un produit avec ce nom existe déjà');
    }

    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    firestoreCache.clear(); // Clear cache after adding new product
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function updateProduct(productId: string, productData: NewProduct): Promise<void> {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: serverTimestamp()
    });
    
    firestoreCache.clear(); // Clear cache after updating product
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    
    firestoreCache.clear(); // Clear cache after deleting product
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const cachedProducts = firestoreCache.get('products');
    if (cachedProducts) {
      return cachedProducts as Product[];
    }

    const productsSnapshot = await retryOperation(async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      return querySnapshot;
    });

    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    firestoreCache.set('products', products);
    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw new Error(handleFirebaseError(error));
  }
}

export async function getProduct(productId: string): Promise<Product | null> {
  try {
    const cachedProduct = firestoreCache.get(`product_${productId}`);
    if (cachedProduct) {
      return cachedProduct as Product;
    }

    const productDoc = await retryOperation(async () => {
      const docRef = doc(db, 'products', productId);
      return await getDoc(docRef);
    });

    if (!productDoc.exists()) {
      return null;
    }

    const product = {
      id: productDoc.id,
      ...productDoc.data()
    } as Product;

    firestoreCache.set(`product_${productId}`, product);
    return product;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw new Error(handleFirebaseError(error));
  }
}