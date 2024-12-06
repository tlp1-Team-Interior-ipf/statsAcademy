import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useAuth } from '../hooks/ContextHook';

const ProgressView = () => {
  const [progress, setProgress] = useState(null);
  const { user } = useAuth();
  const id = user.data.id;
  const username = user.data.username;

  useEffect(() => {

    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/progress/${id}`);
        if (response.data.success) {
          setProgress(response.data.data);
        } else {
          console.error('No se encontró el progreso.');
        }
      } catch (error) {
        console.error('Error al obtener el progreso:', error);
      }
    };
    fetchProgress();
  }, [id]);

  return (
    <>
    <h1 style={{marginTop: 80, marginLeft:20}}>Reportes del alumno</h1>
    <div style={{ width: 200, margin: 'auto' }}>
      {progress !== null ? (
        <CircularProgressbar
          value={progress}
          maxValue={100}
          text={`${progress}%`}
          styles={buildStyles({
            textColor: "#3e98c7",
            pathColor: "#3e98c7",
            trailColor: "#d6d6d6"
          })}
        />
      ) : (
        <p>Cargando reportes...</p>
      )}
    </div>
    </>
  );
};

export default ProgressView;