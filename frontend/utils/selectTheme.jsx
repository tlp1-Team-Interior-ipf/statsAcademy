import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Temas = () => {

    const { theme } = useContext(UserContext);

    // Buttons
    
    {/* Start */} const ButtonStartTheme = theme === 'light' ? '#36f' : '#149';
    {/* Save Config */} const ButtonSaveConfigTheme = theme === 'light' ? '#36f' : '#149';
    {/* Background */} const BackgroundTheme = theme === 'dark' ? '#332288' : '#33aaff';
    {/* Text background */} const TextBackgroundTheme = theme === 'dark' ? '#fff' : '#ddd';


    // Button radio
    {/* Active */} const ButtonBackgroundRadioThemeOn = theme === 'light' ? '#37b' : 'transparent';
    {/* Inactive */} const ButtonBackgroundRadioThemeOff = theme === 'light' ? 'transparent' : '#37b';

    // Calendar
    {/* Backgroundd */} const CalendarBackgroundTheme = theme === 'dark' ? '#339' : '#3af';

    // Kanban
    {/* Columns Background */} const ColumnBackgroundTheme = theme === 'dark' ? '#337' : '#ffffff20'
    {/* Columns Background */} const BorderColumnTheme = theme === 'dark' ? '#666' : '#ddd'

    // Chat
    {/* Input Background */} const InputBackground = theme === 'dark' ? '#332299' : 'ffffff20'
    {/* User */} const UserMessageTheme = theme === 'dark' ? '#32c' : '#38f'
    {/* User */} const BotMessageTheme = theme === 'dark' ? '#368' : '#39c'

    // Modals

    {/* Create event */} const ModalCreateEventTheme = theme === 'dark' ? "#64d" : '#36f'

    return {
        ButtonStartTheme,
        ButtonSaveConfigTheme,
        BackgroundTheme,
        TextBackgroundTheme,
        ButtonBackgroundRadioThemeOn,
        ButtonBackgroundRadioThemeOff,
        CalendarBackgroundTheme,
        ColumnBackgroundTheme,
        BorderColumnTheme,
        InputBackground,
        UserMessageTheme,
        BotMessageTheme,
        ModalCreateEventTheme
    }
}

