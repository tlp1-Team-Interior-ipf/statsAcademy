import { ScrollView, StyleSheet, Text, View } from "react-native"
import {useTranslation} from 'react-i18next';
import { Temas } from "../../../utils/selectTheme";
import { IconBell } from "../../../components/Icons/Icons";
const Notifications = () => {
  const {t} = useTranslation();

  const { BackgroundTheme } = Temas();

  const notifications = [
    { title: "El evento ''Dia de la presentación del proyecto final'' empieza mañana", date: "06-12-2024"},
    { title: "El evento ''Último día de práctica de la presentación'' empieza mañana", date: "05-12-2024"}
  ]

    return(
      <View style={{ height: '100%', backgroundColor: BackgroundTheme }}>
        
        <ScrollView>
          
            {
              notifications.length > 0 ?
              
              notifications.map((event) => 
                <View style={StylesNotify.cotainerNotify}>
                  <IconBell iconColor={'#ff0'} iconSize={25} />
                  <Text style={{color: '#fff', fontWeight: 'bold', width: 220}}>{event.title}</Text>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>{event.date}</Text>
                </View>
              ) :

              <Text style={{textAlign: 'center', color: '#ddd'}}>{t('Notifications-void')}</Text>
            }
          
        </ScrollView>
      </View>
    )
}

const StylesNotify = StyleSheet.create({
  cotainerNotify: {
    backgroundColor: '#ffffff50', 
    width: '97%', 
    height: 75, 
    marginHorizontal: 5, 
    flexDirection: 'row', 
    gap: 10, 
    padding: 10, 
    alignItems: 'center', 
    borderRadius: 5, 
    borderWidth: 1, 
    borderLeftWidth: 2, 
    borderBottomWidth: 3, 
    borderColor: '#fff', 
    marginTop: 10
  }
})

export default Notifications;
