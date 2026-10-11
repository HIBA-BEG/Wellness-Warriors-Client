import DashboardLayout, { PageHeader } from '../components/layout/DashboardLayout';
import EventCard from '../components/dashboard/EventCard';
import Pagination from '../components/common/Pagination';
import { TiPlusOutline } from 'react-icons/ti';
import { useEffect, useMemo, useState } from 'react';
import AddEventModal from '../components/dashboard/AddEventModal';
import { eventService } from '../services/eventService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaPrint } from 'react-icons/fa6';
import { useAuth } from '../contexts/AuthContext';
import { canManage } from '../utils/roles';
import { buildEventPrintHtml } from '../utils/printEvent';

const PAGE_SIZE = 9;

const Dashboard = ({ upcomingOnly = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const manager = canManage(user);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
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
    if (!user) {
      setLoading(false);
      return;
    }
    fetchEvents();
  }, [user]);

  useEffect(() => {
    setPage(1);
  }, [query, upcomingOnly]);

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const visibleEvents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const now = new Date();
    const filtered = events.filter((event) => {
      const hasStarted = new Date(event.startDate) <= now;
      if (upcomingOnly ? hasStarted : !hasStarted) return false;
      if (!needle) return true;
      return `${event.title} ${event.location} ${event.description}`.toLowerCase().includes(needle);
    });

    return [...filtered].sort((a, b) => {
      const aTime = new Date(a.startDate).getTime();
      const bTime = new Date(b.startDate).getTime();
      return upcomingOnly ? aTime - bTime : bTime - aTime;
    });
  }, [events, query, upcomingOnly]);

  const pageCount = Math.max(1, Math.ceil(visibleEvents.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageEvents = visibleEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePrint = () => {
    if (!selectedEvent) {
      alert('Please select an event to print');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      return;
    }

    printWindow.document.write(buildEventPrintHtml(selectedEvent));
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={
          <>
            Hello <span className="text-light-green">{user?.firstName || 'there'}</span>
          </>
        }
        subtitle={
          upcomingOnly ? 'Events that have not started yet' : 'Events that have already passed'
        }
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search events..."
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-black placeholder:text-gray-500 sm:w-80"
        />
        <button
          type="button"
          onClick={handlePrint}
          aria-label="Print event"
          className="flex items-center justify-center gap-2 rounded-lg bg-dark-green px-4 py-2 text-light-green"
        >
          <FaPrint size={18} />
          <span>Print</span>
        </button>
        {manager && !upcomingOnly && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded-lg bg-dark-green px-4 py-2 text-light-green"
          >
            <TiPlusOutline />
            <span className="ml-2">Add new event</span>
          </button>
        )}
      </PageHeader>

      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : pageEvents.length === 0 ? (
          <p className="text-gray-600">No events match this view.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pageEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEventUpdated={handleEventUpdated}
                onEventDeleted={handleEventDeleted}
                onEventSelected={setSelectedEvent}
                isSelected={selectedEvent?._id === event._id}
              />
            ))}
          </div>
        )}
        {!loading && <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />}
      </div>
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventAdded={handleEventAdded}
      />
    </DashboardLayout>
  );
};

export function UpcomingEvents() {
  return <Dashboard upcomingOnly />;
}

export default Dashboard;
