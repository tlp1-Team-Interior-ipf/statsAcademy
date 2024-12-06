import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-native-progress/Bar";
import { questions } from '../../../utils/questions'
import { Temas } from "../../../utils/selectTheme";
import MyCircleProgress from "../../../components/Progress/CircleProgress/CircleProgress";
import { useTranslation } from "react-i18next";

const QuizGameScreen = () => {
  const {t} = useTranslation();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [modalResult, setModalResult] = useState(false)

  const currentQuestion = questions[questionIndex] || {};
  const { BackgroundTheme } = Temas();

  const [ranking, setRanking] = useState([
    { position: 1, name: "Jugador 1", score: 20 },
    { position: 2, name: "Jugador 2", score: 18 },
    { position: 3, name: "Jugador 3", score: 15 },
    { position: 4, name: "Jugador 4", score: 12 },
    { position: 5, name: "Jugador 5", score: 10 },
    { position: 6, name: "Jugador 6", score: 5 },
    { position: 7, name: "Jugador 7", score: 4 },
    { position: 8, name: "Jugador 8", score: 3 },
    { position: 9, name: "Jugador 9", score: 2 },
    { position: 10, name: "Jugador 10", score: 0 },
    { position: 11, name: "Jugador 11", score: 0 },
    { position: 12, name: "Jugador 12", score: 0 },
    { position: 13, name: "Jugador 13", score: 0 },
    { position: 14, name: "Jugador 14", score: 0 },
    { position: 15, name: "Jugador 15", score: 0 },
    { position: 16, name: "Jugador 16", score: 0 },
    { position: 17, name: "Jugador 17", score: 0 },
    { position: 18, name: "Jugador 18", score: 0 },
    { position: 19, name: "Jugador 19", score: 0 },
    { position: 20, name: "Jugador 20", score: 0 },
    { position: 21, name: "Jugador 21", score: 0 },
    { position: 22, name: "Jugador 22", score: 0 },
    { position: 23, name: "Jugador 23", score: 0 },
    { position: 24, name: "Jugador 24", score: 0 },
    { position: 25, name: "Jugador 25", score: 0 },
    { position: 26, name: "Jugador 26", score: 0 },
    { position: 27, name: "Jugador 27", score: 0 },
    { position: 28, name: "Jugador 28", score: 0 },
    { position: 29, name: "Jugador 29", score: 0 },
    { position: 30, name: "Jugador 30", score: 0 },
  ]);

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

      {!gameStarted ? (
        <View>
          <Text style={styles.textRanking}>{t('QuizGameTitle')}</Text>
          <View >
          <ScrollView 
            style={styles.containerRanking} 
            contentContainerStyle={styles.contentContainerRanking}
            >
            {ranking.map((player, index) => (
              <View key={index} style={styles.rankingItem}>
                <Text style={styles.rankingText}>
                  {player.position}. {player.name}   
                </Text>

                <Text style={{color: '#fff', position: 'absolute', left: 230}}>{player.score} {t('Points')}</Text>
              </View>
            ))}
            </ScrollView>
          </View>
          <Pressable style={styles.startButton} onPress={startGame} disabled >
            <Text style={styles.startButtonText}>{t('PlayQuiz')}</Text>
          </Pressable>
        </View>
      ) : (
        <>
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

          {selectedAnswer && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>{t('Next')}</Text>
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
        <MyCircleProgress correct={score} total={questions.length} />
          <View style={{gap: 10}}>

            <Text style={{color: '#fff', textAlign: 'center'}}>
              {t('GameOver')}
            </Text>
            <Pressable style={{backgroundColor: '#36f', borderRadius: 5, padding: 10, width: '100%',opacity: .8 }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>{t('ShareResults')}</Text>
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
    backgroundColor: "#3498db90",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    top: 28
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },

  containerRanking: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#fff",
    width: "100%",
    height: "82%", // Espacio dedicado para el ranking
    marginTop: 10,
    padding: 10
  },
  contentContainerRanking: {
    paddingBottom: 20, // Espacio extra al final para evitar cortes
  },
  rankingItem: {
    padding: 10,
    backgroundColor: "#ffffff20",
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  rankingText: {
    color: "#fff",
    fontSize: 16,
  },
  textRanking: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
  },
});

export default QuizGameScreen;
