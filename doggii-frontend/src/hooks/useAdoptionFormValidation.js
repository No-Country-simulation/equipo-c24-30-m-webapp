import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import formServices from '../services/formServices';

export const useAdoptionFormValidation = () => {
  const user = useSelector(state => state.user);
  const [isValidating, setIsValidating] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const checkFormExists = useCallback(async () => {
    try {
      setIsValidating(true);
      const response = await formServices.getAdoptionForm(user.id);
      return response.success;
    } catch (error) {
      console.error('Error checking form:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [user.id]);

  return {
    isValidating,
    showFormModal,
    setShowFormModal,
    checkFormExists
  };
};