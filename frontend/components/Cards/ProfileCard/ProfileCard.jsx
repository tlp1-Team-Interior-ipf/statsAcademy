import { EvilIcons, MaterialCommunityIcons, FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

const iconLibraries = {
    EvilIcons: EvilIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    FontAwesome5: FontAwesome5,
    MaterialIcons: MaterialIcons,
    AntDesign: AntDesign
};

export const ProfileCard = ({nameIcon, textCardProfile, NameLibrariIcon, sizeIcon, sizeText, sizePaddingText, showCounter, onPressEnabled, onPress}) => {
    const { user } = useContext(UserContext);
    const IconComponent = iconLibraries[NameLibrariIcon];

    const CardContent = () => (
        <View style={styleCardProfile.containerCardProfile}>
            <View style={styleCardProfile.subContainerCardProfile}>
            {IconComponent ? (
                    <IconComponent name={nameIcon} size={sizeIcon} color={'#ddd'} />
                ) : (
                    <Text>Icon not found</Text>
                )}
            </View>
            <Text style={[styleCardProfile.textProfile, {fontSize: sizeText, padding: sizePaddingText}]}>
                {textCardProfile}
            </Text> 

            {showCounter && (
                <Text style={styleCardProfile.counterText}>
                    1
                </Text>
            )}
        </View>
    );
    return onPressEnabled ? (
        <Pressable onPress={onPress}>
          <CardContent />
        </Pressable>
      ) : (
        <CardContent />
      );
}



const styleCardProfile = StyleSheet.create({

    containerCardProfile: {
        height: 150, 
        width: 130, 
        backgroundColor: '#3333ff50',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },

    subContainerCardProfile: {
        height: 55, 
        width: 120, 
        backgroundColor: '#4d55b3',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        top: -5
    },
    textProfile: {
        color: '#ddd',
        textAlign: 'center',
    },

    counterText: {
        color: '#ddd',
        textAlign: 'center',
        fontSize: 20
    }

})