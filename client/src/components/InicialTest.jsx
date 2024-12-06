import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/ContextHook';
import '../styles/InitialTest.css';
import { useSnackbar } from 'notistack';

const InitialTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [finalNote, setFinalNote] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user.data.id;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/preguntas.json');
        const questionsData = await response.json();
        setQuestions(questionsData);
        setSelectedQuestions(selectRandomQuestions(questionsData, 5));
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      }
    };

    loadQuestions();
  }, []);

  const selectRandomQuestions = (questions, numberOfQuestions) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfQuestions);
  };

  const calculateLevel = (percentage) => {
    if (percentage < 40) return 1; // Básico
    if (percentage < 80) return 2; // Intermedio
    return 3; // Avanzado
  };

  const evaluateAnswer = async (userAnswer, question, allQuestions) => {
    if (!question || typeof question.contenido !== 'string' || !question.respuestaCorrecta) {
      console.error('Pregunta inválida:', question);
      return 'Error: Pregunta inválida';
    }
  
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: 
                "Eres un asistente que evalúa respuestas a preguntas de estadística. Analiza la similitud entre la respuesta del usuario y la respuesta correcta. Responde solo 'correcto' o 'incorrecto'.",
            },
            {
              role: 'user',
              content: `Pregunta: ${question.contenido}\nRespuesta del usuario: ${userAnswer}\nRespuesta correcta: ${question.respuestaCorrecta}\nEvaluación:`,
            },
          ],
          max_tokens: 10,
        }),
      });
  
      if (!response.ok) throw new Error('Error en la respuesta del API');
  
      const data = await response.json();
      const evaluation = data.choices[0].message.content.trim();
  
      setResult(`Resultado: ${evaluation}`);
  
      if (evaluation.toLowerCase() === 'correcto') {
        setScore((prevScore) => prevScore + 1);
      }
  
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        const percentage = (score / allQuestions.length) * 100;
        const level = calculateLevel(percentage);
  
        setFinalNote(
          `Has terminado el cuestionario. Tu puntuación es: ${score}/${allQuestions.length} (${Math.round(
            percentage
          )}%). Nivel: ${level}.`
        );
      }
    } catch (error) {
      console.error('Error al evaluar la respuesta:', error);
    }
  };
  

  const handleRetry = () => {
    setQuestions([]);
    setSelectedQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setResult('');
    setFinalNote(null);

    // Recargar las preguntas
    const loadQuestions = async () => {
      try {
        const response = await fetch('/preguntas.json');
        const questionsData = await response.json();
        setQuestions(questionsData);
        setSelectedQuestions(selectRandomQuestions(questionsData, 5));
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      }
    };

    loadQuestions();
  };

  const handleFinish = async () => {
    if (!finalNote) {
      enqueueSnackbar('Completa la evaluación antes de finalizar', {
        variant: 'error',
      });
      return;
    }

    const percentage = (score / selectedQuestions.length) * 100;
    const level = calculateLevel(percentage);
    

    try {
      const response = await fetch('http://localhost:4000/inicial-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: score,
          level: level,
          userId, // Enviar el userId junto con la nota y el nivel
        }),
      });

      if (response.ok) {
        enqueueSnackbar('¡Resultados guardados correctamente!', {
          variant: 'success',
          autoHideDuration: 2000,
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        throw new Error('Error al guardar los resultados.');
      }
    } catch (error) {
      console.error('Error al finalizar la evaluación:', error);
    }
};


  const progressPercentage =
    selectedQuestions.length > 0
      ? ((currentQuestionIndex + 1) / selectedQuestions.length) * 100
      : 0;

  const getProgressBarColor = (percentage) => {
    if (percentage <= 39) return '#0E2F84';
    if (percentage <= 79) return '#0E7684';
    return '#49BA81';
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className="evaluation-background">
      <div className="evaluation-container">
        <h1 className="initial-test-title">Evaluación Inicial</h1>
        {currentQuestion && !finalNote ? (
          <div>
            <p id="question" className="initial-test-question">
              <strong>
                Pregunta {currentQuestionIndex + 1}: {currentQuestion.contenido}
              </strong>
            </p>
            <input
              type="text"
              className="initial-test-input"
              placeholder="Escribe tu respuesta aquí"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
              className="initial-test-button"
              onClick={async () => {
                await evaluateAnswer(userAnswer, currentQuestion, selectedQuestions);
                setUserAnswer('');
              }}
            >
              Enviar Respuesta
            </button>
          </div>
        ) : (
          <p>{finalNote}</p>
        )}
        <div className="initial-test-score">{result}</div>
        <div className="initial-test-score">Puntuación: {score}</div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: getProgressBarColor(progressPercentage),
            }}
          ></div>
        </div>
        {finalNote && (
  <div className="button-container">
    <button className="initial-test-button retry-button" onClick={handleRetry}>
      Reintentar
    </button>
    <button className="initial-test-button finish-button" onClick={handleFinish}>
      Finalizar Evaluación
    </button>
  </div>
)}
      </div>
    </div>
  );
}

export default InitialTest;
