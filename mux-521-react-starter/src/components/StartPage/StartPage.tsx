import React, { useContext } from 'react';

// Import the styles from the scss file
import styles from './StartPage.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const StartPage = () => {

  // Access the pulseDigital function
  const { pulseDigital } = useContext(CrComLibContext);

  /** The start button has been clicked  */
  const onStartButtonClicked = () => {
    // Write to console what has happened.
    console.log('Info -> The start button has been clicked.');

    // Pulse the digital join for the start button.
    pulseDigital('StartPage.Button.Press');
    /** The start button has been clicked  */
    // publishEvent('b','StartPage.Button.Press',true);
    // publishEvent('b','StartPage.Button.Press',false);
  };

  return (
    <div className={`page ${styles.page}`}>
      <button className={styles["page__start-button"]} onClick={onStartButtonClicked}>
        <img src="./images/logo/swirl.svg" alt="Logo" />
      </button>
    </div>
  );
}

export default StartPage;
