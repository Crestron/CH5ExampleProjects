import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import './App.scss';

// Import the AppRouting
import AppRouting from './AppRouting';

// Import the WebXPanelService
import WebXPanelService from './services/WebXPanelService';

function App() {
  // Render the component UI
  return (
    <>
      <WebXPanelService />
      <Router>
        <AppRouting />
      </Router>
    </>
  );
}

export default App;
