import { Pressable, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const ButtonList = ({content, action, direction}) => {
    return(
      <Pressable onPress={action} style={{color: '#ddd', textAlign: 'center', fontSize: 15, borderBottomWidth: 2,  borderColor: '#ddd', padding: 10, flexDirection: 'row', justifyContent:'space-between',}} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 170}}>
        <Text style={{color: '#ddd', textAlign: 'center', fontSize: 16}}>{content}</Text>
        <AntDesign name={direction} size={17} color={'#ddd'} />
      </Pressable>
    )
  }
  