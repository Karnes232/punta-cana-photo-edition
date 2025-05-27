import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trans } from "gatsby-plugin-react-i18next";
import {
  Heart,
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
import { validatePersonalInfo } from "../../hooks/WeddingQuestaionnaireValidation";
import { navigate } from "gatsby";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

const WeddingQuestionnaire = ({ initialFormData }) => {
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

  // Add new state for form errors
  const [formErrors, setFormErrors] = useState({});

  // Update form when package is selected
  useEffect(() => {
    if (initialFormData) {
      setFormData((prev) => ({
        ...prev,
        ...initialFormData,
      }));
      // Set to Style & Aesthetic section (index 2)
      setCurrentStep(2);
    }
  }, [initialFormData]);

  const steps = [
    {
      id: "personal",
      title: <Trans>About You</Trans>,
      icon: Heart,
      component: PersonalInfoSection,
    },
    {
      id: "wedding",
      title: <Trans>Wedding Details</Trans>,
      icon: Calendar,
      component: WeddingDetailsSection,
    },
    {
      id: "style",
      title: <Trans>Style & Aesthetic</Trans>,
      icon: Palette,
      component: StyleAestheticSection,
    },
    {
      id: "experiences",
      title: <Trans>Additional Experiences</Trans>,
      icon: MapPin,
      component: ExperiencesSection,
    },
    {
      id: "budget",
      title: <Trans>Budget</Trans>,
      icon: DollarSign,
      component: BudgetSection,
    },
    {
      id: "final",
      title: <Trans>Final Details</Trans>,
      icon: Camera,
      component: FinalDetailsSection,
    },
  ];

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleStepClick = (index) => {
    // Only validate when trying to move forward from personal info section
    if (currentStep === 0 && index > currentStep) {
      const { isValid, errors } = validatePersonalInfo(formData);
      if (!isValid) {
        setFormErrors(errors);
        return;
      }
    }
    // Clear errors and set new step
    setFormErrors({});
    setCurrentStep(index);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Validate personal info section before proceeding
      if (currentStep === 0) {
        const { isValid, errors } = validatePersonalInfo(formData);
        if (!isValid) {
          setFormErrors(errors);
          return;
        }
      }
      setFormErrors({});
      setCurrentStep(currentStep + 1);

      // Scroll to the progress bar section
      const progressBar = document.querySelector(".progress-section");
      if (progressBar) {
        progressBar.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add some extra padding from the top of the viewport
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create FormData object for regular form fields
      const formDataObj = new FormData();

      // Upload images to Firebase Storage first
      if (formData.inspirationImages?.length) {
        const promises = formData.inspirationImages.map(async (img, index) => {
          const storageRef = ref(
            storage,
            `wedding-questionnaires/${Date.now()}-${img.file.name}`,
          );
          const uploadResult = await uploadBytes(storageRef, img.file);
          const downloadUrl = await getDownloadURL(uploadResult.ref);
          // Add each URL individually to match the form input names
          formDataObj.append(`inspirationImages-${index}`, downloadUrl);
          return downloadUrl;
        });

        await Promise.all(promises);
      }

      // Add all regular form fields
      Object.keys(formData).forEach((key) => {
        if (key !== "inspirationImages") {
          formDataObj.append(key, formData[key]);
        }
      });

      const response = await fetch("/", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        console.log("Form successfully submitted");
        navigate(`/contact/thankyou/?name=${formData.fullName1}`);
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
    <div id="wedding-questionnaire" className="min-h-screen py-12 px-4">
      <WeddingQuestaionnaireForm formData={formData} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <Trans>Your Dream Wedding Awaits ✨</Trans>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <Trans>
              Let's create something magical together. This questionnaire will
              help us understand your vision perfectly.
            </Trans>
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8 progress-section">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              <Trans>Step</Trans> {currentStep + 1} <Trans>of</Trans>{" "}
              {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% <Trans>Complete</Trans>
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
                  onClick={() => handleStepClick(index)}
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
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 form-content"
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
                errors={formErrors}
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
              <span>
                <Trans>Previous</Trans>
              </span>
            </motion.button>

            {currentStep < steps.length - 1 ? (
              <motion.button
                onClick={nextStep}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: "#e4c05c" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  <Trans>Next Step</Trans>
                </span>
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
                <span>
                  <Trans>✨ Submit My Dream Wedding Plan</Trans>
                </span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeddingQuestionnaire;
