import { TextInput, View, ScrollView, StatusBar, StyleSheet } from "react-native";
import { NativeBaseProvider, Button, Text, Checkbox } from 'native-base'
export default function Login() {

  return (
    <>
      <ScrollView>
        <StatusBar  />
        <NativeBaseProvider>
          <View>
            <Text style={SLogin.title}>Login</Text>
          </View>
          <View style={SLogin.inputs}>
            <TextInput style={SLogin.input} placeholder="Email" />
            <TextInput style={SLogin.input} placeholder="Password" />
          </View>

          <View style={{display: 'flex', alignItems:'center'}}>
            <Button style={SLogin.button}>
              <Text color={'#fff'}>
                Login
              </Text>
            </Button>
            <View style={SLogin.row}>
              <Checkbox >
                <Text>Recordame</Text>
              </Checkbox>
                <Text style={SLogin.link} onPress={() => {console.log("REGISTRO")}}>¿No tenes cuenta?</Text>
            </View>
          </View>
          
        </NativeBaseProvider>
      </ScrollView>
    </>
  );
}

const SLogin = StyleSheet.create({

  title: {
    textAlign: "center",
    fontSize: 25,
  },
  
  inputs: {
    display: "flex",
    alignItems:'center'
  },

  input: {
    backgroundColor: '#ddd',
    width: 150,
    padding: 5,
    borderRadius: 5,
    margin: 5,
    color: '#fff'
  },

  button: {
    width: 150,
    height: 30,
    color: '#fff',
  },

  row: {
    flexDirection: 'row',            
    justifyContent: 'space-between', 
    alignItems: 'center',           
    marginTop: 10,
    width: '30%',                    
  },

  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 10,                  
  },
})