import { useAuth } from '../hooks/ContextHook';

const TimeTracker = () => {
    const { activeTime, isActive } = useAuth();

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Tiempo Activo</h1>
            <h2>{formatTime(activeTime)}</h2>
            <p>Estado: {isActive ? 'Activo' : 'Inactivo'}</p>
        </div>
    );
};

export default TimeTracker;