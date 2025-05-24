export const validatePersonalInfo = (formData) => {
  const errors = {};

  // Full Name 1 validation
  if (!formData.fullName1?.trim()) {
    errors.fullName1 = "First partner's name is required";
  } else if (formData.fullName1.length < 2) {
    errors.fullName1 = "Name must be at least 2 characters long";
  }

  // Full Name 2 validation
  if (!formData.fullName2?.trim()) {
    errors.fullName2 = "Second partner's name is required";
  } else if (formData.fullName2.length < 2) {
    errors.fullName2 = "Name must be at least 2 characters long";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
