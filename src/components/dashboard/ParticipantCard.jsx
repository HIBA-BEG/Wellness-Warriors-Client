import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import profileAvatar from '../../assets/profileAvatar.jpg';

const ParticipantCard = ({ participant, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this participant?')) {
      setLoading(true);
      try {
        await onDelete(participant._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 drop-shadow-2xl shadow-dark-green hover:shadow-light-green-dark">
      <div className="flex flex-row">
        <img src={profileAvatar} alt="Participant" className="w-24 h-24 rounded-md" />
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
          <button className="text-light-green-dark hover:text-light-green" disabled={loading}>
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
