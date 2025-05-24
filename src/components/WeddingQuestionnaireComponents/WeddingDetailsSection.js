import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Building, Car } from 'lucide-react';

const WeddingDetailsSection = ({ formData, updateFormData }) => {
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const ceremonyTypes = [
    { value: 'legal', label: 'Legal Ceremony', icon: '⚖️' },
    { value: 'symbolic', label: 'Symbolic Ceremony', icon: '💕' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Wedding Details</h2>
        <p className="text-gray-600">Tell us about your special day</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar size={16} />
            <span>Wedding Date</span>
          </label>
          <input
            type="date"
            value={formData.weddingDate}
            onChange={(e) => handleInputChange('weddingDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          />
        </motion.div>

        {/* Estimated Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Clock size={16} />
            <span>Estimated Time</span>
          </label>
          <input
            type="time"
            value={formData.estimatedTime}
            onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          />
        </motion.div>

        {/* Guest Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Users size={16} />
            <span>Guest Count: {formData.guestCount}</span>
          </label>
          <input
            type="range"
            min="10"
            max="300"
            step="5"
            value={formData.guestCount}
            onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #e4c05c 0%, #e4c05c ${((formData.guestCount - 10) / 290) * 100}%, #e5e7eb ${((formData.guestCount - 10) / 290) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10</span>
            <span>300+</span>
          </div>
        </motion.div>

        {/* Desired Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <MapPin size={16} />
            <span>Desired Location(s)</span>
          </label>
          <textarea
            value={formData.desiredLocations}
            onChange={(e) => handleInputChange('desiredLocations', e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
            placeholder="Beach, garden, specific venues, etc."
          />
        </motion.div>
      </div>

      {/* Ceremony Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <label className="text-sm font-medium text-gray-700">Ceremony Type</label>
        <div className="grid md:grid-cols-2 gap-4">
          {ceremonyTypes.map((type) => (
            <motion.button
              key={type.value}
              onClick={() => handleInputChange('ceremonyType', type.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.ceremonyType === type.value
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-800">{type.label}</h3>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Hotel Stay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-2"
      >
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Building size={16} />
          <span>Hotel(s) where guests plan to stay</span>
        </label>
        <input
          type="text"
          value={formData.hotelStay}
          onChange={(e) => handleInputChange('hotelStay', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          placeholder="Hotel names or areas"
        />
      </motion.div>

      {/* Transportation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-2"
      >
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.needTransportation}
            onChange={(e) => handleInputChange('needTransportation', e.target.checked)}
            className="w-5 h-5 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-400 focus:ring-2"
          />
          <div className="flex items-center space-x-2">
            <Car size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Need guest transportation</span>
          </div>
        </label>
      </motion.div>
    </motion.div>
  );
};

export default WeddingDetailsSection;