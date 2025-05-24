
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';

const StyleAestheticSection = ({ formData, updateFormData }) => {
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleArrayToggle = (field, value) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFormData({ [field]: newArray });
  };

  const weddingStyles = [
    { value: 'boho', label: 'Boho', icon: '🌸', description: 'Free-spirited & natural' },
    { value: 'tropical', label: 'Tropical', icon: '🌺', description: 'Vibrant & exotic' },
    { value: 'classic', label: 'Classic', icon: '💎', description: 'Timeless & elegant' },
    { value: 'modern', label: 'Modern', icon: '✨', description: 'Clean & contemporary' },
    { value: 'rustic', label: 'Rustic', icon: '🌿', description: 'Natural & cozy' },
    { value: 'vintage', label: 'Vintage', icon: '🕯️', description: 'Nostalgic & romantic' }
  ];

  const chairStyles = [
    { value: 'tiffany', label: 'Tiffany', icon: '💺' },
    { value: 'ghost', label: 'Ghost', icon: '👻' },
    { value: 'chiavari', label: 'Chiavari', icon: '🪑' },
    { value: 'crossback', label: 'Cross-back', icon: '❌' },
    { value: 'folding', label: 'Folding', icon: '📁' }
  ];

  const centerpieceStyles = [
    { value: 'tall', label: 'Tall', icon: '🏗️' },
    { value: 'low', label: 'Low', icon: '🌱' },
    { value: 'candles', label: 'Candles', icon: '🕯️' },
    { value: 'flowers', label: 'Flowers', icon: '🌹' },
    { value: 'mixed', label: 'Mixed Height', icon: '📊' },
    { value: 'minimal', label: 'Minimal', icon: '⚪' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Palette className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Style & Aesthetic</h2>
        <p className="text-gray-600">Let's bring your vision to life</p>
      </div>

      {/* Wedding Styles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Sparkles size={16} />
          <span>Preferred Wedding Style (select all that apply)</span>
        </label>
        <div className="grid md:grid-cols-3 gap-4">
          {weddingStyles.map((style) => (
            <motion.button
              key={style.value}
              onClick={() => handleArrayToggle('weddingStyles', style.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.weddingStyles?.includes(style.value)
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <span className="text-3xl mb-2 block">{style.icon}</span>
                <h3 className="font-medium text-gray-800">{style.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{style.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Color Palette */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Palette size={16} />
          <span>Color Palette (describe or use HEX codes)</span>
        </label>
        <input
          type="text"
          value={formData.colorPalette}
          onChange={(e) => handleInputChange('colorPalette', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          placeholder="e.g., Blush pink and gold, #f8b5c0 #e4c05c, Sage green and cream"
        />
      </motion.div>

      {/* Chair Styles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <label className="text-sm font-medium text-gray-700">Preferred Chair Style</label>
        <div className="grid md:grid-cols-5 gap-3">
          {chairStyles.map((chair) => (
            <motion.button
              key={chair.value}
              onClick={() => handleArrayToggle('chairStyle', chair.value)}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                formData.chairStyle?.includes(chair.value)
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl block mb-1">{chair.icon}</span>
              <span className="text-sm font-medium text-gray-800">{chair.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Centerpiece Styles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <label className="text-sm font-medium text-gray-700">Centerpiece Style</label>
        <div className="grid md:grid-cols-3 gap-4">
          {centerpieceStyles.map((centerpiece) => (
            <motion.button
              key={centerpiece.value}
              onClick={() => handleArrayToggle('centerpieceStyle', centerpiece.value)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                formData.centerpieceStyle?.includes(centerpiece.value)
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl block mb-2">{centerpiece.icon}</span>
              <span className="text-sm font-medium text-gray-800">{centerpiece.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Style Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-rose-50 to-amber-50 p-6 rounded-xl border border-rose-200"
      >
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Sparkles size={16} className="mr-2 text-rose-500" />
          Your Style Summary
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          {formData.weddingStyles?.length > 0 && (
            <p><strong>Styles:</strong> {formData.weddingStyles.join(', ')}</p>
          )}
          {formData.colorPalette && (
            <p><strong>Colors:</strong> {formData.colorPalette}</p>
          )}
          {formData.chairStyle?.length > 0 && (
            <p><strong>Chairs:</strong> {formData.chairStyle.join(', ')}</p>
          )}
          {formData.centerpieceStyle?.length > 0 && (
            <p><strong>Centerpieces:</strong> {formData.centerpieceStyle.join(', ')}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StyleAestheticSection;