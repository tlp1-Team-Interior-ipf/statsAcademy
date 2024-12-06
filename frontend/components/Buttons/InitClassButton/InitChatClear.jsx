import { Button } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const InitChatClear = ({onClose}) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleInit = async () => {
        onClose();
        navigation.navigate('ChatClear')
    };
    
      return (
      <View>
        <Button 
          title={t('Button-Init-Class')} 
          titleStyle={{color: '#00f'}}
          buttonStyle={{
              borderWidth: 2,
              backgroundColor: '#ffffff20',
              borderColor: '#00f',
              width: '100%',
              borderRadius: 5,
              margin: 'auto',
          }}
          onPress={handleInit} />
        </View>
    );
  }