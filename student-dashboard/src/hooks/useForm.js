import { useState, useCallback } from 'react';

/**
 * Custom Form Handling & Validation Hook for React
 * Implements standard form state architecture:
 * - values: form input values
 * - errors: field-level validation error messages
 * - touched: tracks which fields user interacted with
 * - validationRules: configurable rules (required, minLength, email, pattern, custom)
 */
export function useForm({ initialValues = {}, validationRules = {}, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback((name, value, allValues = values) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required check
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return rules.requiredMessage || `${rules.label || name} is required.`;
    }

    // Min Length
    if (rules.minLength && typeof value === 'string' && value.trim().length < rules.minLength) {
      return rules.minLengthMessage || `${rules.label || name} must be at least ${rules.minLength} characters.`;
    }

    // Email pattern check
    if (rules.isUniversityEmail) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@apex\.edu$/i;
      if (!emailRegex.test(value)) {
        return 'Must be a valid official email ending in @apex.edu';
      }
    } else if (rules.isEmail) {
      const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!generalEmailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }

    // Pattern regex check
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage || `Invalid ${rules.label || name} format.`;
    }

    // Match another field (e.g., password confirmation)
    if (rules.matchField) {
      if (value !== allValues[rules.matchField]) {
        return rules.matchMessage || 'Fields do not match.';
      }
    }

    // Custom validator function
    if (typeof rules.validate === 'function') {
      const customErr = rules.validate(value, allValues);
      if (customErr) return customErr;
    }

    return '';
  }, [validationRules, values]);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setValues((prev) => {
      const nextValues = { ...prev, [name]: finalValue };
      // Validate on change if touched
      if (touched[name]) {
        const error = validateField(name, finalValue, nextValues);
        setErrors((prevErr) => ({ ...prevErr, [name]: error }));
      }
      return nextValues;
    });
  }, [touched, validateField]);

  // Handle direct field set
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (touched[name]) {
        const error = validateField(name, value, next);
        setErrors((prevErr) => ({ ...prevErr, [name]: error }));
      }
      return next;
    });
  }, [touched, validateField]);

  // Handle blur (mark as touched and validate)
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    const newTouched = {};
    let hasError = false;

    Object.keys(validationRules).forEach((name) => {
      newTouched[name] = true;
      const error = validateField(name, values[name], values);
      if (error) {
        newErrors[name] = error;
        hasError = true;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);
    return !hasError;
  }, [validationRules, validateField, values]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validateAll, onSubmit, values]);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    isValid: Object.values(errors).every((err) => !err),
  };
}
