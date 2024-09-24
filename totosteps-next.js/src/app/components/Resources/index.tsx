import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
}

const initialResources: Resource[] = [
  { id: '001', title: 'Parental tips at 1 year' },
  { id: '002', title: 'Children Physical Health' },
  { id: '003', title: 'Social-Emotional Development' },
  { id: '004', title: 'Early Intervention' },
  { id: '005', title: 'Transitions and Routines' },
  { id: '006', title: 'Safety' },
];

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const handleAdd = () => {
    // Implement add functionality
    console.log('Add new resource');
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit resource', id);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete resource', id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resources</h2>
        <button
          onClick={handleAdd}
          className="flex items-center text-purple-600 hover:text-purple-800"
        >
          <PlusCircle size={20} className="mr-1" />
          Add
        </button>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-4 font-semibold text-black border-b-2 pb-2" style={{ borderColor: '#4C0033' }}>
        <div className="col-span-3">Resource ID</div>
        <div className="col-span-7">Resource Title</div>
        <div className="col-span-2 text-right"></div>
      </div>
      {resources.map((resource, index) => (
        <div key={resource.id} className={`grid grid-cols-12 gap-4 py-4 ${index !== resources.length - 1 ? 'border-b border-gray-200' : ''} items-center`}>
          <div className="col-span-3 text-gray-800">{resource.id}</div>
          <div className="col-span-7 text-gray-800">{resource.title}</div>
          <div className="col-span-2 flex justify-end">
            <button
              onClick={() => handleEdit(resource.id)}
              className="text-blue-600 hover:text-blue-800 mr-3"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => handleDelete(resource.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
      <p className="mt-6 text-sm text-gray-600">
        This table shows the different resources offered in our mobile application. Here, you can add a new resource,
        delete an existing resource and also edit a resource.
      </p>
    </div>
  );
};

export default Resources;