import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background1 from '../../assets/background1.webp';
import authService from '../../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || 'Password reset request failed');
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
          <h2 className="text-3xl font-bold text-dark-green">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            {!isSubmitted
              ? "Enter your email address and we'll send you instructions to reset your password"
              : 'Check your email for password reset instructions'}
          </p>
        </div>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-dark-green">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-light-green"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold rounded-lg 
                bg-light-green hover:bg-light-green-dark transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-opacity-50"
            >
              Send Reset Instructions
            </button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <div
                onClick={() => navigate('/login')}
                className="text-my-orange hover:text-light-green-dark font-medium"
              >
                Back to login
              </div>
            </p>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">
                If an account exists with this email address, you will receive password reset
                instructions shortly.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full px-4 py-2 text-white font-semibold rounded-lg 
                bg-light-green hover:bg-light-green-dark transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-opacity-50"
            >
              Send Again
            </button>

            <p className="text-center text-sm text-gray-600">
              <div
                onClick={() => navigate('/login')}
                className="text-my-orange hover:text-light-green-dark font-medium"
              >
                Back to login
              </div>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
