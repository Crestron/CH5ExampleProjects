import React, { useEffect, useState, useContext } from 'react';

// Import the styles from the scss file
import styles from './Volume.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const VolumeComponent: React.FC = () => {

  // Access the subscribeState, unsubscribeState, and pulseDigital functions
  const { subscribeState, unsubscribeState, publishEvent, pulseDigital } = useContext(CrComLibContext);

  /* --------------------------------------------------------------------------------- */
  /* TODO - Exercise 4.1: Add a state for our mute state and initialise it with false */
  /* --------------------------------------------------------------------------------- */
  const [mute, setMute] = useState<boolean>(false);


  /* ------------------------------------------------------------------------------ */
  /* TODO - Exercise 4.2: Add a state for our level value and initialise it with 0 */
  /* ------------------------------------------------------------------------------ */
  const [level, setLevel] = useState<number>(0);

  // Compute gauge height based on level
  const gaugeHeight = `0%`;


  /* ------------------------------------------------------------------------------ */
  /* TODO - Exercise 4.7: Create a function to correctly scale our gauge            */
  /* ------------------------------------------------------------------------------ */

  useEffect(() => {
    /* ------------------------------------------------------------------------------------------------------------- */
    /* TODO - Exercise 4.3: Subscribe to our mute & level joins                                                      */
    /* HINT: - The join for the mute state is: 'MainPage.MutedFeedback.Visibility'                                   */
    /* HINT: - The join for the volume level is: 'MainPage.VolumeBar.Touchfb'                                        */
    /* HINT: - The standard method to subscribe to a join is: 'handle = CrComLib.subscribeState(type, join, action)' */
    /* ------------------------------------------------------------------------------------------------------------- */
    // Subscribe to mute state
    const muteSubscription = subscribeState(
      'b',
      'MainPage.MutedFeedback.Visibility',
      (mute: boolean) => {
        setMute(mute);
        console.log('The mute state is: ' + mute);
      }
    );
    // Subscribe to volume level
    const levelSubscription = subscribeState(
      'n',
      'MainPage.VolumeBar.Touchfb',
      (level: number) => {
        setLevel(level);
        console.log('The volume level is: ' + level);
      }
    );



    // Cleanup function for component unmount
    return () => {
      /* ------------------------------------------------------------------------------------------------------------- */
      /* TODO - Exercise 4.4: Unsubscribe to our mute & level joins                                                    */
      /* ------------------------------------------------------------------------------------------------------------- */
      unsubscribeState('b', 'MainPage.MutedFeedback.Visibility', muteSubscription);
      unsubscribeState('n', 'MainPage.VolumeBar.Touchfb', levelSubscription);
    };
  }, [subscribeState, unsubscribeState]);

  const rampUp = (state: boolean) => {
    publishEvent('b', 'MainPage.VolumeButtonList.Button1ItemPress', state);
  };

  const rampDown = (state: boolean) => {
    publishEvent('b', 'MainPage.VolumeButtonList.Button3ItemPress', state);
  };

  const muteToggle = () => {
    pulseDigital('MainPage.VolumeButtonList.Button2ItemPress');
  };

  // Render the component UI
  return (
    <div className={styles["volume"]}>
      <div className={styles["volume__buttons"]}>
        <button
          className={styles["volume__button"]}
          onPointerDown={() => rampUp(true)}
          onPointerUp={() => rampUp(false)}
          onPointerOut={() => rampUp(false)}
        >
          <img src='./images/icons/volume/speaker-up.svg' alt="" />
        </button>

        {/* ---------------------------------------------------------------------------------------- */}
        {/* TODO - Exercise 4.5: Apply volume__button--selected to the mute button Hint mute()       */}
        {/* paste the code after className={styles["volume__button"]                                 */}
        {/* ---------------------------------------------------------------------------------------- */}
        <button
          className={`${styles["volume__button"]} ${mute ? styles["selected"] : ''}`}
          onClick={muteToggle}
        >
          <img src='./images/icons/volume/speaker-mute.svg' alt="" />
        </button>

        <button
          className={styles["volume__button"]}
          onPointerDown={() => rampDown(true)}
          onPointerUp={() => rampDown(false)}
          onPointerOut={() => rampDown(false)}
        >
          <img src='./images/icons/volume/speaker-down.svg' alt="" />
        </button>
      </div>

      <div className={styles["volume__gauge"]} style={{ mixBlendMode: 'screen' }}>
        {/* -------------------------------------------------------------------------- */}
        {/* TODO - Exercise 4.6: Apply style.height to the indicator                   */}
        {/* paste the code after className={styles["volume__gauge--indicator"]}        */}
        {/* -------------------------------------------------------------------------- */}
        <div className={styles["volume__gauge--indicator"]} style={{ height: `${level/ 655.35}%` }}></div>
        {/* <ul className={styles["volume__gauge--segments"]}>
          {[...Array(10)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default VolumeComponent;
