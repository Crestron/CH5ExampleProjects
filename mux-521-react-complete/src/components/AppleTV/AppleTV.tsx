import React, { useContext } from 'react';

// Import the styles from the scss file
import styles from './AppleTV.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

// Import the Dpad & OPad Components

/* --------------------------------------------------------------- */
/* TODO: Exercise 5.1: Add the DPad Component to the imports       */
/* --------------------------------------------------------------- */

/* ------------------------------------------------------------------ */
/* TODO: Exercise 5.2: Ensure the import has been added automatically */
/* This step does not apply to React                                  */
/* ------------------------------------------------------------------ */
import DpadComponent from '../DPad/DPad';
import OpadComponent from '../OPad/OPad';
import OpadAltComponent from '../OPadAlt/OPadAlt';
import Opad8WayComponent from '../OPad8Way/OPad8Way';

const MediaControlComponent: React.FC = () => {

    // Access the pulseDigital function
    const { pulseDigital } = useContext(CrComLibContext);

    const back = () => {
        pulseDigital('MediaControl.BackButton.Press');
    };

    const playPause = () => {
        pulseDigital('MediaControl.PlayButton.Press');
    };

    const menu = () => {
        pulseDigital('MediaControl.MenuButton.Press');
    };

    // Render the component UI
    return (
        <div className={styles["media-control"]}>
            <div className={styles["media-control__instructions"]}>
                <img
                    className={styles["media-control__instructions-icon"]}
                    src="./images/icons/navigation/swipe.svg"
                    alt="Swipe icon"
                />
                <span className={styles["media-control__instructions-text"]}>
                    Swipe to change D-Pad style
                </span>
            </div>
            {/* This is our custom D-NAV component */}
            <ul className={styles["media-control__d-pad-list"]}>
                {/* --------------------------------------------------------------------
                 TODO - Exercise 5.3: Add our D-Pad component to our HTML
                -------------------------------------------------------------------- */}

                {/* --------------------------------------------------------------------
                 TODO - Exercise 5.4: Add a join import to our component
                 Hint: The contract name for our D-PAD is:  "MediaControl.Dpad"
                -------------------------------------------------------------------- */}

                {/* ---------------------------------------------------------------
                 TODO - Exercise 5.5: Uncomment the further examples below
                --------------------------------------------------------------- */}
                <li className={styles["media-control__d-pad-item"]}>
                    <DpadComponent join="MediaControl.Dpad" />
                </li>
                <li className={styles["media-control__d-pad-item"]}>
                    <OpadComponent join="MediaControl.Dpad" />
                </li>
                <li className={styles["media-control__d-pad-item"]}>
                    <OpadAltComponent join="MediaControl.Dpad" />
                </li>
                <li className={styles["media-control__d-pad-item"]}>
                    <Opad8WayComponent join="MediaControl.Dpad" />
                </li>
            </ul>
            <div className={styles["media-control__button-container"]}>
                <button className={styles["media-control__button"]} onClick={back}>Back</button>
                <button className={styles["media-control__button"]} onClick={playPause}>
                    <img src="./images/icons/transport/play-pause.svg" alt="Play/Pause" />
                </button>
                <button className={styles["media-control__button"]} onClick={menu}>Menu</button>
            </div>
        </div>
    );
};

export default MediaControlComponent;
