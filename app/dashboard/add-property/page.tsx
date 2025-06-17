'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useProperties } from '@/contexts/PropertyContext';

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'Apartment',
    amenities: [] as string[],
    tags: [] as string[]
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, loading } = useAuth();
  const { addProperty } = useProperties();
  const router = useRouter();

  useEffect(() => {
    // Check authentication and role
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
        return;
      }
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 10 images
    const limitedFiles = files.slice(0, 10);
    setSelectedImages(prev => [...prev, ...limitedFiles].slice(0, 10));

    // Create preview URLs
    limitedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string].slice(0, 10));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenity)
        ? formData.amenities.filter(a => a !== amenity)
        : [...formData.amenities, amenity]
    });
  };

  const handleTagToggle = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter(t => t !== tag)
        : [...formData.tags, tag]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert images to base64 or use stock images if no images uploaded
      let imageUrls: string[] = [];
      
      if (selectedImages.length > 0) {
        // Convert uploaded images to base64 URLs for demo purposes
        imageUrls = imagePreviewUrls;
      } else {
        // Use stock images as fallback
        const stockImages = [
          'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
          'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg',
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
        ];
        imageUrls = stockImages.slice(0, 3);
      }

      const propertyData = {
        title: formData.title,
        price: parseInt(formData.price),
        location: formData.location,
        description: formData.description,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        type: formData.type,
        amenities: formData.amenities,
        tags: formData.tags,
        image: imageUrls[0], // First image as main image
        images: imageUrls
      };

      await addProperty(propertyData);
      setIsSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error adding property:', error);
      setIsSubmitting(false);
    }
  };

  const availableAmenities = [
    'Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym', 
    'Elevator', 'Power Backup', 'Terrace Garden', 'City View', 
    'Premium Fittings', 'River View', 'Peaceful Location', 
    'Natural Light', 'Premium Location', 'Luxury Fittings', 'Concierge'
  ];

  const availableTags = [
    { value: 'new', label: 'New' },
    { value: 'fast-filling', label: 'Fast Filling' },
    { value: 'sold-out', label: 'Sold Out' },
    { value: 'trending', label: 'Trending' }
  ];

  const propertyTypes = [
    'Apartment', 'Villa', 'House', 'Penthouse', 'Cottage', 'Suite', 'Plot'
  ];

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Added Successfully!</h2>
            <p className="text-gray-600 mb-4">Your new property listing has been created and is now live.</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Enter property title"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (INR)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Enter price in INR"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="e.g., Raipur, Chhattisgarh"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Describe the property..."
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Number of bedrooms"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Number of bathrooms"
                />
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Area in square feet"
                />
              </div>
            </div>
          </div>

          {/* Property Images */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Images</h2>
            
            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload property images</p>
                  <p className="text-sm text-gray-500">
                    Upload up to 10 images. Supported formats: JPG, PNG, WebP
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                          Main Image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {imagePreviewUrls.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ImageIcon className="w-5 h-5 text-blue-600 mr-2" />
                    <p className="text-blue-800 text-sm">
                      No images uploaded. Stock images will be used for the property listing.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Status Tags</h2>
            
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => handleTagToggle(tag.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.tags.includes(tag.value)
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Property...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}