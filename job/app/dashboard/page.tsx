'use client';
import { useState } from 'react';
import CreatedJob from '@/components/dashboard/created_job';
import Applicants from '@/components/dashboard/aplicants';
  export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('applicants');

  // login page khulega 
  return (
    <div className="w-full">
      <div className="py-20">
        <div className="flex justify-center space-x-40 ">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors" 
            onClick={() => setActiveTab('created_job')}>Create Job +
          </div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors" 
          onClick={() => setActiveTab('applicants')}> 
          Applicants</div>
        </div>
        <div className="mt-10 w-full">
          {activeTab !== 'applicants' ? <CreatedJob /> : <Applicants />}
        </div>
      </div>
    </div>
  );
}

