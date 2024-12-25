import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signOut 
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0FQ8FtyfkcTi9-HlQZmKgBNAm5PimmUw",
  authDomain: "roofly-b3d4f.firebaseapp.com",
  projectId: "roofly-b3d4f",
  storageBucket: "roofly-b3d4f.firebasestorage.app",
  messagingSenderId: "737354322292",
  appId: "1:737354322292:web:2b946ce66eea7e3741dc21",
  measurementId: "G-K734YCWDP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };

// Authentication functions
export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (updates) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, updates);
      return user;
    }
    throw new Error('No user is currently signed in');
  } catch (error) {
    throw error;
  }
};

// Favorites functions
export const addToFavorites = async (userId, propertyId, propertyData) => {
  try {
    const favoriteRef = doc(db, 'favorites', `${userId}_${propertyId}`);
    await setDoc(favoriteRef, {
      userId,
      propertyId,
      propertyData,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const removeFromFavorites = async (userId, propertyId) => {
  try {
    const favoriteRef = doc(db, 'favorites', `${userId}_${propertyId}`);
    await deleteDoc(favoriteRef);
  } catch (error) {
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const favoritesQuery = query(
      collection(db, 'favorites'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(favoritesQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const subscribeToPriceChanges = (userId, callback) => {
  const favoritesQuery = query(
    collection(db, 'favorites'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(favoritesQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'modified') {
        const updatedProperty = change.doc.data();
        callback(updatedProperty);
      }
    });
  });
};

// Property Management Functions
export const addProperty = async (propertyData) => {
  try {
    const propertiesRef = collection(db, 'properties');
    const docRef = await addDoc(propertiesRef, {
      ...propertyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const updateProperty = async (propertyId, propertyData) => {
  try {
    const propertyRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyRef, {
      ...propertyData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const propertyRef = doc(db, 'properties', propertyId);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

export const getProperties = async (filters = {}) => {
  try {
    const propertiesRef = collection(db, 'properties');
    let q = propertiesRef;
    
    // Apply filters
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.propertyType) {
      q = query(q, where('propertyType', '==', filters.propertyType));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting properties:', error);
    throw error;
  }
};

// Get a property by ID
export const getPropertyById = async (propertyId) => {
  try {
    const propertyDoc = await getDoc(doc(db, 'properties', propertyId));
    if (propertyDoc.exists()) {
      return { id: propertyDoc.id, ...propertyDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting property:', error);
    throw error;
  }
};