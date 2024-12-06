    import { useContext } from "react";
    import { UserContext } from "../context/userContext";

    export const Temas = () => {

        const { theme } = useContext(UserContext);

        const isDarkTheme = theme === 'dark';

        // Units

        {/* Background */} const contentUnitsTheme = theme === 'dark' ? '#49bb80' : '#49bb80';
        {/* Background */} const contentUnitsTheme1 = theme === 'dark' ? '#0f7685' : '#0f7685';
        {/* Background */} const contentUnitsTheme2 = theme === 'dark' ? '#0f2f85' : '#0f2f85';

        // Buttons
        
        {/* Start */} const ButtonStartTheme = theme === 'light' ? '#36f' : '#149';
        {/* Save Config */} const ButtonSaveConfigTheme = theme === 'light' ? '#36f' : '#149';
        {/* Background */} const BackgroundTheme = theme === 'dark' ? '#332288' : '#3366ff80';
        {/* Text background */} const TextBackgroundTheme = theme === 'dark' ? '#fff' : '#000';
        
        {/* Chat Button */} const buttonChatTheme = theme === 'dark' ? '#49bb80' : '#49bb80';
        {/* Chat Button1 */} const ButtonChatTheme1 = theme === 'dark' ? '#0f7685' : '#0f7685';
        {/* Chat Button2 */} const ButtonChatTheme2 = theme === 'dark' ? '#0f2f85' : '#0f2f85';
        {/* Chat Button shadow */} const ButtonShadowChatTheme = theme === 'dark' ? '#ffffff40' : '#dddddd40';


        // Button radio
        {/* Active */} const ButtonBackgroundRadioThemeOn = theme === 'light' ? '#37b' : 'transparent';
        {/* Inactive */} const ButtonBackgroundRadioThemeOff = theme === 'light' ? 'transparent' : '#37b';

        // Calendar
        {/* Backgroundd */} const CalendarBackgroundTheme = theme === 'dark' ? '#339' : '#3af';
        const ItemBackground = theme === 'dark' ? '#22a' : '#2299ff';
        const itemBorder = theme === 'dark' ? '#56a' : '#5566ff';

        // Kanban
        {/* Columns Background */} const ColumnBackgroundTheme = theme === 'dark' ? '#337' : '#ffffff20';
        {/* Columns Background */} const BorderColumnTheme = theme === 'dark' ? '#666' : '#fff';
        const IconBackground = theme === 'dark' ? '#2af' : '#2cf'

        // Chat
        {/* Input Background */} const InputBackground = theme === 'dark' ? '#332299' : 'ffffff20';
        {/* User */} const UserMessageTheme = theme === 'dark' ? '#49bb80' : '#49bb80';
        {/* Bot */} const BotMessageTheme = theme === 'dark' ? '#0f7685' : '#0f7685';

        //Navbar
        const NavbarIconTheme = theme === 'dark' ? '#fff' : '#eee';
        const TextNavBarTheme = theme === 'dark' ? '#fff' : '#fff'

        // Modals

        {/* Create event */} const ModalCreateEventTheme = theme === 'dark' ? "#64d" : '#36f';

        // Icons
        {/* Color icons home*/}
        const IconstHomeTheme = theme === 'dark' ? "#fff" : '#49bb80';

        {/* Color icons tab*/}
        const IconstTabTheme = theme === 'dark' ? "#fff" : '#fff';

        {/* Color tab*/}
        const TabTheme = theme === 'dark' ? "#332288" : '#aabbff';

        {/* Color text tab*/}
        const ColorTextTab = theme === 'dark' ? "#fff" : '#00f';

        // Settings
        const TextAndLineTheme = theme === 'dark' ? '#fff' : '#fff';



        // Reports
        {/* Tarjeta */} const ThemeCard = theme === 'dark' ? "#6644ff" : '#3366ff';
        {/* Sub Tarjeta */} const ThemeSubCard = theme === 'dark' ? "#40bb8050" : '#40bb8050';
        {/* Sub Tarjeta 2 */} const ThemeSubCard2 = theme === 'dark' ? "#332288" : '#5484FF';

        // Profile
        const profileBorderTheme = theme === 'dark' ? '#fff' : '#999';

        // My Account
        const inputAccount = theme === 'dark' ? '#fff' : '#fff';

        // Settings
        const subContainer = theme === 'dark' ? '#6464FF' : '#fff';
        const lineTextLightBlueWrite = theme === 'dark' ? '#fff' : '#3366ff80';


        return {
            isDarkTheme,
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
            ModalCreateEventTheme,
            contentUnitsTheme,
            contentUnitsTheme1,
            contentUnitsTheme2,
            buttonChatTheme,
            ButtonShadowChatTheme,
            ButtonChatTheme1,
            ButtonChatTheme2,
            IconstHomeTheme,
            IconstTabTheme,
            ThemeCard,
            ThemeSubCard,
            profileBorderTheme,
            TabTheme,
            ColorTextTab,
            NavbarIconTheme,
            TextAndLineTheme,
            TextNavBarTheme,
            inputAccount,
            subContainer,
            lineTextLightBlueWrite,
            ThemeSubCard2,
            ItemBackground,
            itemBorder,
            IconBackground
            
        }
    }

