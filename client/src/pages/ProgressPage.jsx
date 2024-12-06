import Navbar from "../components/NavBar";
import ProgressView from "../components/ProgressView";
import RatingsChart from "../components/RatingsView";
import TimeTracker from "../components/TimeTracker";
import Timeline from "../components/Timeline";

function ProgressPage() {
    return (
        <>
        <Navbar />
        <ProgressView />
        <RatingsChart />
        <TimeTracker />
        <Timeline />
        </>
    );
};

export default ProgressPage;