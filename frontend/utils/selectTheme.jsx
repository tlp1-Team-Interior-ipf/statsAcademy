import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Temas = () => {

    const { theme } = useContext(UserContext);

    const selectTextTheme = theme === 'dark' ? '#fff' : '#000';
    const selectBackgroundTheme = theme === 'dark' ? '#332288' : '#fff';
    const selectButtonRadioTheme = theme === 'dark' ? '#ddd' : '#666';
    const ButtonRadioTheme = theme === 'dark' ? '#37b' : 'transparent';
    const selectButtonRadioTheme2 = theme === 'dark' ? '#332288' : '#ddd';
    const ButtonRadioTheme2 = theme === 'light' ? '#37b' : 'transparent';

    return {
        selectTextTheme ,
        selectBackgroundTheme,
        selectButtonRadioTheme,
        ButtonRadioTheme,
        selectButtonRadioTheme2,
        ButtonRadioTheme2,
    }
}

