// import { useContext, useState } from "react";
// import { UserContext } from "@/context/userContext";
// import { AntDesign, Ionicons } from "@expo/vector-icons";
// import { View, Pressable, Image, Text, Modal, TextInput, Alert } from "react-native";
// import { Stack, router } from 'expo-router';
// import {useTranslation} from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const MyAccount = () => {
//     const {t} = useTranslation();

//     const { user, setIsLoggedIn } = useContext(UserContext);
    
//     const [modalVisible, setModalVisible] = useState(false);
//     const [emailInput, setEmailInput] = useState("");

//     const handleDeleteAccount = async () => {
//         const id = await AsyncStorage.getItem('userId')
//         if (emailInput !== user.email) {
//             Alert.alert("Error", t("My-Account-email-mismatch"));
//             return;
//         }
        
//         try {
            
//             const response = await fetch(`http://192.168.0.123:3000/users/${id}`,
//                 {
//                     method: "DELETE",
//                     headers: { "Content-Type": "application/json" },
//                 }
//             );
            
//             console.log("yujuu", user.email)
//         if (!response.ok) {
//             console.log("hola")
//             throw new Error(t("My-Account-delete-failed"));
//         }
    
        
//         Alert.alert("Success", t("My-Account-deleted"));
//         setModalVisible(false);
//         setEmailInput('');
//         setIsLoggedIn(false);
//         router.push('/')
//         } catch (error) {
//         Alert.alert(t("Error"), error.message);
//         }
//     };

//     return(
//         <>
//             <View style={{ backgroundColor: '#332288', height: '100%', alignItems: 'center' }}>
//             <Stack.Screen options={{
//                 title: t('My-Account'),
//                 headerShown: true,
//                 headerBackTitleVisible: true,
//                 headerTintColor: '#fff',
//                 headerStyle: { backgroundColor: '#332288' },
//                 headerLeft: () => (
//                     <AntDesign name='arrowleft' onPress={() => router.back()} size={22} color={'#ddd'} style={{ paddingLeft: 20 }} />
//                 ),
//             }} />
//                 <View style={{width: 100, height: 100, borderWidth: 1, borderColor: '#fff', borderRadius: 50, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
//                 {user.profileImage ? (
//                     <Image source={{uri: user.profileImage}} style={{width: 100, height: 100, borderWidth: 1, borderColor: '#ddd', borderRadius: 50}} />
//                 ): <Ionicons name="person" size={60} color={'#ddd'} />}
//                 </View>
                
//                 <Text style={{ color: '#ddd', fontWeight: 'bold', left: -120, fontSize: 17}}>{t('My-Account-username')}</Text>
//                 <View style={{ borderWidth: 1, borderRadius:5, padding: 10, margin: 5, borderColor: '#ddd', width: '90%', height: '7%', justifyContent: 'center' }}>
//                     <Text style={{color: '#ddd', fontSize: 17, left: 10}}>{user.name ? user.name : user.username}</Text>
//                 </View>
//                 <Text style={{ color: '#ddd', fontWeight: 'bold', left: -125, fontSize: 17}}>{t('My-Account-email')}</Text>
//                 <View style={{ borderWidth: 1, borderRadius:5, padding: 10, margin: 5, borderColor: '#ddd', width: '90%', height: '7%', justifyContent: 'center' }}>
//                     <Text style={{color: '#ddd', fontSize: 17, left: 10}}>{user.email}</Text>
//                 </View>
//                 <Text style={{ color: '#ddd', fontWeight: 'bold', left: -105, fontSize: 17}}>{t('My-Account-password')}</Text>
//                 <View style={{ borderWidth: 1, borderRadius:5, padding: 10, margin: 5, borderColor: '#ddd', width: '90%', height: '7%', justifyContent: 'center' }}>
//                     <Text style={{color: '#ddd', fontSize: 17, left: 10}}>*********</Text>
//                 </View>
//                 <Pressable
//                     onPress={() => setModalVisible(true)}
//                     style={{ borderWidth: 2, borderRadius: 5, padding: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#ddd', width: '90%', top: 20, backgroundColor: '#ffffff25' }} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 160}}>
//                     <Text style={{ color: '#f00', fontWeight: 'bold', fontSize: 17 }}>
//                     {t('My-Account-delete')}
//                     </Text>
//                 </Pressable>
//             </View>

//         <Modal visible={modalVisible} transparent animationType="fade">
//             <View
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//             }}
//             >
//             <View
//                 style={{
//                 backgroundColor: "#332299",
//                 padding: 20,
//                 borderRadius: 10,
//                 width: "90%",
//                 alignItems: "center",
//                 }}
//             >
//                 <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: '#ddd' }}>
//                     {t("My-Account-confirm-delete")}
//                 </Text>
//                 <TextInput
//                 placeholder={t("My-Account-enter-email")}
//                 placeholderTextColor={'#ddd'}
//                 style={{
//                     width: "100%",
//                     padding: 10,
//                     borderWidth: 1,
//                     borderColor: "#ddd",
//                     borderRadius: 5,
//                     marginBottom: 20,
//                     fontSize: 17,
//                     color: '#ddd'
//                 }}
//                 value={emailInput}
//                 onChangeText={setEmailInput}
//                 />
//                 <Pressable
//                     onPress={() => handleDeleteAccount()}
//                     style={{ borderWidth: 2, borderRadius: 5, padding: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#fdd', width: '100%', top: 0, backgroundColor: '#ff000025' }} android_ripple={{ color:'rgba(0, 255, 255, 0.2)', borderless: false, radius: 160}}
//                 >
//                 <Text style={{ color: "#f00", fontWeight: "bold", fontSize: 16 }}>
//                     {t("My-Account-confirm")}
//                 </Text>
//                 </Pressable>
//                 <Pressable
//                 onPress={() => setModalVisible(false)}
//                 style={{
//                     marginTop: 10,
//                     alignItems: "center",
//                 }}
//                 >
//                 <Text style={{ color: "#ddd", fontSize: 16 }}>
//                     {t("My-Account-cancel")}
//                 </Text>
//                 </Pressable>
//             </View>
//             </View>
//       </Modal>
//         </>
//     )
// }

// export default MyAccount;
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const DeleteAccountModal = ({ user, setIsLoggedIn, visible, onClose }) => {
  const { t } = useTranslation();
  const [emailInput, setEmailInput] = useState("");

  const handleDeleteAccount = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (emailInput !== user.email) {
      Alert.alert("Error", t("My-Account-email-mismatch"));
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(t("My-Account-delete-failed"));
      }

      Alert.alert("Success", t("My-Account-deleted"));
      setEmailInput("");
      setIsLoggedIn(false);
      onClose();
      router.push('/')
    } catch (error) {
      Alert.alert(t("Error"), error.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "#332299",
            padding: 20,
            borderRadius: 10,
            width: "90%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#ddd",
            }}
          >
            {t("My-Account-confirm-delete")}
          </Text>
          <TextInput
            placeholder={t("My-Account-enter-email")}
            placeholderTextColor={"#ddd"}
            style={{
              width: "100%",
              padding: 10,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 5,
              marginBottom: 20,
              fontSize: 17,
              color: "#ddd",
            }}
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <Pressable
            onPress={handleDeleteAccount}
            style={{
              borderWidth: 2,
              borderRadius: 5,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#fdd",
              width: "100%",
              backgroundColor: "#ff000025",
            }}
          >
            <Text style={{ color: "#f00", fontWeight: "bold", fontSize: 16 }}>
              {t("My-Account-confirm")}
            </Text>
          </Pressable>
          <Pressable
            onPress={onClose}
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#ddd", fontSize: 16 }}>
              {t("My-Account-cancel")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
