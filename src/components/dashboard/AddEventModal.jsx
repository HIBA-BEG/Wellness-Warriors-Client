import { useState } from 'react';

const AddEventModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    poster: '',
    status: EventStatus.SCHEDULED,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-70 flex items-center justify-center z-50">
      {/* <div className="bg-dark-green rounded-lg p-6 w-full max-w-2xl shadow-light-green-dark shadow-2xl"> */}
      <div className="bg-white relative rounded-lg px-8 py-6 shadow-lg border-2 border-light-green shadow-light-green">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-4 right-5"
        >
          ✕
        </button>
        <h2 className="text-2xl text-center font-bold text-light-green border-b-2 border-dark-green pb-4 mb-4 ">
          ADD NEW EVENT
        </h2>

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

          <div>
            <label className="block font-medium text-gray-700">Poster URL</label>
            <input
              type="text"
              className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
            />
          </div>

          {/* <div>
            <label className="block font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div> */}

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
  );
};

export default AddEventModal;
