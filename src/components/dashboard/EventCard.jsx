import { FaEdit, FaTrash } from 'react-icons/fa';
import sports from '../../assets/sports.jpg';
import { useState } from 'react';
import { eventService } from '../../services/eventService';
import UpdateEventModal from './UpdateEventModal';
import { useAuth } from '../../contexts/AuthContext';
import { canManage } from '../../utils/roles';
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert';

const EventCard = ({ event, onEventUpdated, onEventDeleted, onEventSelected, isSelected }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingAttendance, setIsUpdatingAttendance] = useState(false);
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
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    onEventSelected(event);
  };

  const organizerId = event.organizer?._id || event.organizer;
  const ownsEvent = String(user?._id) === String(organizerId);
  const showActions = canManage(user) && (user?.role === 'admin' || ownsEvent);
  const isParticipant = user?.role === 'participant';
  const isAttending = (event.participants || []).some(
    (person) => String(person?._id || person) === String(user?._id)
  );
  const hasEnded = event.status === 'completed' || new Date(event.endDate).getTime() <= Date.now();
  const isCancelled = event.status === 'cancelled';
  const registrationOpen = event.status === 'scheduled' && !hasEnded;
  const showAttended = isParticipant && isAttending && !registrationOpen && !isCancelled;
  const unavailableReason = (() => {
    if (!isParticipant || registrationOpen) return '';
    if (isCancelled) {
      return isAttending
        ? 'You were registered, but this event was cancelled.'
        : 'This event was cancelled, so joining is closed.';
    }
    if (!hasEnded && new Date(event.startDate).getTime() > Date.now()) {
      return 'Registration is closed.';
    }
    return '';
  })();

  const handleAttendance = async (e) => {
    e.stopPropagation();
    try {
      setIsUpdatingAttendance(true);
      const updated = isAttending
        ? await eventService.leaveEvent(event._id)
        : await eventService.joinEvent(event._id);
      onEventUpdated(updated);
      await showSuccessAlert(
        isAttending ? 'You left this event' : "You're registered",
        isAttending
          ? 'Your name was removed from the list.'
          : 'Your name is on the participant list.'
      );
    } catch (error) {
      const message = error?.message || 'Could not update your attendance';
      showErrorAlert('Error!', Array.isArray(message) ? message.join(' ') : message);
    } finally {
      setIsUpdatingAttendance(false);
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`h-full cursor-pointer rounded-lg ring-4 ring-offset-2 ${
          isSelected ? 'ring-dark-green' : 'ring-transparent'
        }`}
      >
        <div
          className={`flex h-full min-h-[26rem] flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl ${
            showAttended ? 'shadow-light-green ring-4 ring-light-green' : 'shadow-dark-green'
          }`}
        >
          <div className="relative">
            <img
              src={event.poster || sports}
              alt={event.title}
              className="h-44 w-full shrink-0 object-cover"
            />
            {showAttended && (
              <div className="absolute inset-x-0 bottom-0 bg-light-green py-2 text-center text-sm font-bold uppercase tracking-wide text-dark-green">
                You attended
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-snug text-light-green-dark">
                {event.title}
              </h3>
              {showActions && (
                <div className="flex shrink-0 gap-2">
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
            <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm text-black">
              {event.description}
            </p>
            <div className="mt-auto pt-2 text-sm text-gray-600">
              <p className="truncate">Location: {event.location}</p>
              <p>Status: {event.status}</p>
              <p>From: {formatDate(event.startDate)}</p>
              <p>To: {formatDate(event.endDate)}</p>
              <p>{event.participants?.length || 0} participants</p>
            </div>
            {isParticipant && registrationOpen && (
              <button
                type="button"
                onClick={handleAttendance}
                disabled={isUpdatingAttendance}
                className={`mt-3 w-full rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-40 ${
                  isAttending
                    ? 'bg-white text-red-600 ring-2 ring-red-500 hover:bg-red-50'
                    : 'bg-light-green text-dark-green hover:bg-dark-green hover:text-light-green'
                }`}
              >
                {isAttending ? 'Leave event' : 'Join event'}
              </button>
            )}
            {unavailableReason && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {unavailableReason}
              </p>
            )}
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
