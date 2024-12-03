import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background1 from '../../assets/background1.jpeg';
import { useAuth } from '../../contexts/AuthContext';

const UserRole = {
  ORGANIZER: 'organizer',
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: UserRole.ORGANIZER,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Register data:', formData);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 7 || formData.password.length > 32) {
      setError('Password must be between 7 and 32 characters long');
      return;
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      navigate('/events');
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center px-4">
      <img
        src={background1}
        alt="background1"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 "
      />
      <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-70 z-0"></div>
      <div className="fixed max-w-md w-full space-y-8 bg-white bg-opacity-80 p-8 rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-green">Hello Organizer</h2>
          <h2 className="text-3xl font-bold text-dark-green">Create an Account</h2>
          <p className="mt-2 text-gray-600">Join our wellness community today as an organizer</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
            <label htmlFor="role" className="hidden font-medium text-dark-green">
              Role
            </label>
            <input
              id="role"
              type="text"
              required
              className="hidden w-full text-sm text-dark-green px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-light-green"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
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
