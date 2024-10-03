import { postUsers } from '../utils/fetchUsersList';
import {useState } from 'react';

import { User } from '../utils/types';
export const useUpdateUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const submitUser = async (details: User) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await postUsers(details);
      console.log('Submission successful:', result);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitUser, isSubmitting, error };
};

