import { useContext } from 'react';
import './profile.css';
import ThematicUnitsCard from './ThematicUnitsCard';
import { AuthContext } from '../context/authContext';

const Profile = () => {

    const { user } = useContext(AuthContext);
    console.log(user);

  return (
    <div className="user-profile">
      <ThematicUnitsCard />
    </div>
  );
};

export default Profile;