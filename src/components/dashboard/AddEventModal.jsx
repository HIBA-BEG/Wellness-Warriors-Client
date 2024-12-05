import { useEffect, useState } from 'react';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import participantService from '../../services/participantService';
import LoadingSpinner from '../common/LoadingSpinner';

const EventStatus = {
  SCHEDULED: 'scheduled',
};

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const { user } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // console.log('Organizer ID:', user._id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    poster: '',
    status: EventStatus.SCHEDULED,
    organizer: user._id,
  });
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const data = await participantService.getAllParticipants();
        console.log('Fetched participants 2:', data);
        setParticipants(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch participants');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchParticipants();
    }
  }, [isOpen]);

  const handleParticipantSelect = (participant) => {
    if (!selectedParticipants.find((p) => p._id === participant._id)) {
      const updatedParticipants = [...selectedParticipants, participant];
      setSelectedParticipants(updatedParticipants);
      setFormData({
        ...formData,
        participants: updatedParticipants.map((p) => p._id),
      });
    }
    setIsDropdownOpen(false);
  };

  const removeParticipant = (participantId) => {
    const updatedParticipants = selectedParticipants.filter((p) => p._id !== participantId);
    setSelectedParticipants(updatedParticipants);
    setFormData({
      ...formData,
      participants: updatedParticipants.map((p) => p._id),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const eventData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      const newEvent = await eventService.createEvent(eventData);
      console.log(newEvent);
      onEventAdded?.(newEvent);
      onClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (!isOpen) return null;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg px-8 py-6 shadow-lg border-2 border-light-green shadow-light-green max-w-2xl max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-5"
          >
            ✕
          </button>
          <h2 className="text-2xl text-center font-bold text-light-green border-b-2 border-dark-green pb-4 mb-4 ">
            ADD NEW EVENT
          </h2>
        </div>
        <div className="px-8 py-6 overflow-y-auto flex-1">
          {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Description</label>
              <textarea
                rows="3"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="relative">
              <label className="block font-medium text-gray-700">Participants</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {selectedParticipants.map((participant) => (
                  <div
                    key={participant._id}
                    className="bg-light-green text-dark-green px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>
                      {participant.firstName} {participant.lastName}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeParticipant(participant._id)}
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="mt-1 w-full text-sm bg-light-gray text-dark-green rounded-md border border-gray-300 px-3 py-2 cursor-pointer"
              >
                Add participants...
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full text-dark-green bg-light-gray border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {participants
                    .filter(
                      (participant) => !selectedParticipants.find((p) => p._id === participant._id)
                    )
                    .map((participant) => (
                      <div
                        key={participant._id}
                        className="px-4 py-2 hover:bg-light-gray cursor-pointer"
                        onClick={() => handleParticipantSelect(participant)}
                      >
                        {participant.firstName} {participant.lastName} ({participant.email})
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Poster URL</label>
              <input
                type="text"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-light-green rounded-md hover:bg-dark-green hover:shadow-light-green-dark hover:shadow-md"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
