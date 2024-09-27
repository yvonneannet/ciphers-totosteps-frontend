import { useState, useEffect } from 'react';

export const useResources = () => {
  const [resourcesCount, setResourcesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('https://totosteps-29a482165136.herokuapp.com/api/resources/');
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResourcesCount(data.length);
      } catch (err: any) {
        setError(err?.message ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { resourcesCount, loading, error };
};
