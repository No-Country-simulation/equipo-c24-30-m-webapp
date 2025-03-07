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
      
      const requiredFields = {
        shelterName: userData.shelterName,
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone,
        shelterEmail: userData.shelterEmail,
        shelterPhone: userData.shelterPhone,
        address: userData.address && userData.address.street && userData.address.city && userData.address.province && userData.address.country
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