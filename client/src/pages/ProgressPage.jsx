import Navbar from "../components/NavBar";
import ProgressView from "../components/ProgressView";
import RatingsChart from "../components/RatingsView";
import TimeTracker from "../components/TimeTracker";

function ProgressPage() {
    return (
        <>
        <Navbar />
        <ProgressView />
        <RatingsChart />
        <TimeTracker />
        </>
    );
};

export default ProgressPage;