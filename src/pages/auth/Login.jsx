import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background1 from '../../assets/background1.webp';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate('/events');
    } catch (error) {
      setError(error.message || 'Login failed');
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
          <h2 className="text-3xl font-bold text-dark-green">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

          {import.meta.env.VITE_ENABLE_FORGOT_PASSWORD === 'true' && (
            <div className="flex items-center justify-end">
              <div
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-my-orange hover:text-light-green-dark"
              >
                Forgot password?
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold rounded-lg 
              bg-light-green hover:bg-light-green-dark transition-colors duration-200 
              focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-opacity-50"
          >
            Sign in
          </button>

          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?
            <div
              onClick={() => navigate('/register')}
              className="text-my-orange hover:text-light-green-dark font-medium"
            >
              Sign up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
