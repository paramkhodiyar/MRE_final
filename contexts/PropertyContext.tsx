'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Property } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  addProperty: (property: Omit<Property, 'id' | 'publishedAt'>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  getProperty: (id: string) => Property | undefined;
  refreshProperties: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

// Helper function to estimate storage size
const getStorageSize = (data: string): number => {
  return new Blob([data]).size;
};

// Helper function to check available storage
const checkStorageQuota = (newData: string): boolean => {
  try {
    const testKey = 'storage_test';
    localStorage.setItem(testKey, newData);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load properties from localStorage or use mock data
    const loadProperties = () => {
      try {
        const storedProperties = localStorage.getItem('maya_properties');
        if (storedProperties) {
          const parsed = JSON.parse(storedProperties);
          setProperties(parsed);
        } else {
          // Initialize with mock data and save to localStorage
          const propertiesWithDates = mockProperties.map(property => ({
            ...property,
            publishedAt: property.publishedAt || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
          }));
          setProperties(propertiesWithDates);
          
          // Try to save to localStorage
          const dataToSave = JSON.stringify(propertiesWithDates);
          if (checkStorageQuota(dataToSave)) {
            localStorage.setItem('maya_properties', dataToSave);
          }
        }
      } catch (error) {
        console.error('Error loading properties:', error);
        setProperties(mockProperties.map(property => ({
          ...property,
          publishedAt: property.publishedAt || new Date().toISOString()
        })));
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const saveProperties = (newProperties: Property[]) => {
    try {
      const dataToSave = JSON.stringify(newProperties);
      
      // Check if the data will fit in localStorage
      if (!checkStorageQuota(dataToSave)) {
        // If storage is full, try to clean up old properties or compress data
        console.warn('Storage quota exceeded. Attempting to optimize...');
        
        // Sort by date and keep only the most recent properties if needed
        const sortedProperties = newProperties.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        
        // Try with fewer properties if needed
        let optimizedProperties = sortedProperties;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (!checkStorageQuota(JSON.stringify(optimizedProperties)) && attempts < maxAttempts) {
          // Remove oldest properties
          optimizedProperties = optimizedProperties.slice(0, Math.floor(optimizedProperties.length * 0.8));
          attempts++;
        }
        
        if (checkStorageQuota(JSON.stringify(optimizedProperties))) {
          localStorage.setItem('maya_properties', JSON.stringify(optimizedProperties));
          setProperties(optimizedProperties);
          console.log(`Optimized storage: kept ${optimizedProperties.length} of ${newProperties.length} properties`);
        } else {
          throw new Error('Unable to save properties: storage quota exceeded');
        }
      } else {
        localStorage.setItem('maya_properties', dataToSave);
        setProperties(newProperties);
      }
    } catch (error) {
      console.error('Error saving properties:', error);
      // Still update the state even if localStorage fails
      setProperties(newProperties);
      throw error;
    }
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'publishedAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: `property-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      publishedAt: new Date().toISOString()
    };

    const updatedProperties = [...properties, newProperty];
    saveProperties(updatedProperties);
  };

  const deleteProperty = async (id: string) => {
    const updatedProperties = properties.filter(property => property.id !== id);
    saveProperties(updatedProperties);
  };

  const updateProperty = async (id: string, propertyData: Partial<Property>) => {
    const updatedProperties = properties.map(property =>
      property.id === id ? { ...property, ...propertyData } : property
    );
    saveProperties(updatedProperties);
  };

  const getProperty = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const refreshProperties = () => {
    const storedProperties = localStorage.getItem('maya_properties');
    if (storedProperties) {
      try {
        const parsed = JSON.parse(storedProperties);
        setProperties(parsed);
      } catch (error) {
        console.error('Error refreshing properties:', error);
      }
    }
  };

  const value = {
    properties,
    loading,
    addProperty,
    deleteProperty,
    updateProperty,
    getProperty,
    refreshProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};