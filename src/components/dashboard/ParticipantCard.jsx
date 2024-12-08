import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import profileAvatar from '../../assets/profileAvatar.jpg';
import LoadingSpinner from '../common/LoadingSpinner';
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert';

const ParticipantCard = ({ participant, onDelete, onUpdateClick }) => {
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

  const cardBackgroundClass = participant.gender === 'man' ? 'bg-blue-100' : 'bg-pink-100';

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 drop-shadow-2xl shadow-dark-green hover:shadow-light-green-dark ${cardBackgroundClass}`}
    >
      <div className="flex flex-row">
        <img
          src={participant.profilePicture || profileAvatar}
          alt="Participant"
          className="w-24 h-24 rounded-md"
        />
        <div className="flex flex-col w-full p-4">
          <h3 className="text-xl font-semibold text-light-green-dark">
            {participant.firstName} {participant.lastName}
          </h3>
          <p className="text-gray-600 text-sm">{participant.email}</p>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm px-4">{error}</div>}

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
    </div>
  );
};

export default ParticipantCard;
