import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth';

export async function createAdminUser() {
  const email = 'admin@matrixshop.com';
  const password = 'admin123';

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: 'Admin'
    });
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // Admin user already exists, try to login instead
      return loginWithEmail(email, password);
    }
    console.error('Error creating admin user:', error);
    throw error;
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password');
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}