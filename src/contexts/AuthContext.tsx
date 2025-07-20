// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, writeBatch } from "firebase/firestore";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  planName?: 'none' | 'Basic' | 'Premium' | 'Enterprise';
  phone?: string;
  description?: string;
  imageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateSubscription: (planName: 'none' | 'Basic' | 'Premium' | 'Enterprise') => Promise<void>;
  updateUserProfile: (data: { name: string; phone: string; description: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            setUser({ id: firebaseUser.uid, ...userDocSnap.data() } as User);
        } else {
            const newUser = {
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                planName: 'none',
            };
            await setDoc(userDocRef, newUser);
            setUser({ id: firebaseUser.uid, ...newUser } as User);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSubscription = async (planName: 'none' | 'Basic' | 'Premium' | 'Enterprise') => {
    if (user) {
        const userDocRef = doc(db, "users", user.id);
        await updateDoc(userDocRef, { planName: planName });
        setUser({ ...user, planName: planName });
    }
  };

  // Updated function to handle user profile and service name synchronization
// In src/contexts/AuthContext.tsx

// Updated function to handle user profile and service data synchronization
const updateUserProfile = async (data: { name: string; phone: string; description: string }) => {
  if (!user) return;

  // Start a Firestore batch
  const batch = writeBatch(db);

  // 1. Update the user's own profile document in the 'users' collection
  const userDocRef = doc(db, "users", user.id);
  batch.update(userDocRef, data);

  // 2. If the name or phone number has changed, find and update all their services
  if (data.name !== user.name || data.phone !== user.phone) {
      const servicesCollection = collection(db, "services");
      const q = query(servicesCollection, where("providerId", "==", user.id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
          const serviceRef = doc.ref;
          // Update both name and phone number on each service document
          batch.update(serviceRef, {
            name: data.name,
            contactPhone: data.phone
          });
      });
  }

  // 3. Commit all the changes at once
  await batch.commit();

  // 4. Update the local user state in the app
  setUser({ ...user, ...data });
};

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (): Promise<boolean> => {
      setIsLoading(true);
      try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          return true;
      } catch (error) {
          console.error("Google login error:", error);
          return false;
      } finally {
          setIsLoading(false);
      }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name: name,
        email: email,
        planName: 'none',
      });
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, signup, logout, isLoading, updateSubscription, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};