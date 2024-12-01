import { useNavigate } from 'react-router-dom';
import { GrRun } from 'react-icons/gr';
import { MdEventAvailable } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import profileAvatar from '../../assets/profileAvatar.jpg';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="w-48 bg-dark-green max-h-screen p-4 m-3 rounded-lg flex flex-col justify-between ">
      <div className="flex justify-center items-center mb-8">
        <span className="text-light-green text-2xl mr-2">
          <GrRun />
        </span>
        <span className=" text-xl font-bold">
          {' '}
          <span className="text-light-green">Wellness</span> Warriors
        </span>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => navigate('/events')}
          className="flex flex-row m-auto gap-3 justify-center items-center"
        >
          <MdEventAvailable />
          <div>Events</div>
        </div>
        <div
          onClick={() => navigate('/participants')}
          className="flex flex-row m-auto gap-3 justify-center items-center"
        >
          <FaUsers />
          <div>Participants</div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex items-center">
          <img src={profileAvatar} alt="Profile" className="w-9 h-9 rounded-lg mr-3" />
          <div>
            <p className="text-white">
              {user.firstName} <span className="text-light-green">{user.lastName}</span>
            </p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
