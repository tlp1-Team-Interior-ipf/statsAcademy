import { Text, StyleSheet, View, ScrollView, StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <ScrollView>
        <StatusBar translucent hidden/>
        <Text style={styles.titleContainer}>Stats Academy</Text>
        <View>
          <Text>Contenido</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
