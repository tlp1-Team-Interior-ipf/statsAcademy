import React from 'react';
import Navbar from '../components/NavBar';
import MainView from '../components/MainView';
import ToolsBanner from '../components/ToolsBanner';
import TutorBanner from '../components/TutorBanner';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <MainView />
            <TutorBanner />
            <ToolsBanner />
            <Footer />
        </div>
    );
};

export default LandingPage;
