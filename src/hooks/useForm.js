import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prevErrors) => {
      if (value.trim() !== "" && prevErrors[field]) {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      }
      return prevErrors;
    });

    if (field === "dob" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};
