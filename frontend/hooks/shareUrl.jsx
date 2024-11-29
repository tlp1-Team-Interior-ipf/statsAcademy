import { Share } from "react-native";

const handleShare = async () => {
    try {
      const result = await Share.share({
        message: '¡Descarga Stats Academy es la nueva aplicación que te enseña Matemática en el área de Estadística! https://www.example.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Compartido con actividad: ", result.activityType);
        } else {
          console.log("El enlace fue compartido con éxito.");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("El modal de compartir fue cerrado.");
      }
    } catch (error) {
      console.error("Error al intentar compartir:", error.message);
    }
  };

  export default handleShare;