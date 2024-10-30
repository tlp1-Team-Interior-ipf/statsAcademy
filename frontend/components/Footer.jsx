import { StyleSheet, View, Text, } from 'react-native';
import { MyButton2 } from '@/components/Icons';

export const Footer = () => {
    return(
        <View style={stylesFooter.footer}>
            <View>
              <Text style={{ color: '#fff', fontSize: 10 }}>Todos los derechos reservados © 2024</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 15, gap: 50 }}>
              <View>
                <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center', marginBottom: 10 }}>Términos y Condiciones</Text>
                <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>StatsAcademy®</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                  <MyButton2 iconName={'facebook-official'} iconSize={13} color={'#ddd'} action={null}/>
                  <MyButton2 iconName={'linkedin-square'} iconSize={13} color={'#ddd'} action={null}/>
                  <MyButton2 iconName={'instagram'} iconSize={13} color={'#ddd'} action={null}/>
                  <MyButton2 iconName={'github'} iconSize={13} color={'#ddd'} action={null}/>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center', marginBottom: 10 }}>Política de Privacidad</Text>
                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center' }}>CONTACTANOS</Text>
                <Text style={{ color: '#fff', fontSize: 9, textAlign: 'center' }}>statsacademy@gmail.com</Text>
              </View>
            </View>
          </View>
    )
}

const stylesFooter = StyleSheet.create({

    footer: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        padding: 5,
      },

})