import React, { useState, useContext } from 'react';
import styles from './AppleTV.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const AppleTV = () => {
    const [pressed, setPressed] = useState(false);

    // Destructure the CrComLibContext to access publishEvent function
    const { publishEvent } = useContext(CrComLibContext);
  
    const remoteKey = (key: string, state: boolean) => {
        // Setting pressed to true when a key is pressed to illuminate the indicator led
        setPressed(state);
        // Publish the remote key event to the CrComLib library
        publishEvent('b', `AppleTV.${key}`, state);
        // Log to the console the key that was pressed or released
        console.log(`AppleTV.${key} ${state ? 'Pressed' : 'Released'}`);
    };

    const handleKeyDown = (key: string) => () => remoteKey(key, true);
    const handleKeyUp = (key: string) => () => remoteKey(key, false);

    return (
        <div className={styles["apple-tv-container"]}>
            <div className={styles["apple-tv-remote"]}>
                <div className={styles["apple-tv-remote__top-bar"]}>
                    <div className={styles["apple-tv-remote__spacer"]}></div>
                    <div className={`${styles["apple-tv-remote__indicator"]} ${pressed ? styles["illuminated"] : ''}`}></div>
                    <button
                        className={styles["apple-tv-remote__power-button"]}
                        onMouseDown={handleKeyDown('Power')}
                        onMouseUp={handleKeyUp('Power')}
                        onMouseLeave={handleKeyUp('Power')}
                    >
                        <img src="./icons/apple-tv/power.svg" alt="Power" />
                    </button>
                </div>

                <nav className={styles["apple-tv-remote__d-nav"]}>
                    {[
                        { name: 'Up', icon: 'up' },
                        { name: 'Down', icon: 'down' },
                        { name: 'Left', icon: 'left' },
                        { name: 'Right', icon: 'right' },
                        { name: 'Ok', icon: 'centre' }
                    ].map(({ name, icon }) => (
                        <button
                            key={name}
                            className={`${styles["d-nav__button"]} ${styles[`d-nav__button--${icon.toLowerCase()}`]}`}
                            onMouseDown={handleKeyDown(name)}
                            onMouseUp={handleKeyUp(name)}
                            onMouseLeave={handleKeyUp(name)}
                        >
                            {/* <img src={`./icons/apple-tv/${icon}.svg`} alt={name} /> */}
                        </button>
                    ))}
                </nav>

                <div className={styles["apple-tv-remote__buttons"]}>
                    {[
                        { name: 'Back', icon: 'left-arrow' },
                        { name: 'TV', icon: 'tv' },
                        { name: 'VolumeUp', icon: 'plus' },
                        { name: 'VolumeDown', icon: 'minus' },
                        { name: 'PlayPause', icon: 'play-pause' },
                        { name: 'Mute', icon: 'speaker-mute' }
                    ].map(({ name, icon }) => (
                        <button
                            key={name}
                            className={`${styles["remote-button"]} ${styles[`remote-button--${name.toLowerCase()}`]}`}
                            onMouseDown={handleKeyDown(name)}
                            onMouseUp={handleKeyUp(name)}
                            onMouseLeave={handleKeyUp(name)}
                        >
                            <img src={`./icons/apple-tv/${icon}.svg`} alt={name} />
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AppleTV;
