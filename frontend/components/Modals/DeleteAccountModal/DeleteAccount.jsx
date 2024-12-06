import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DeleteAccountModal = ({ user, setIsLoggedIn, visible, onClose }) => {
  const { t } = useTranslation();
  const [emailInput, setEmailInput] = useState("");
  const navigation = useNavigation();

  const handleDeleteAccount = async () => {
    await AsyncStorage.setItem('isOnboardingCompleted', 'false');
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
      // navigation.replace('Login')
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
