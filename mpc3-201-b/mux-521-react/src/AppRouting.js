import React, { useEffect, useContext } from 'react';

// Import the react-router-dom components
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import the CrComLibContext
import { CrComLibContext } from './contexts/CrComLibContext';

// Import the StartPageComponent and MainPageComponent
import MPCComponent from './components/MPC/MPC';

function AppRouting() {
  const { subscribeState, unsubscribeState } = useContext(CrComLibContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    // Stop the context menu from appearing
    const handleContextMenu = (e) => {
      console.log(e.button);
      e.preventDefault();
    };

    // Add an event listener to the document to handle the context menu
    document.addEventListener('contextmenu', handleContextMenu, false);
  }, [subscribeState, unsubscribeState, navigate]);

  // Return the Routes component
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<MPCComponent />} />
    </Routes>
  );
}

export default AppRouting;
