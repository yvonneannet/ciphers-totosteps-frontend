import React from 'react';

interface Milestone {
  id: string;
  category: string;
}

const milestones: Milestone[] = [
  { id: '001', category: 'Baby at 0-2 months' },
  { id: '002', category: 'Baby at 2-4 months' },
  { id: '003', category: 'Baby at 4-6 months' },
  { id: '004', category: 'Baby at 6-9 months' },
  { id: '005', category: 'Baby at 9- 12 months' },
  { id: '006', category: 'Baby at 12-15 months' },
];

const Milestones: React.FC = () => {
  const handleView = (id: string) => {
    // Implement view functionality
    console.log('View milestone', id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-12 gap-4 mb-4 font-semibold text-white pb-2" style={{ borderBottom: '2px solid #4C0033' }}>
        <div className="col-span-3" style={{ color: '#4C0033' }}>Milestone ID</div>
        <div className="col-span-6" style={{ color: '#4C0033' }}>Milestone Category</div>
        <div className="col-span-3"></div>
      </div>
      {milestones.map((milestone) => (
        <div key={milestone.id} className="grid grid-cols-12 gap-4 py-3 border-b border-gray-200 items-center">
          <div className="col-span-3 text-gray-800">{milestone.id}</div>
          <div className="col-span-6 text-gray-800">{milestone.category}</div>
          <div className="col-span-3 flex justify-end">
            <button
              onClick={() => handleView(milestone.id)}
              className="px-4 py-1 text-sm font-semibold text-white rounded-full"
              style={{ backgroundColor: '#FFA500' }}
            >
              View
            </button>
          </div>
        </div>
      ))}
      <p className="mt-6 text-sm text-gray-600">
        The number of users who have interacted with the different formats of our resources that are offered in the platform in the year 2024
      </p>
    </div>
  );
};

export default Milestones;