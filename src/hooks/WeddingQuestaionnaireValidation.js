export const validatePersonalInfo = (formData, translations) => {
  const errors = {};

  // Full Name 1 validation
  if (!formData.fullName1?.trim()) {
    errors.fullName1 = translations.fullName1Required;
  } else if (formData.fullName1.length < 2) {
    errors.fullName1 = translations.nameMinLength;
  }

  // Full Name 2 validation
  if (!formData.fullName2?.trim()) {
    errors.fullName2 = translations.fullName2Required;
  } else if (formData.fullName2.length < 2) {
    errors.fullName2 = translations.nameMinLength;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email?.trim()) {
    errors.email = translations.emailRequired;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = translations.emailInvalid;
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  if (!formData.phone?.trim()) {
    errors.phone = translations.phoneRequired;
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = translations.phoneInvalid;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
