import { getApp, getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  "type": "service_account",
  "project_id": "matrixshop-5600a",
  "private_key_id": "your-private-key-id",
  "private_key": "your-private-key",
  "client_email": "firebase-adminsdk-xxxxx@matrixshop-5600a.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your-cert-url"
};

const app = getApps().length === 0 ? initializeApp({
  credential: cert(serviceAccount)
}) : getApp();

export const adminDb = getFirestore(app);