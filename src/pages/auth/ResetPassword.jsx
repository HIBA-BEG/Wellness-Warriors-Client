import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import background1 from '../../assets/background1.webp';
import authService from '../../services/authService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('This reset link is missing a token.');
      return;
    }

    if (password.length < 7 || password.length > 72) {
      setError('Password must be between 7 and 72 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await authService.resetPassword(token, password);
      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || 'Password reset failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-light-gray px-4 py-6">
      <img
        src={background1}
        alt="background1"
        className="fixed inset-0 h-full w-full object-cover"
      />
      <div className="fixed inset-0 z-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div className="relative z-10 my-6 w-full max-w-md max-h-[92vh] space-y-8 overflow-y-auto rounded-xl bg-white bg-opacity-80 p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-green">Choose a new password</h2>
          <p className="mt-2 text-gray-600">
            {isSubmitted
              ? 'Your password has been updated.'
              : 'Enter a new password for your account.'}
          </p>
        </div>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-dark-green">
                New password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-green"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-dark-green"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-green"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold rounded-lg bg-light-green hover:bg-light-green-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-opacity-50"
            >
              Update password
            </button>
          </form>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 text-white font-semibold rounded-lg bg-light-green hover:bg-light-green-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-opacity-50"
          >
            Back to login
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
