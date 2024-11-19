// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
// import { Circle } from "react-native-progress"; // Usamos una librería para el aro

// const ResultQuiz = ({ route, navigation }) => {
//   const { score, totalQuestions, correctQuestions } = route.query;

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `¡Obtuve ${score}/${totalQuestions} en el Quiz! ¿Puedes superarme?`,
//       });
//     } catch (error) {
//       console.log("Error al compartir:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Resultados del Quiz</Text>
//       <Circle
//         progress={score / totalQuestions}
//         size={200}
//         color="#3498db"
//         showsText={true}
//         formatText={() => `${score}/${totalQuestions}`}
//       />
//       <Text style={styles.subtitle}>Preguntas Correctas</Text>
//       {correctQuestions.map((question, index) => (
//         <Text key={index} style={styles.question}>
//           {question}
//         </Text>
//       ))}
//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Text style={styles.shareButtonText}>Compartir Resultado</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.homeButton}
//         onPress={() => navigation.navigate("QuizGame")}
//       >
//         <Text style={styles.homeButtonText}>Volver al Inicio</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1e1e2f",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 20,
//     color: "#ddd",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   question: {
//     fontSize: 16,
//     color: "#fff",
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   shareButton: {
//     backgroundColor: "#3498db",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   shareButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   homeButton: {
//     backgroundColor: "#3af",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   homeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default ResultQuiz;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Circle } from "react-native-progress";
import { useLocalSearchParams, useRouter } from "expo-router";

const ResultQuiz = () => {
  const router = useRouter();
  const { score, totalQuestions, correctQuestions } = useLocalSearchParams();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Obtuve ${score}/${totalQuestions} en el Quiz! ¿Puedes superarme?`,
      });
    } catch (error) {
      console.log("Error al compartir:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados del Quiz</Text>
      <Circle
        progress={score / totalQuestions}
        size={200}
        color="#3498db"
        showsText={true}
        formatText={() => `${score}/${totalQuestions}`}
      />
      <Text style={styles.subtitle}>Preguntas Correctas</Text>
      {JSON.parse(correctQuestions).map((question, index) => (
        <Text key={index} style={styles.question}>
          {question}
        </Text>
      ))}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Compartir Resultado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/QuizGame")}
      >
        <Text style={styles.homeButtonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#ddd",
    marginTop: 20,
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  shareButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: "#3af",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ResultQuiz;
