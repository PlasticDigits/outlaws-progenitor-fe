import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import React, { useContext } from 'react';
import { DarkModeContext } from './DarkModeProvider';

import { Link as RouterLink } from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const BaseThemeProvider = ({ children }) => {
  const { isDark } = useContext(DarkModeContext);
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: 'dark',
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
        primary: {
          light: '#7C7CB9',
          main: '#2A2BA7',
          dark: '#080830',
          contrastText: '#e3e4eb',
        },
        secondary: {
          light: '#7c9bb9',
          main: '#2a69a7',
          dark: '#1c0830',
          contrastText: '#1e0a2c',
        },
        accent: {
          light: '#9b7cb9',
          main: '#692aa7',
          dark: '#be7522',
          contrastText: '#e6e3eb',
        },
        background: {
          default: `#999393`,
          paper: `#231e1e`,
        },
        text: {
          primary: '#eeeef2',
          secondary: '#c4c4c4',
          dark: '#230411',
        },
      },
      typography: {
        fontFamily: ['Western'],
      },
    })
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default BaseThemeProvider;
