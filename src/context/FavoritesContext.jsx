import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getFavorites, addToFavorites, removeFromFavorites, subscribeToPriceChanges } from '../firebase/config';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        const userFavorites = await getFavorites(user.uid);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    // Subscribe to price changes
    const unsubscribe = subscribeToPriceChanges(user.uid, (updatedProperty) => {
      setFavorites(prev => prev.map(fav => 
        fav.propertyId === updatedProperty.propertyId 
          ? { ...fav, propertyData: updatedProperty }
          : fav
      ));
    });

    loadFavorites();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const addFavorite = async (propertyId, propertyData) => {
    if (!user) return;
    try {
      await addToFavorites(user.uid, propertyId, propertyData);
      setFavorites(prev => [...prev, { 
        userId: user.uid,
        propertyId,
        propertyData,
        createdAt: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };

  const removeFavorite = async (propertyId) => {
    if (!user) return;
    try {
      await removeFromFavorites(user.uid, propertyId);
      setFavorites(prev => prev.filter(fav => fav.propertyId !== propertyId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  const shareViaEmail = async (email, propertyIds) => {
    // TODO: Implement email sharing functionality
    console.log('Sharing properties:', propertyIds, 'with:', email);
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    shareViaEmail
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
