import Sidebar from '../components/layout/Sidebar';
import EventCard from '../components/dashboard/EventCard';
import { TiPlusOutline } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import AddEventModal from '../components/dashboard/AddEventModal';
import { eventService } from '../services/eventService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaPrint } from 'react-icons/fa6';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      const sortedEvents = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log('all events', data);
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(events.map((event) => (event._id === updatedEvent._id ? updatedEvent : event)));
  };

  const handleEventDeleted = (deletedEventId) => {
    setEvents(events.filter((event) => event._id !== deletedEventId));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const handlePrint = () => {
    if (!selectedEvent) {
      alert('Please select an event to print');
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedEvent.title} - Event Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2C5F2D; }
            .section { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${selectedEvent.title}</h1>
          <div class="section">
            <h2>Event Details</h2>
            <p>From: ${new Date(selectedEvent.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          <p>To: ${new Date(selectedEvent.endDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
            <p>Location: ${selectedEvent.location}</p>
            <p>Description: ${selectedEvent.description}</p>
          </div>
          <div class="section">
            <h2>Participants</h2>
            <ul>
              ${
                selectedEvent.participants
                  ?.map(
                    (participant) => `<li>${participant.firstName} ${participant.lastName}</li>`
                  )
                  .join('') || 'No participants yet'
              }
            </ul>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleEventSelected = (event) => {
    console.log('Setting selected event:', event.title);

    setSelectedEvent(event);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h1 className="text-4xl text-black font-semibold">
              Hello <span className="text-light-green">W-Organizer</span>
            </h1>
            <i className="feather-chevron-down ml-2"></i>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="search"
                placeholder="Search anything in Wellness Warriors..."
                className="w-80 px-4 py-2 rounded-lg bg-gray-100"
              />
              <i className="feather-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            <button
              onClick={handlePrint}
              className="mr-4 p-2 text-light-green-dark hover:bg-dark-green hover:text-light-green rounded-full "
            >
              <FaPrint size={32} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-dark-green text-light-green px-4 py-2 rounded-lg flex items-center"
            >
              <TiPlusOutline />
              <span className="ml-2">Add new event</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 mb-6">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEventUpdated={handleEventUpdated}
                  onEventDeleted={handleEventDeleted}
                  onEventSelected={handleEventSelected}
                  isSelected={selectedEvent?._id === event._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventAdded={handleEventAdded}
      />
    </div>
  );
};

export default Dashboard;
