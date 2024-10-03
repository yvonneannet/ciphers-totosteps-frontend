import { useState, useEffect } from 'react';

export const useMilestones = () => {
  const [milestonesCount, setMilestonesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch('https://totosteps-29a482165136.herokuapp.com/api/milestones/');
        if (!response.ok) throw new Error('Failed to fetch milestones');
        const data = await response.json();
        setMilestonesCount(data.length);
      } catch (err: unknown) { 
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  return { milestonesCount, loading, error };
};
