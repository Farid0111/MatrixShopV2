import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Order, OrderStatus, OrderProduct } from '../types/order';

interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  products: OrderProduct[];
  totalAmount: number;
}

export async function createOrder(orderData: CreateOrderData): Promise<string> {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending' as OrderStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

export async function deleteOrder(orderId: string): Promise<void> {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw error;
  }
}