import React, { useEffect, useState } from "react";
import "../styles/Timeline.css";

const Timeline = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:4000/topic/all-topics-info");
        if (!response.ok) throw new Error("Error al cargar los temas");
        const result = await response.json();
        setTopics(result.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Agrupa por unidad temática
  const groupedTopics = Array.isArray(topics)
  ? topics.reduce((acc, topic) => {
      const unitName = topic.units.name; // Accede al nombre de la unidad
      if (!acc[unitName]) acc[unitName] = [];
      acc[unitName].push(topic);
      return acc;
    }, {})
  : {};

  return (
    <div className="timeline">
      {loading ? (
        <p>Cargando temas...</p>
      ) : (
        Object.keys(groupedTopics).map((unit, index) => (
          <div key={index} className="unit-section">
            <h2 className="unit-title">{unit}</h2>
            <ul className="topic-list">
              {groupedTopics[unit].map((topic, idx) => (
                <li
                  key={idx}
                  className={`topic-item ${
                    topic.status === "dictated" ? "highlighted" : ""
                  }`}
                >
                  {topic.name}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Timeline;