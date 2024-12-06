import { Button } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const CancelChatButton = ({onClose}) => {
    const { t } = useTranslation();

      return (
      <View>
        <Button 
          title={t('Button-Cancel')} 
          titleStyle={{color: '#f00'}}
          buttonStyle={{
              borderWidth: 2,
              backgroundColor: '#ffffff20',
              borderColor: '#f00',
              width: '100%',
              borderRadius: 5,
              margin: 'auto',
          }}
          onPress={onClose} />
        </View>
    );
  }