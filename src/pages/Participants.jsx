import { useEffect, useMemo, useState } from 'react';
import DashboardLayout, { PageHeader } from '../components/layout/DashboardLayout';
import ParticipantCard from '../components/dashboard/ParticipantCard';
import Pagination from '../components/common/Pagination';
import { TiPlusOutline } from 'react-icons/ti';
import AddParticipantModal from '../components/dashboard/AddParticipantModal';
import participantService from '../services/participantService';
import UpdateParticipantModal from '../components/dashboard/UpdateParticipantModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { canManage } from '../utils/roles';

const PAGE_SIZE = 12;

const Participants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState('all');
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const manager = canManage(user);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const data = await participantService.getAllParticipants();
      const sortedParticipants = data.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      );
      setParticipants(sortedParticipants);
    } catch (err) {
      setError(err.message || 'Failed to fetch participants');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (participant) => {
    setSelectedParticipant(participant);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    fetchParticipants();
    setIsUpdateModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await participantService.deleteParticipant(id);
      setParticipants((current) => current.filter((participant) => participant._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete participant');
    }
  };

  useEffect(() => {
    if (!manager) {
      setLoading(false);
      return;
    }
    fetchParticipants();
  }, [manager]);

  useEffect(() => {
    setPage(1);
  }, [query, gender]);

  const visibleParticipants = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return participants.filter((participant) => {
      const value = String(participant.gender || '').toLowerCase();
      if (gender === 'woman' && value !== 'woman' && value !== 'female') return false;
      if (gender === 'man' && value !== 'man' && value !== 'male') return false;
      if (!needle) return true;
      return `${participant.firstName} ${participant.lastName} ${participant.email}`
        .toLowerCase()
        .includes(needle);
    });
  }, [participants, query, gender]);

  const pageCount = Math.max(1, Math.ceil(visibleParticipants.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageParticipants = visibleParticipants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title={
          <>
            Hello <span className="text-light-green">W-Organizer</span>
          </>
        }
        subtitle="Blue cards are men. Pink cards are women."
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search participants..."
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-black placeholder:text-gray-500 sm:w-80"
        />
        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          aria-label="Filter by gender"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark-green"
        >
          <option value="all">All genders</option>
          <option value="woman">Women</option>
          <option value="man">Men</option>
        </select>
        {manager && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded-lg bg-dark-green px-4 py-2 text-light-green"
          >
            <TiPlusOutline />
            <span className="ml-2">Add new Participant</span>
          </button>
        )}
      </PageHeader>

      <div className="p-4 sm:p-6">
        {!manager ? (
          <p className="text-gray-600">Organizer tools are available on organizer accounts.</p>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : pageParticipants.length === 0 ? (
          <p className="text-gray-600">No participants match this filter.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pageParticipants.map((participant) => (
              <ParticipantCard
                key={participant._id}
                participant={participant}
                onDelete={handleDelete}
                onRefresh={fetchParticipants}
                onUpdateClick={() => handleUpdateClick(participant)}
              />
            ))}
          </div>
        )}
        {manager && !error && (
          <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />
        )}
      </div>
      <AddParticipantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchParticipants}
      />
      <UpdateParticipantModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={handleUpdateSuccess}
        participant={selectedParticipant}
      />
    </DashboardLayout>
  );
};

export default Participants;
