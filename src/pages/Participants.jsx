import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ParticipantCard from '../components/dashboard/ParticipantCard';
import { TiPlusOutline } from 'react-icons/ti';
import AddParticipantModal from '../components/dashboard/AddParticipantModal';
import participantService from '../services/participantService';
import UpdateParticipantModal from '../components/dashboard/UpdateParticipantModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Participants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const data = await participantService.getAllParticipants();
      // console.log('Fetched participants 2:', data);
      setParticipants(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch participants');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (participant) => {
    console.log('Selected participant:', participant);
    setSelectedParticipant(participant);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    fetchParticipants();
    setIsUpdateModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await participantService.deleteParticipant(id);
      setParticipants(participants.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete participant');
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  if (loading) return <LoadingSpinner />;
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
          {loading ? (
            <div className="text-center">Loading participants...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-3 gap-6 mb-6">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant._id}
                  participant={participant}
                  onDelete={handleDelete}
                  onRefresh={fetchParticipants}
                  onUpdateClick={() => handleUpdateClick(participant)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <AddParticipantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchParticipants}
      />
      <UpdateParticipantModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        participant={selectedParticipant}
      />
    </div>
  );
};

export default Participants;
