import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background1 from '../../assets/background1.webp';
import { useAuth } from '../../contexts/AuthContext';

const UserGender = {
  MAN: 'man',
  WOMAN: 'woman',
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    profilePicture: null,
  });

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

    if (formData.password.length < 7 || formData.password.length > 32) {
      setError('Password must be between 7 and 32 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.gender) {
      setError('Please select your gender');
      return;
    }

    try {
      const userData = new FormData();

      // Append all non-file fields
      userData.append('firstName', formData.firstName);
      userData.append('lastName', formData.lastName);
      userData.append('email', formData.email);
      userData.append('password', formData.password);
      userData.append('gender', formData.gender);

      if (formData.profilePicture instanceof File) {
        userData.append('profilePicture', formData.profilePicture);
      }

      await register(userData);
      navigate('/events');
    } catch (error) {
      setError(error?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-light-gray px-4 py-6">
      <img
        src={background1}
        alt="background1"
        className="fixed inset-0 h-full w-full object-cover"
      />
      <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-70 z-0"></div>
      <div className="relative z-10 my-6 w-full max-w-md max-h-[92vh] space-y-8 overflow-y-auto rounded-xl bg-white bg-opacity-80 p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-green">Create an Account</h2>
          <p className="mt-2 text-gray-600">Join our wellness community today</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            <label className="w-32 h-32 rounded-full border-2 border-dashed border-light-green-dark hover:border-dark-green cursor-pointer flex items-center justify-center overflow-hidden">
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
                  <p className="text-xs">(Optional)</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName" className="block font-medium text-dark-green">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-light-green"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="block font-medium text-dark-green">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                className="w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-light-green"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="gender" className="block font-medium text-dark-green">
              Gender
            </label>
            <select
              id="gender"
              className="w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-light-green"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value={UserGender.MAN}>Man</option>
              <option value={UserGender.WOMAN}>Woman</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block font-medium text-dark-green">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-light-green"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block font-medium text-dark-green">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-light-green"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block font-medium text-dark-green">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-light-green"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold rounded-lg 
              bg-light-green hover:bg-light-green-dark transition-colors duration-200 
              focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-opacity-50"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?
            <div
              onClick={() => navigate('/login')}
              className="text-my-orange hover:text-light-green-dark font-medium"
            >
              Sign in
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
