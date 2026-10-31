import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';
import { saveUserProfileToFirestore, fetchUserProfileFromFirestore } from '../lib/firestoreService';
import type { UserProfile, ShippingAddress } from '../types';

// Admin email as provided in requirements metadata
const ADMIN_EMAIL = 'krushna.ipws@gmail.com';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInDemoUser: (role?: 'customer' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  updateShippingAddress: (address: ShippingAddress) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check admin rights
  const isAdmin = Boolean(
    (user?.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) ||
    userProfile?.role === 'admin'
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profile = await fetchUserProfileFromFirestore(currentUser.uid);
          if (profile) {
            setUserProfile(profile);
          } else {
            const isUserAdmin = currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Technova Customer',
              photoURL: currentUser.photoURL || '',
              role: isUserAdmin ? 'admin' : 'customer',
              createdAt: new Date().toISOString(),
            };
            await saveUserProfileToFirestore(newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.warn('Profile sync warning:', err);
          setUserProfile({
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Customer',
            role: currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'customer',
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        // Check if demo user saved in localStorage
        const storedDemo = localStorage.getItem('technova_demo_user');
        if (storedDemo) {
          try {
            const parsed = JSON.parse(storedDemo) as UserProfile;
            setUserProfile(parsed);
          } catch {
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google Sign-in failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInDemoUser = async (role: 'customer' | 'admin' = 'customer') => {
    setLoading(true);
    const demoProfile: UserProfile = {
      uid: role === 'admin' ? 'demo-admin-uid' : 'demo-customer-uid',
      email: role === 'admin' ? ADMIN_EMAIL : 'alex.turner@technova.com',
      displayName: role === 'admin' ? 'Store Administrator (Krushna)' : 'Alex Turner',
      photoURL: role === 'admin'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role,
      createdAt: '2026-01-15T10:00:00Z',
      savedAddresses: [
        {
          fullName: 'Alex Turner',
          email: 'alex.turner@technova.com',
          phone: '+1 (555) 234-8900',
          addressLine1: '742 Innovation Way, Suite 400',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94107',
          country: 'United States',
        },
      ],
    };
    localStorage.setItem('technova_demo_user', JSON.stringify(demoProfile));
    setUserProfile(demoProfile);
    setLoading(false);
  };

  const logout = async () => {
    try {
      localStorage.removeItem('technova_demo_user');
      setUserProfile(null);
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const updateShippingAddress = async (address: ShippingAddress) => {
    if (!userProfile) return;
    const currentAddresses = userProfile.savedAddresses || [];
    const updatedAddresses = [address, ...currentAddresses.filter((a) => a.addressLine1 !== address.addressLine1)];
    const updatedProfile: UserProfile = {
      ...userProfile,
      savedAddresses: updatedAddresses,
    };
    setUserProfile(updatedProfile);
    if (user) {
      try {
        await saveUserProfileToFirestore(updatedProfile);
      } catch (e) {
        console.warn('Address sync error:', e);
      }
    } else {
      localStorage.setItem('technova_demo_user', JSON.stringify(updatedProfile));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAdmin,
        signInWithGoogle,
        signInDemoUser,
        logout,
        updateShippingAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
