import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { showErrorAlert, showSuccessAlert } from '../../utils/sweetAlert';

const UserRole = {
  PARTICIPANT: 'participant',
};

const UserGender = {
  Man: 'man',
  Woman: 'woman',
};

const AddParticipantModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { createParticipant } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: UserRole.PARTICIPANT,
    gender: '',
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Created Participant:', formData);
    try {
      if (!formData.profilePicture) {
        setError('Please select a profile picture');
        return;
      }

      const participantData = new FormData();
      participantData.append('firstName', formData.firstName);
      participantData.append('lastName', formData.lastName);
      participantData.append('email', formData.email);
      participantData.append('password', formData.password);
      participantData.append('role', UserRole.PARTICIPANT);
      participantData.append('genre', formData.gender);
      participantData.append('profilePicture', formData.profilePicture);

      await createParticipant(participantData);

      await showSuccessAlert('Success!', 'Participant created successfully');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: UserRole.PARTICIPANT,
        gender: '',
        profilePicture: null,
      });
      setPreviewUrl(null);

      onSuccess();
      onClose();
    } catch (error) {
      showErrorAlert('Error!', error.message || 'Failed to create participant');
    } finally {
      setLoading(false);
    }
  };

  const cleanup = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg px-8 py-6 shadow-lg border-2 border-light-green shadow-light-green max-w-2xl max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-2 right-3"
          >
            ✕
          </button>
          <h2 className="text-2xl text-center font-bold text-light-green border-b-2 border-dark-green pb-4 mb-4 ">
            ADD NEW PARTICIPANT
          </h2>
        </div>

        <div className="px-8 py-6 overflow-y-auto flex-1">
          {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <label className="w-32 h-32 rounded-full border-2 border-dashed border-light-green hover:border-dark-green cursor-pointer flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <i className="fas fa-camera mb-2"></i>
                    <p>Upload Photo</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <label className="block font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label className="hidden font-medium text-gray-700 ">Role</label>
              <textarea
                rows="3"
                className="hidden mt-1 w-full text-sm bg-light-gray text-dark-green  rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Gender</label>
              <select
                className="mt-1 block w-full text-sm bg-light-gray text-dark-green rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value={UserGender.Man}>Man</option>
                <option value={UserGender.Woman}>Woman</option>
              </select>
            </div>

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
                Create Participant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddParticipantModal;
