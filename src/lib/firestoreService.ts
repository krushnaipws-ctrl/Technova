import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import type { CartItem, Order, UserProfile, ProductReview } from '../types';

// Synchronize Cart with Firestore
export async function syncCartToFirestore(userId: string, items: CartItem[]): Promise<void> {
  const path = `carts/${userId}`;
  try {
    const minimalItems = items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      selectedVariantId: item.selectedVariant?.id,
      selectedColorName: item.selectedColor?.name,
      unitPrice: item.unitPrice,
    }));

    await setDoc(doc(db, 'carts', userId), {
      userId,
      itemsJson: JSON.stringify(minimalItems),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch user's cart from Firestore
export async function fetchCartFromFirestore(userId: string): Promise<any[] | null> {
  const path = `carts/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'carts', userId));
    if (snap.exists()) {
      const data = snap.data();
      if (data.itemsJson) {
        return JSON.parse(data.itemsJson);
      }
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Synchronize Wishlist with Firestore
export async function syncWishlistToFirestore(userId: string, productIds: string[]): Promise<void> {
  const path = `wishlists/${userId}`;
  try {
    await setDoc(doc(db, 'wishlists', userId), {
      userId,
      productIdsJson: JSON.stringify(productIds),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch Wishlist from Firestore
export async function fetchWishlistFromFirestore(userId: string): Promise<string[] | null> {
  const path = `wishlists/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'wishlists', userId));
    if (snap.exists()) {
      const data = snap.data();
      if (data.productIdsJson) {
        return JSON.parse(data.productIdsJson);
      }
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Save Order to Firestore
export async function createOrderInFirestore(order: Order): Promise<void> {
  const path = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), {
      id: order.id,
      userId: order.userId,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      shippingAddress: `${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`,
      itemsJson: JSON.stringify(order.items),
      subtotal: order.subtotal,
      discount: order.discount,
      shippingFee: order.shippingFee,
      total: order.total,
      status: order.status,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Fetch orders for a user
export async function fetchUserOrdersFromFirestore(userId: string): Promise<Order[]> {
  const path = 'orders';
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      limit(50)
    );
    const snap = await getDocs(q);
    const orders: Order[] = [];
    snap.forEach((d) => {
      const data = d.data();
      orders.push({
        id: data.id,
        userId: data.userId,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        items: data.itemsJson ? JSON.parse(data.itemsJson) : [],
        subtotal: data.subtotal || 0,
        discount: data.discount || 0,
        shippingFee: data.shippingFee || 0,
        tax: 0,
        total: data.total || 0,
        status: data.status,
        shippingAddress: {
          fullName: data.customerName,
          email: data.customerEmail,
          phone: '',
          addressLine1: data.shippingAddress || '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        shippingMethod: 'standard',
        paymentMethod: 'card',
        trackingNumber: data.trackingNumber || '',
        carrier: 'FedEx Express',
        estimatedDelivery: data.estimatedDelivery || '',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        timeline: [
          { status: 'Order Placed', timestamp: data.createdAt, description: 'Order was placed and verified.', completed: true },
          { status: 'Payment Confirmed', timestamp: data.createdAt, description: 'Payment verified via secure gateway.', completed: true },
          { status: 'Processing', timestamp: data.createdAt, description: 'Preparing items in logistics warehouse.', completed: data.status !== 'Order Placed' },
          { status: 'Shipped', timestamp: '', description: 'Package dispatched with carrier tracking.', completed: ['Shipped', 'Out for Delivery', 'Delivered'].includes(data.status) },
          { status: 'Out for Delivery', timestamp: '', description: 'With local courier for final drop-off.', completed: ['Out for Delivery', 'Delivered'].includes(data.status) },
          { status: 'Delivered', timestamp: '', description: 'Delivered to recipient address.', completed: data.status === 'Delivered' },
        ],
      });
    });
    return orders;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Fetch single order by ID (for order tracking)
export async function fetchOrderByIdFromFirestore(orderId: string): Promise<Order | null> {
  const path = `orders/${orderId}`;
  try {
    const snap = await getDoc(doc(db, 'orders', orderId));
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: data.id,
      userId: data.userId,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      items: data.itemsJson ? JSON.parse(data.itemsJson) : [],
      subtotal: data.subtotal || 0,
      discount: data.discount || 0,
      shippingFee: data.shippingFee || 0,
      tax: 0,
      total: data.total || 0,
      status: data.status,
      shippingAddress: {
        fullName: data.customerName,
        email: data.customerEmail,
        phone: '',
        addressLine1: data.shippingAddress || '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      shippingMethod: 'standard',
      paymentMethod: 'card',
      trackingNumber: data.trackingNumber || '',
      carrier: 'FedEx Express',
      estimatedDelivery: data.estimatedDelivery || '',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      timeline: [
        { status: 'Order Placed', timestamp: data.createdAt, description: 'Order was successfully recorded in system.', completed: true },
        { status: 'Payment Confirmed', timestamp: data.createdAt, description: 'Payment authorized.', completed: true },
        { status: 'Processing', timestamp: data.createdAt, description: 'Warehouse picking & packaging.', completed: data.status !== 'Order Placed' },
        { status: 'Shipped', timestamp: '', description: 'Dispatched with carrier.', completed: ['Shipped', 'Out for Delivery', 'Delivered'].includes(data.status) },
        { status: 'Out for Delivery', timestamp: '', description: 'Package is on the delivery truck.', completed: ['Out for Delivery', 'Delivered'].includes(data.status) },
        { status: 'Delivered', timestamp: '', description: 'Package handed to customer.', completed: data.status === 'Delivered' },
      ],
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Save or Update User Profile
export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  const path = `users/${profile.uid}`;
  try {
    await setDoc(doc(db, 'users', profile.uid), {
      uid: profile.uid,
      email: profile.email,
      displayName: profile.displayName || '',
      photoURL: profile.photoURL || '',
      role: profile.role || 'customer',
      createdAt: profile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch User Profile
export async function fetchUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Admin: Update order status
export async function updateOrderStatusInFirestore(orderId: string, status: Order['status'], trackingNumber?: string): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    const updates: Record<string, any> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (trackingNumber) {
      updates.trackingNumber = trackingNumber;
    }
    await updateDoc(doc(db, 'orders', orderId), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
