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
            publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
          }));
          setProperties(propertiesWithDates);
          localStorage.setItem('maya_properties', JSON.stringify(propertiesWithDates));
        }
      } catch (error) {
        console.error('Error loading properties:', error);
        setProperties(mockProperties.map(property => ({
          ...property,
          publishedAt: new Date().toISOString()
        })));
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const saveProperties = (newProperties: Property[]) => {
    try {
      localStorage.setItem('maya_properties', JSON.stringify(newProperties));
      setProperties(newProperties);
    } catch (error) {
      console.error('Error saving properties:', error);
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