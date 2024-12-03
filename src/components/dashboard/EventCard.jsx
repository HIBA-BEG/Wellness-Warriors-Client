import { FaEdit, FaTrash } from 'react-icons/fa';
import yogacourse from '../../assets/yogacourse.jpg';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 drop-shadow-2xl shadow-dark-green hover:shadow-light-green-dark">
      <img
        src={event.poster || yogacourse}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-light-green-dark">{event.title}</h3>
          <div className="flex gap-2">
            <button className="text-light-green-dark hover:text-light-green">
              <FaEdit size={18} />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrash size={18} />
            </button>
          </div>
        </div>
        <p className="mt-2 text-black">{event.description}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>Location: {event.location}</p>
          <p>From: {formatDate(event.startDate)}</p>
          <p>To: {formatDate(event.endDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
