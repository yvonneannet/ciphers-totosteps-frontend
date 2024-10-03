import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchUsersList';
import { User } from '../utils/types';

export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await fetchData('/api/users');
        console.log('Fetched users:', result);
        setData(result?.users);
      } catch (err: unknown) {
        console.error('Error fetching users:', err); 
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return { data, isLoading, error };
};







