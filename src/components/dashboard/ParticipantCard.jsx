import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import profileAvatar from '../../assets/profileAvatar.jpg';
import LoadingSpinner from '../common/LoadingSpinner';
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert';
import { useAuth } from '../../contexts/AuthContext';
import { canManage } from '../../utils/roles';

const ParticipantCard = ({ participant, onDelete, onUpdateClick }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await showConfirmDialog(
        'Delete Participant?',
        'This action cannot be undone!'
      );

      if (result.isConfirmed) {
        await onDelete(participant._id);
        await showSuccessAlert('Deleted!', 'Participant has been removed.');
      }
    } catch (err) {
      showErrorAlert('Error!', err.message || 'Failed to delete participant');
    } finally {
      setLoading(false);
    }
  };

  const gender = String(participant.gender || '').toLowerCase();
  const cardBackgroundClass =
    gender === 'woman' || gender === 'female'
      ? 'bg-pink-100'
      : gender === 'man' || gender === 'male'
        ? 'bg-blue-100'
        : 'bg-gray-100';

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`flex h-full min-h-[8.5rem] flex-col overflow-hidden rounded-lg shadow-lg shadow-dark-green transition-shadow duration-300 hover:shadow-xl ${cardBackgroundClass}`}
    >
      <div className="flex min-w-0 flex-row items-center">
        <img
          src={participant.profilePicture || profileAvatar}
          alt="Participant"
          className="m-3 h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 py-3 pr-3">
          <h3 className="truncate text-lg font-semibold text-light-green-dark">
            {participant.firstName} {participant.lastName}
          </h3>
          <p className="truncate text-sm text-gray-600" title={participant.email}>
            {participant.email}
          </p>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm px-4">{error}</div>}

      {canManage(user) && (
        <div className="p-4">
          <div className="flex gap-2 justify-end">
            <button
              className="text-light-green-dark hover:text-light-green"
              disabled={loading}
              onClick={onUpdateClick}
            >
              <FaEdit size={18} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleDelete}
              disabled={loading}
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantCard;
