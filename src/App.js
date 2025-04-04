import { useEffect, useState } from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectOpener from './components/editor/ProjectOpener.js';
import MobileWarn from './components/MobileWarn.js';
import HomeScreen from './components/HomeScreen.js';
import Editor from './components/editor/Editor.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#535da8',
    },
    secondary: {
      main: '#283593',
    },
  },
});

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {isMobile ? (
          <MobileWarn />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/project" element={<ProjectOpener />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}