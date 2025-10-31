import { GetTime } from '../getTime.js';

export const MainTheme = () => {
const theme = GetTime();
  // Apply the theme styles to the document or a specific element
    const lightTheme = () => ({
        bg: {background: 'linear-gradient(200deg, #1dcae0b6, #006effff)'}
    });
    const darkTheme = () => ({
            bg: {background: 'linear-gradient(200deg, #2c2929ff, #242222ff)'},
    });

    return theme === 'light' ? lightTheme() : darkTheme();
}