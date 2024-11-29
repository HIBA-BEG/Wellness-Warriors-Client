import { FaEdit, FaTrash } from 'react-icons/fa';
import profileAvatar from '../../assets/profileAvatar.jpg';

const ParticipantCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 drop-shadow-2xl shadow-dark-green hover:shadow-light-green-dark">
      <div className="flex flex-row">
        <img src={profileAvatar} alt="Participant" className="w-24 h-24 rounded-md" />
        <div className="flex  w-full p-4">
          <h3 className="text-xl font-semibold text-light-green-dark">Hiyub Hiba</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="mt-2 text-black">
          Join us for a relaxing yoga session designed for all skill levels. Learn proper techniques
          and improve your flexibility.
        </p>
        <div className="flex gap-2 justify-end">
          <button className="text-light-green-dark hover:text-light-green">
            <FaEdit size={18} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
