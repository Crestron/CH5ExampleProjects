import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';

// Import the styles from the scss file
import styles from './PowerConfirm.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const PowerConfirmComponent = () => {

  // Access the subscribeState, unsubscribeState, and pulseDigital functions
  const { subscribeState, unsubscribeState, pulseDigital } = useContext(CrComLibContext);

  // Initialize the visible state
  const [visible, setVisible] = useState(false);

  // Handle for the visibility subscription
  const visibilitySubscription = useRef("");

  // Handle for the timeout
  const timerHandle = useRef<number | null>(null);

  // Define the handleYes and handleNo methods, wrapped in a useCallback hook to prevent unnecessary re-renders
  const handleYes = useCallback(() => {
    pulseDigital('PowerOffOk.PowerOffYesButton.Press');
  }, [pulseDigital]);

  const handleNo = useCallback(() => {
    pulseDigital('PowerOffOk.PowerOffNoButton.Press');
  }, [pulseDigital]);

  useEffect(() => {

    // Toggle the popup visibility and handle the timeout
    const toggleTimeout = (state: boolean) => {
      if (state) {
        // If the state is true, set a timeout to call the noMethod after 10 seconds
        timerHandle.current = window.setTimeout(handleNo, 10000);
      } else {
        // If the state is false, clear the timeout
        if (timerHandle.current !== null) window.clearTimeout(timerHandle.current);
      }
    };

    // Subscribe to the Power Off visibility
    visibilitySubscription.current = subscribeState(
      'b',
      'MainPage.PowerOffOk.Visibility',
      (state: boolean) => {
        console.log('Power On / Off Visibility: ' + state);
        setVisible(state);
        toggleTimeout(state);
      }
    );

    // Cleanup function for component unmount
    return () => {
      // Clear the timeout
      if (timerHandle.current !== null) window.clearTimeout(timerHandle.current);
      unsubscribeState(
        'b',
        'MainPage.PowerOffOk.Visibility',
        visibilitySubscription.current
      );
    };
  }, [subscribeState, unsubscribeState, handleNo]);

  // Render the component UI
  return (
    <div>
      {visible && (
        <div className={styles["power-confirm"]}>
          <span className={styles["power-confirm__title"]}>Power System Off?</span>
          <div className={styles["power-confirm__buttons"]}>
            <button className={`${styles['power-confirm__button']} ${styles['power-confirm__button--green']}`} onClick={handleYes}>Yes</button>
            <button className={`${styles['power-confirm__button']} ${styles['power-confirm__button--red']}`} onClick={handleNo}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerConfirmComponent;
