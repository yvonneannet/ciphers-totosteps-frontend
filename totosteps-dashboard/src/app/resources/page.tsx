"use client";
import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

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
  // Use initialResources to populate the state
  const [resources] = useState(initialResources);

  const handleAdd = () => {
    console.log('Add new resource');
  };

  const handleEdit = (id: string) => {
    console.log('Edit resource', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete resource', id);
  };

  return (
    <div className="flex">
      <Sidebar activeLink="/resources" />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Resources</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-purple-500">
            <div className="text-lg font-semibold flex-1">Resource ID</div>
            <div className="text-lg font-semibold flex-1">Resource Title</div>
            <div
              onClick={handleAdd}
              className="flex items-center cursor-pointer text-purple-700 hover:text-purple-900 transition duration-300"
              aria-label="Add Resource"
            >
              <PlusCircle size={24} className="mr-2" />
              <span className="text-lg font-semibold">Add</span>
            </div>
          </div>
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center px-6 py-4 border-b border-gray-200 last:border-b-0">
              <div className="text-gray-800 flex-1">{resource.id}</div>
              <div className="text-gray-800 flex-1">{resource.title}</div>
              <div className="flex items-center">
                <div
                  onClick={() => handleEdit(resource.id)}
                  className="text-purple-700 hover:text-purple-900 mr-4 cursor-pointer"
                  aria-label={`Edit Resource ${resource.id}`}
                >
                  <Edit size={24} />
                </div>
                <div
                  onClick={() => handleDelete(resource.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  aria-label={`Delete Resource ${resource.id}`}
                >
                  <Trash2 size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-600 leading-relaxed">
          This table shows the different resources offered in our mobile application. Here, you can add a new resource,
          delete an existing resource and also edit a resource.
        </p>
      </div>
    </div>
  );
};

export default Resources;
