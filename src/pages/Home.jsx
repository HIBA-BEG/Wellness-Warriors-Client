import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaHeart } from 'react-icons/fa';
import yogaHero from '../assets/sports.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            <div className="absolute inset-0">
                <img
                    src={yogaHero}
                    alt="Yoga"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-dark-green bg-opacity-40 backdrop-blur-sm"></div>
            </div>
            <div className='relative w-full min-h-screen flex flex-col justify-between py-12'>
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl text-white space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in">
                            Welcome to Wellness Warriors
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
                            Join our community and embark on a journey to wellness through yoga and mindfulness.
                        </p>
                        <div
                            onClick={() => navigate('/events')}
                            className="inline-block bg-light-green hover:bg-dark-green text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:shadow-lg"
                        >
                            Explore Events
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                        Why Choose Wellness Warriors?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                            icon={<FaUsers className="text-4xl" />}
                            title="Expert Instruction"
                            description="Learn from certified yoga instructors with years of experience."
                        />
                        <FeatureCard
                            icon={<FaCalendarAlt className="text-4xl" />}
                            title="Flexible Schedule"
                            description="Choose from various class times that fit your lifestyle."
                        />
                        <FeatureCard
                            icon={<FaUsers className="text-4xl" />}
                            title="Community"
                            description="Join a supportive community of like-minded individuals."
                        />
                        <FeatureCard
                            icon={<FaHeart className="text-4xl" />}
                            title="Holistic Wellness"
                            description="Focus on both physical and mental well-being."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <div className="text-light-green mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-dark-green mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default Home; 