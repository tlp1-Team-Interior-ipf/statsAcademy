import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const ShowDrawer = () => {
    const [showDraw, setShowDraw] = useState(false);
    const slideAnim = useRef(new Animated.Value(360)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showDraw ? 0 : 360,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showDraw]);
  
  const mostrar = () => {
    console.log("Drawer mostrado")
    setShowDraw(!showDraw);
  };

  
  return {
      mostrar,
      slideAnim,
      showDraw
  }
}
