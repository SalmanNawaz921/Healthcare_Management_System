import { useState } from "react";

export const useMultiStepForm = (steps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState([]);

  const previousStep = () => {
    return currentStep > 0 && setCurrentStep((prev) => prev - 1);
  };
  const nextStep = () => {
    return currentStep < steps.length && setCurrentStep((prev) => prev + 1);
  };

  const gotoStep = (index) => {
    setCurrentStep(index);
  };

  const updateFormValues = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const getFormValues = () => {
    return formValues;
  };
  return {
    currentStep,
    previousStep,
    nextStep,
    gotoStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length,
    step: steps[currentStep],
    steps,
    updateFormValues,
    getFormValues,
  };
};
