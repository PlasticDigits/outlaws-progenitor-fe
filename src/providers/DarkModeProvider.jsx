import { useWeb3ModalTheme } from '@web3modal/react';
import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const { theme, setTheme } = useWeb3ModalTheme();
  const [isDark, setIsDark] = useState(
    true //localStorage.getItem('isDark') === 'true'
  );
  useEffect(() => {
    setTheme({
      themeMode: isDark ? 'dark' : 'light',
      themeColor: 'green',
      themeBackground: 'themeColor',
    });
  }, [isDark]);
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem('isDark', !isDark);
  };
  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
