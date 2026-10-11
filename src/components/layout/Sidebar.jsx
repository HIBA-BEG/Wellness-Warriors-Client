import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GrLogout, GrRun } from 'react-icons/gr';
import { MdEventAvailable } from 'react-icons/md';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import profileAvatar from '../../assets/profileAvatar.jpg';
import { useAuth } from '../../contexts/AuthContext';
import { canManage } from '../../utils/roles';

const links = [
  { to: '/events', label: 'Events', icon: MdEventAvailable },
  { to: '/upcoming', label: 'Upcoming', icon: FaCalendarAlt },
];

function labelFor(value) {
  if (!value) return 'Not set';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const manager = canManage(user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState({ top: 0, left: 0 });
  const profileRef = useRef(null);
  const popupRef = useRef(null);

  const go = (path) => {
    setProfileOpen(false);
    navigate(path);
    onNavigate?.();
  };

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/login');
    onNavigate?.();
  };

  const toggleProfile = () => {
    const rect = profileRef.current?.getBoundingClientRect();
    if (rect) {
      const popupHeight = 280;
      const top = Math.min(rect.top, window.innerHeight - popupHeight - 16);
      setPopupStyle({ top: Math.max(16, top), left: rect.right + 12 });
    }
    setProfileOpen((open) => !open);
  };

  useEffect(() => {
    if (!profileOpen) return undefined;

    const closeOnOutside = (event) => {
      const target = event.target;
      if (profileRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      setProfileOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setProfileOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [profileOpen]);

  const itemClass = (path) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-2 cursor-pointer ${
      location.pathname === path ? 'bg-white/10 text-light-green' : 'text-white'
    }`;

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-dark-green p-4 text-white">
      <div className="mb-8 flex items-center">
        <span className="mr-2 text-2xl text-light-green">
          <GrRun />
        </span>
        <span className="text-xl font-bold leading-tight">
          <span className="text-light-green">Wellness</span> Warriors
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <div key={link.to} onClick={() => go(link.to)} className={itemClass(link.to)}>
            <link.icon />
            <span>{link.label}</span>
          </div>
        ))}
        {manager && (
          <div onClick={() => go('/participants')} className={itemClass('/participants')}>
            <FaUsers />
            <span>Participants</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-8">
        <button
          type="button"
          ref={profileRef}
          onClick={toggleProfile}
          className="flex w-full min-w-0 items-center rounded-lg p-1 text-left hover:bg-white/10"
          aria-expanded={profileOpen}
          aria-label="Open profile"
        >
          <img
            src={user?.profilePicture || profileAvatar}
            alt=""
            className="mr-3 h-9 w-9 shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm text-white">
              {user?.firstName} <span className="text-light-green">{user?.lastName}</span>
            </span>
            <span className="block truncate text-xs text-gray-400">{user?.email}</span>
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center rounded-md bg-light-green px-4 py-2 text-dark-green transition-colors duration-200 hover:bg-white"
        >
          Logout
          <GrLogout className="ml-2" />
        </button>
      </div>

      {profileOpen && user && (
        <div
          ref={popupRef}
          style={{ top: popupStyle.top, left: popupStyle.left }}
          className="fixed z-50 w-max max-w-[18rem] rounded-xl bg-dark-green p-4 text-white shadow-2xl ring-1 ring-white/10"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.profilePicture || profileAvatar}
              alt=""
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-semibold">
                {user.firstName} <span className="text-light-green">{user.lastName}</span>
              </p>
              <p className="text-xs text-light-green">{labelFor(user.role)}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-xs text-gray-400">Email</dt>
              <dd className="break-words">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Gender</dt>
              <dd>{labelFor(user.gender)}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
