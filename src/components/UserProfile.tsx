import React from 'react';
import { User, Moon, Sun, Star } from 'lucide-react';
import BirthChartCalculator from './BirthChartCalculator';

interface UserProfileProps {
  user: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="text-white">
        <h2 className="text-3xl font-light mb-6">User Profile</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-light mb-6 flex items-center">
        <User className="mr-2" /> Your Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mt-4" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Astrological Profile</h3>
          <p className="flex items-center"><Sun className="mr-2" /> <strong>Sun Sign:</strong> Not available</p>
          <p className="flex items-center"><Moon className="mr-2" /> <strong>Moon Sign:</strong> Not available</p>
          <p className="flex items-center"><Star className="mr-2" /> <strong>Rising Sign:</strong> Not available</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Personalized Horoscope</h3>
        <p className="text-lg">
          To get your personalized horoscope, please use the Birth Chart Calculator below to input your birth details.
        </p>
      </div>
      <BirthChartCalculator />
    </div>
  );
};

export default UserProfile;