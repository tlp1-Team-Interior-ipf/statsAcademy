import React from 'react';
import Navbar from '../components/NavBar';
import MainView from '../components/MainView';
import ToolsBanner from '../components/ToolsBanner';
import TutorBanner from '../components/TutorBanner';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <MainView />
            <TutorBanner />
            <ToolsBanner />
        </div>
    );
};

export default LandingPage;
