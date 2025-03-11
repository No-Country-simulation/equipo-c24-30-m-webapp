import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import userServices from '../services/userServices';

export const useProfileValidation = () => {
  const user = useSelector((state) => state.user);
  const [isValidating, setIsValidating] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const checkProfileCompletion = useCallback(async () => {
    try {
      setIsValidating(true);
      const response = await userServices.getUser(user.id, user.role);
      const userData = response.payload;

      const baseFields = {
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address && userData.address.street && userData.address.city && userData.address.province && userData.address.country
      };

      const shelterFields = user.role === 'shelter' 
        ? {
            shelterName: userData.shelterName,
            shelterEmail: userData.shelterEmail,
            shelterPhone: userData.shelterPhone
          }
        : {};

      const requiredFields = {
        ...baseFields,
        ...shelterFields
      };

      return Object.values(requiredFields).every(field => field);
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [user.id, user.role]);

  return {
    isValidating,
    showProfileModal,
    setShowProfileModal,
    checkProfileCompletion
  };
};