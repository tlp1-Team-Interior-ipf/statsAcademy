import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Pressable } from "react-native";
import ProgressBar from "react-native-progress/Bar";
// import Circle from "react-native-progress/Circle";
// import { Circle } from 'react-native-progress-circle'
import { questions } from "../../utils/questions";
import { Temas } from "../../utils/selectTheme";
import { router, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import ComponentCircle from "../../components/CircleProgress";

const QuizGame = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [modalResult, setModalResult] = useState(false)

  const currentQuestion = questions[questionIndex];
  const { BackgroundTheme } = Temas();

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && gameStarted) {
      handleNextQuestion();
    }
  }, [timer, gameStarted]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
      setTimer(20);
      
    } else {
      setModalResult(!modalResult);
      
      // Alert.alert("Juego terminado", `Tu puntuación es ${score}/${questions.length}`);
      // resetGame();
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimer(20);
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setTimer(0);
    setScore(0);
    setGameStarted(false);
  };

  const getOptionStyle = (option) => {
    if (selectedAnswer === null) return styles.option;

    if (option === currentQuestion.correctAnswer) return styles.correctOption;

    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return styles.wrongOption;
    }

    return styles.option;
  };

  return (
    <View style={[styles.container, { backgroundColor: BackgroundTheme }]}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BackgroundTheme,
          },
          headerTintColor: "#ddd",
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={22}
              color={"#ddd"}
              onPress={() => {
                router.push("explore");
              }}
              style={{ paddingLeft: 20 }}
            />
          ),
        }}
      />

      {!gameStarted ? (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Empezar Quiz</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* Barra de progreso */}
          <ProgressBar
            progress={(questionIndex + 1) / questions.length}
            width={null} // Se adapta al ancho del contenedor
            height={10}
            color="#3498db"
            unfilledColor="#ddd"
            borderRadius={5}
            style={styles.progressBar}
          />

          {/* Temporizador */}
          <View style={{ flexDirection: "row", width: 50, gap: 70, top: -155 }}>
            <Text style={styles.timer}>{currentQuestion.dificulty}</Text>
            <Text style={styles.timer}>{timer}s</Text>
            <Text style={styles.timer}>p{currentQuestion.points}</Text>
          </View>

          <Text style={styles.question}>{currentQuestion.question}</Text>

          {/* Opciones */}
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(option)}
              onPress={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {/* Botón para siguiente pregunta */}
          {selectedAnswer && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>Siguiente</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <Modal 
        visible={modalResult}
        onRequestClose={() => {
          setModalResult(!modalResult)
        }}
        animationType="fade"
        transparent
      >
        <View style={{width: 200, height: 300, backgroundColor: '#349', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <ComponentCircle correct={score} total={questions.length} />
          <View style={{gap: 10}}>

            <Text style={{color: '#fff', textAlign: 'center'}}>
              ¡El juego a terminado!
            </Text>
            <Pressable style={{backgroundColor: '#36f', borderRadius: 5, padding: 10, width: '100%',opacity: .8 }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Compartir resultados</Text>
            </Pressable>
          
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  progressBar: {
    marginVertical: 20,
    marginHorizontal: 10,
    top: -150
  },
  question: {
    fontSize: 25,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    top:-80
  },
  option: {
    backgroundColor: "#3355ff80",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  correctOption: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  wrongOption: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  timer: {
    fontSize: 25,
    color: "#3af",
    textAlign: "center",
    marginVertical: 20,
    backgroundColor: "#ffffff30",
    width: 60,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  startButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default QuizGame;


