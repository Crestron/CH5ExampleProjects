import React, { useEffect, useContext } from 'react';

// Import the react-router-dom components
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import the CrComLibContext
import { CrComLibContext } from './contexts/CrComLibContext';

// Import the StartPageComponent and MainPageComponent
import StartPageComponent from './components/StartPage/StartPage';
import MainPageComponent from './components/MainPage/MainPage';


function AppRouting() {
  const { subscribeState, unsubscribeState } = useContext(CrComLibContext);
  const navigate = useNavigate();
  useEffect(() => {
    const mainPageVisibilitySubscription = subscribeState(
      'b',
      'MainPageVisibilityJoin',
      (state) => {
        if (state) {
          console.log('The control system has requested we navigate to the main page.');
          navigate('/main-page');
        }
      }
    );
    
    const startPageVisibilitySubscription = subscribeState(
      'b',
      'StartPageVisibilityJoin',
      (state) => {
        if (state) {
          console.log('The control system has requested we navigate to the start page.');
          navigate('/home');
        }
      }
    );

    // Stop the context menu from appearing
    const handleContextMenu = (e) => {
      console.log(e.button);
      e.preventDefault();
    };

    // Add an event listener to the document to handle the context menu
    document.addEventListener('contextmenu', handleContextMenu, false);

    return () => {
      unsubscribeState('b', 'MainPageVisibilityJoin', mainPageVisibilitySubscription);
      unsubscribeState('b', 'StartPageVisibilityJoin', startPageVisibilitySubscription);
      document.removeEventListener('contextmenu', handleContextMenu, false);
    };
  }, [subscribeState, unsubscribeState, navigate]);

  // Return the Routes component
  return (
    <Routes>
      {/* If the path is '/' navigate to the home page */}
      <Route path="/" element={<Navigate replace to="/home" />} />

      {/* If the path is '/home' render the StartPageComponent */}
      <Route path="/home" element={<StartPageComponent />} />

      {/* If the path is '/main-page' render the MainPageComponent */}
      <Route path="/main-page" element={<MainPageComponent />} />

      {/* If the path is anything else render the StartPageComponent */}
      <Route path="*" element={<StartPageComponent />} />
    </Routes>
  );
}

export default AppRouting;
