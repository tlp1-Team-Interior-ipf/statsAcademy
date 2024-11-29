import { ScrollView, Text, View } from "react-native"
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";

const Notifications = () => {
  const {t} = useTranslation();

  const { BackgroundTheme } = Temas();

    return(
      <View style={{ height: '100%', backgroundColor: BackgroundTheme }}>
        <ScrollView>
          <Text style={{textAlign: 'center', color: '#ddd'}}>{t('Notifications-void')}</Text>
        </ScrollView>
      </View>
    )
}

export default Notifications;
