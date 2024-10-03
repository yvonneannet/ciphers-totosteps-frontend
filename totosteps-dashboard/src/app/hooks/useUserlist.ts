import { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../utils/fetchUsersList';
import { User } from '../utils/types';

const USERS_API_ENDPOINT = '/api/users'; 

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
     
      const fetchUsers = await fetchData(USERS_API_ENDPOINT);
      if (fetchUsers && fetchUsers.users) {
        setUsers(fetchUsers.users); 
      } else {
        setError('No users found in the response');
      }
    } catch (err) {
      console.error('Error in useUsers hook:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { users, loading, error, refetch: loadUsers };
};
