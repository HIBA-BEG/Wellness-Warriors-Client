import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background1 from '../../assets/background1.jpeg';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password requested for:', email);
    setIsSubmitted(true);
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
          <h2 className="text-3xl font-bold text-dark-green">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            {!isSubmitted
              ? "Enter your email address and we'll send you instructions to reset your password"
              : 'Check your email for password reset instructions'}
          </p>
        </div>

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
