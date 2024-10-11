import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { Stack, router } from 'expo-router';
import { StylesLogin } from '@/components/Styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={StylesLogin.title}>Inicia sesión en tu cuenta</Text>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.item}>
        <Button 
          buttonStyle={{ paddingHorizontal: 45, borderRadius: 20 }}
          title="Login"
          onPress={() => router.push("Login")} // Usar router
        />
        
        <Button 
          buttonStyle={{ paddingHorizontal: 25, borderRadius: 20 }}
          title="Register Now"
          // onPress={() => router.replace("Register")}
        />
      </View>
      <Button 
        buttonStyle={{ paddingHorizontal: 25, borderRadius: 20 }}
        title="Setting"
        // onPress={() => router.replace("Configuracion")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    margin: 'auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 25,
    marginVertical: 10,
  },
});
