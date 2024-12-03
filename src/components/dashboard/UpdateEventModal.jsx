import { useEffect, useState } from 'react';
import { eventService } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import participantService from '../../services/participantService';
import LoadingSpinner from '../common/LoadingSpinner';

const EventStatus = {
  SCHEDULED: 'scheduled',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

const UpdateEventModal = ({ isOpen, onClose, onEventUpdated, event }) => {
  const { user } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    poster: '',
    status: EventStatus.SCHEDULED,
    organizer: user._id,
    participants: [],
  });

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await participantService.getAllParticipants();
        setParticipants(data);
      } catch (error) {
        setError('Failed to fetch participants');
        console.error('Error fetching participants:', error);
      }
    };

    if (isOpen) {
      fetchParticipants();
    }
  }, [isOpen]);

  useEffect(() => {
    if (event) {
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormData({
        title: event.title,
        description: event.description,
        startDate: formatDate(event.startDate),
        endDate: formatDate(event.endDate),
        location: event.location,
        poster: event.poster || '',
        status: event.status,
        organizer: user._id,
        participants: event.participants || [],
      });
      setSelectedParticipants(event.participants || []);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const updatedEvent = await eventService.updateEvent(event._id, {
        ...formData,
        participants: selectedParticipants.map((p) => p._id),
      });
      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      setError('Failed to update event');
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const response = await eventService.uploadFile(formData);
        setFormData((prev) => ({
          ...prev,
          poster: response.url,
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg shadow-lg border-2 border-light-green shadow-light-green w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-2 right-3"
          >
            ✕
          </button>
          <h2 className="text-2xl text-center font-bold text-light-green border-b-2 border-dark-green pb-4 mb-4">
            UPDATE EVENT
          </h2>
        </div>

        <div className="px-8 py-6 overflow-y-auto flex-1">
          {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Event Poster</label>
              <div className="mt-1 flex items-center space-x-4">
                <label
                  htmlFor="poster-upload"
                  className="cursor-pointer bg-light-gray text-dark-green px-4 py-2 rounded-md hover:bg-gray-200 text-sm"
                >
                  Choose File
                </label>
                <input
                  id="poster-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {formData.poster && (
                  <img
                    src={formData.poster}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {Object.values(EventStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="block font-medium text-gray-700">Participants</label>
              <div
                className="mt-1 p-2 border rounded-md cursor-pointer bg-light-gray text-dark-green text-sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedParticipants.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedParticipants.map((participant) => (
                      <span
                        key={participant._id}
                        className="bg-light-green text-dark-green px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {participant.firstName} {participant.lastName}
                      </span>
                    ))}
                  </div>
                ) : (
                  'Select participants'
                )}
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-light-gray text-dark-green border rounded-md shadow-lg max-h-60 overflow-auto">
                  {participants.map((participant) => (
                    <div
                      key={participant._id}
                      className={`p-2 cursor-pointer text-sm hover:bg-light-green-dark ${
                        selectedParticipants.some((p) => p._id === participant._id)
                          ? 'bg-light-green '
                          : ''
                      }`}
                      onClick={() => {
                        const isSelected = selectedParticipants.some(
                          (p) => p._id === participant._id
                        );
                        setSelectedParticipants(
                          isSelected
                            ? selectedParticipants.filter((p) => p._id !== participant._id)
                            : [...selectedParticipants, participant]
                        );
                      }}
                    >
                      {participant.firstName} {participant.lastName}
                    </div>
                  ))}
                </div>
              )}
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
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventModal;
