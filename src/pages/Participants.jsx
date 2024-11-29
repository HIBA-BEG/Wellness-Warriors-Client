import Sidebar from '../components/layout/Sidebar';
import ParticipantCard from '../components/dashboard/ParticipantCard';
import { useState } from 'react';
import { TiPlusOutline } from 'react-icons/ti';
import AddParticipantModal from '../components/dashboard/AddParticipantModal';

const Participants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h1 className="text-4xl text-black font-semibold">
              Hello <span className="text-light-green">W-Organizer</span>
            </h1>
            <i className="feather-chevron-down ml-2"></i>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="search"
                placeholder="Search anything in Wellness Warriors..."
                className="w-80 px-4 py-2 rounded-lg bg-gray-100"
              />
              <i className="feather-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            <button className="mr-4">
              <i className="feather-printer"></i>
            </button>
            <button className="mr-4">
              <i className="feather-settings"></i>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-dark-green text-light-green px-4 py-2 rounded-lg flex items-center"
            >
              <TiPlusOutline />
              <span className="ml-2">Add new event</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <ParticipantCard />
            <ParticipantCard />
            <ParticipantCard />
          </div>
        </div>
      </div>
      <AddParticipantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Participants;
