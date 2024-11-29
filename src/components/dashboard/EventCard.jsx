import { FaEdit, FaTrash } from 'react-icons/fa';
import yogacourse from '../../assets/yogacourse.jpg';

const EventCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 drop-shadow-2xl shadow-dark-green hover:shadow-light-green-dark">
      <img src={yogacourse} alt="Event" className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-light-green-dark">Yoga Workshop</h3>
          <div className="flex gap-2">
            <button className="text-light-green-dark hover:text-light-green">
              <FaEdit size={18} />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrash size={18} />
            </button>
          </div>
        </div>
        <p className="mt-2 text-black">
          Join us for a relaxing yoga session designed for all skill levels. Learn proper techniques
          and improve your flexibility.
        </p>
      </div>
    </div>
  );
};

export default EventCard;
