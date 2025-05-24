import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Camera, FileText, Upload, X, Image, Heart } from "lucide-react";

const FinalDetailsSection = ({ formData, updateFormData }) => {
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024, // 5MB limit
    );

    if (validFiles.length > 0) {
      const currentImages = formData.inspirationImages || [];
      const newImages = validFiles.map((file) => ({
        file,
        name: file.name,
        url: URL.createObjectURL(file),
        id: Date.now() + Math.random(),
      }));

      updateFormData({
        inspirationImages: [...currentImages, ...newImages].slice(0, 10), // Limit to 10 images
      });
    }
  };

  const removeImage = (imageId) => {
    const updatedImages = (formData.inspirationImages || []).filter(
      (img) => img.id !== imageId,
    );
    updateFormData({ inspirationImages: updatedImages });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
          <Camera className="w-8 h-8 text-pink-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Final Details</h2>
        <p className="text-gray-600">
          Share your vision and inspiration with us
        </p>
      </div>

      {/* Dream Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <FileText size={16} />
          <span>Describe Your Dream Wedding</span>
        </label>
        <div className="relative">
          <textarea
            value={formData.dreamDescription || ""}
            onChange={(e) =>
              handleInputChange("dreamDescription", e.target.value)
            }
            rows="8"
            className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your dream wedding... What atmosphere do you want to create? What moments are most important to you? What would make this day absolutely perfect? Share any special requests, must-haves, or unique ideas you have in mind."
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {formData.dreamDescription?.length || 0} characters
          </div>
        </div>
        <p className="text-xs text-gray-500">
          💭 Share your vision, special moments, atmosphere, and any unique
          ideas you have
        </p>
      </motion.div>

      {/* Inspiration Images Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Image size={16} />
          <span>Inspiration Images</span>
        </label>

        {/* Upload Area */}
        <motion.div
          onClick={triggerFileUpload}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Upload Inspiration Images
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Share photos that inspire your wedding vision
          </p>
          <div className="text-xs text-gray-400">
            JPG, PNG, GIF up to 5MB each • Maximum 10 images
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.div>

        {/* Image Preview Grid */}
        {formData.inspirationImages?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Camera size={14} className="mr-2" />
              Uploaded Images ({formData.inspirationImages.length}/10)
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.inspirationImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-yellow-400 transition-all"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="text-white text-xs truncate">{image.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Inspiration Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200"
      >
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Heart size={16} className="mr-2 text-pink-500" />
          Image Inspiration Ideas
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Wedding dress & attire styles
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Venue & ceremony setups
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Floral arrangements & bouquets
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Table settings & centerpieces
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Color palettes & themes
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Lighting & ambiance
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Photography styles
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
              Reception & party ideas
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200"
      >
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Heart size={16} className="mr-2 text-amber-500" />
          You're Almost Ready! ✨
        </h3>
        <p className="text-sm text-amber-800 mb-4">
          Thank you for sharing your vision with us. Once you submit this form,
          our wedding planning team will review your details and create a
          personalized proposal just for you.
        </p>
        <div className="text-xs text-amber-700">
          📞 We'll contact you within 24-48 hours to discuss your dream wedding
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalDetailsSection;
