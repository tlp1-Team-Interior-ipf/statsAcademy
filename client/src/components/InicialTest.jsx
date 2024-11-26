import React, { useState, useEffect } from 'react';
import '../styles/InitialTest.css';

const InitialTest = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [finalNote, setFinalNote] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/preguntas.json');
        const questionsData = await response.json();
        setQuestions(questionsData);
        setSelectedQuestions(selectRandomQuestions(questionsData, 10));
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

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const evaluateAnswer = async (userAnswer, correctAnswer) => {
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
                "Eres un asistente que evalúa respuestas a preguntas de estadística y determina si son correctas o incorrectas, en la respuesta limitate a responder solamente 'correcto' o 'incorrecto' comparando la respuestas del usuario en base a su similitud con 'correctAnswer'.",
            },
            {
              role: 'user',
              content: `Pregunta: ${correctAnswer}\nRespuesta del usuario: ${userAnswer}\nEvaluación:`,
            },
          ],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del API');
      }

      const data = await response.json();
      const evaluation = data.choices[0].message.content.trim();
      setResult(`Resultado: ${evaluation}`);

      if (evaluation.toLowerCase() === 'correcto') {
        setScore(score + 1);
      }

      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setFinalNote(
          `Has terminado el cuestionario. Tu puntuación es: ${score + 1}/${selectedQuestions.length} (${Math.round(
            ((score + 1) / selectedQuestions.length) * 100
          )}%)`
        );
      }
    } catch (error) {
      console.error('Error al evaluar la respuesta:', error);
    }
  };

  const progressPercentage =
    selectedQuestions.length > 0
      ? ((currentQuestionIndex + 1) / selectedQuestions.length) * 100
      : 0;

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
              onClick={() => {
                evaluateAnswer(userAnswer, currentQuestion.correctAnswer);
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
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InitialTest;
