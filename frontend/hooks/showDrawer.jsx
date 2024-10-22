import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const ShowDrawer = () => {
    const [showDraw, setShowDraw] = useState(false);
    const slideAnim = useRef(new Animated.Value(showDraw ? 0 : 360)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showDraw ? 0 : 360,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showDraw]);
  
  const mostrar = () => {
      // setShowDraw(prevState => !prevState)
    // if(action === 'cerrar') {
    //   console.log("Drawer cerrado")
    //   setShowDraw(false);
    // } else {
    //   console.log("Drawer mostrado")
    //   setShowDraw(prevState => !prevState);
    // }
    setShowDraw(!showDraw);
  };

  
  return {
      mostrar,
      slideAnim,
      showDraw,
      setShowDraw
  }
}
