import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Calendar,
  MapPin,
  Palette,
  Camera,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import PersonalInfoSection from "./PersonalInfoSection";
import WeddingDetailsSection from "./WeddingDetailsSection";
import StyleAestheticSection from "./StyleAestheticSection";
import ExperiencesSection from "./ExperiencesSection";
import BudgetSection from "./BudgetSection";
import FinalDetailsSection from "./FinalDetailsSection";
import WeddingQuestaionnaireForm from "./WeddingQuestaionnaireForm";
const WeddingQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    "form-name": "weddingQuestionnaireForm",
    // Personal Info
    fullName1: "",
    fullName2: "",
    email: "",
    phone: "",

    // Wedding Details
    weddingDate: "",
    estimatedTime: "",
    guestCount: 50,
    desiredLocations: "",
    ceremonyType: "",
    hotelStay: "",
    needTransportation: false,

    // Style & Aesthetic
    weddingStyles: [],
    colorPalette: "",
    chairStyle: [],
    centerpieceStyle: [],

    // Experiences
    additionalExperiences: [],

    // Budget
    budget: 15000,

    // Final Details
    dreamDescription: "",
    inspirationImages: [],
  });

  const steps = [
    {
      id: "personal",
      title: "About You",
      icon: Heart,
      component: PersonalInfoSection,
    },
    {
      id: "wedding",
      title: "Wedding Details",
      icon: Calendar,
      component: WeddingDetailsSection,
    },
    {
      id: "style",
      title: "Style & Aesthetic",
      icon: Palette,
      component: StyleAestheticSection,
    },
    {
      id: "experiences",
      title: "Additional Experiences",
      icon: MapPin,
      component: ExperiencesSection,
    },
    {
      id: "budget",
      title: "Budget",
      icon: DollarSign,
      component: BudgetSection,
    },
    {
      id: "final",
      title: "Final Details",
      icon: Camera,
      component: FinalDetailsSection,
    },
  ];

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Encode the form data for submission
      const encodedData = new URLSearchParams(formData).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodedData,
      });

      if (response.ok) {
        alert(
          "Thank you! Your wedding questionnaire has been submitted successfully.",
        );
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Sorry, there was an error submitting your form. Please try again later.",
      );
    }
  };

  const CurrentComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen  py-12 px-4">
      <WeddingQuestaionnaireForm formData={formData} />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Dream Wedding Awaits ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's create something magical together. This questionnaire will
            help us understand your vision perfectly.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
              style={{ backgroundColor: "#e4c05c" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                      : isCompleted
                        ? "bg-green-100 text-green-800 border-2 border-green-300"
                        : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{step.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentComponent
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onSubmit={handleSubmit}
                isLastStep={currentStep === steps.length - 1}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
              whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </motion.button>

            {currentStep < steps.length - 1 ? (
              <motion.button
                onClick={nextStep}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: "#e4c05c" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Next Step</span>
                <ChevronRight size={20} />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={24} />
                <span>✨ Submit My Dream Wedding Plan</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeddingQuestionnaire;
