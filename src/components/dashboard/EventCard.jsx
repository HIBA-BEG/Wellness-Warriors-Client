import { FaEdit, FaTrash } from 'react-icons/fa';
import sports from '../../assets/sports.jpg';
import { useState } from 'react';
import { eventService } from '../../services/eventService';
import UpdateEventModal from './UpdateEventModal';
import { useAuth } from '../../contexts/AuthContext';
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert';

const EventCard = ({ event, onEventUpdated, onEventDeleted, onEventSelected, isSelected }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await showConfirmDialog('Delete Event?', 'This action cannot be undone!');
      if (result.isConfirmed) {
        await eventService.deleteEvent(event._id);
        onEventDeleted(event._id);
        await showSuccessAlert('Deleted!', 'Event has been removed.');
      }
    } catch (error) {
      showErrorAlert('Error!', error.message || 'Failed to delete event');
    } finally {
      setIsDeleting(false);
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleCardClick = (e) => {
    console.log('Card clicked:', event.title);

    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    onEventSelected(event);
  };

  const isOrganizer = user?._id === event.organizer._id;
  console.log('isOrganizer', isOrganizer);
  console.log('user?._id', user?._id);
  console.log('event.organizer.id', event.organizer._id);
  console.log('event', event);
  console.log('event.organizer', event.organizer);

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`p-4 rounded-lg shadow-md cursor-pointer ${
          isSelected ? 'border-4 border-dark-green shadow-dark-green shadow-inner' : ''
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 drop-shadow-2xl shadow-dark-green hover:shadow-light-green-dark">
          <img
            src={event.poster || sports}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-light-green-dark">{event.title}</h3>
              {isOrganizer && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUpdateModalOpen(true);
                    }}
                    className="text-light-green-dark hover:text-light-green"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className={`text-red-500 hover:text-red-700 ${isDeleting ? 'opacity-50' : ''}`}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-2 text-black">{event.description}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Location: {event.location}</p>
              <p>From: {formatDate(event.startDate)}</p>
              <p>To: {formatDate(event.endDate)}</p>
            </div>
          </div>
        </div>
        <UpdateEventModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onEventUpdated={onEventUpdated}
          event={event}
        />
      </div>
    </>
  );
};

export default EventCard;
