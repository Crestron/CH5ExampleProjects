import React, { useState, useEffect, useContext } from 'react';
import styles from './MPC.module.scss';

import AppleTVComponent from '../AppleTV/AppleTV';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

enum Source {
  None = 0,
  Pc = 1,
  Laptop,
  AppleTv,
  Bluray,
  Hdmi,
  InputPlate,
}

enum Power {
  Off,
  On,
  Warming,
  Cooling,
}

const MPCComponent: React.FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [mute, setMute] = useState<boolean>(false);
  const [source, setSource] = useState<Source>(Source.None);
  const [power, setPower] = useState<Power>(Power.Off);

  const gaugeWidth = `${(level / 655.35)}%`;

  // Destructure the CrComLibContext to access the subscribeState, unsubscribeState, publishEvent and pulseDigital functions
  const { subscribeState, unsubscribeState, publishEvent, pulseDigital } = useContext(CrComLibContext);

  // Converts the Angular ngOnInit lifecycle hook
  useEffect(() => {
    const levelSubscription = subscribeState(
      'n',
      'MPC3201B.Bargraph',
      (level: number) => setLevel(level)
    );

    const sourceSubscription = subscribeState(
      'n',
      'MPC3201B.SourceFb',
      (source: number) => setSource(source)
    );

    const powerSubscription = subscribeState(
      'n',
      'MPC3201B.PowerState',
      (power: number) => setPower(power)
    );

    const muteSubscription = subscribeState(
      'b',
      'MPC3201B.MuteFb',
      (mute: boolean) => setMute(mute)
    );

    // Equivalent of ngOnDestroy to clean up subscriptions
    return () => {
      unsubscribeState('n', 'MPC3201B.Bargraph', levelSubscription);
      unsubscribeState('n', 'MPC3201B.SourceFb', sourceSubscription);
      unsubscribeState('n', 'MPC3201B.PowerState', powerSubscription);
      unsubscribeState('b', 'MPC3201B.MuteFb', muteSubscription);
    };
  }, [subscribeState, unsubscribeState]);

  const busy = power > Power.On;
  const isSourceSelected = (checkSource: Source) => source === checkSource;

  // Event handlers
  const selectSource = (source: Source) => publishEvent('n', 'MPC3201B.Source', source);
  const volumeUp = (state: boolean) => publishEvent('b', 'MPC3201B.VolumeUp', state);
  const volumeDown = (state: boolean) => publishEvent('b', 'MPC3201B.VolumeDown', state);
  const muteToggle = () => pulseDigital('MPC3201B.Mute');
  const powerToggle = () => pulseDigital('MPC3201B.Power');

  return (
    <div className={styles['container']}>
      <div className={`${styles['apple-tv-remote']} ${styles['disabled']}`}>
        <AppleTVComponent /> 
      </div>

      <div className={styles['mpc-3-201']}>
        <div className={styles['mpc-3-201__upper-section']}>
          <div className={styles['sensor-bar']}>
            <div className={`${styles['sensor-bar__sensor']} ${styles['sensor-bar__sensor--proximity']}`}></div>
            <div className={`${styles['sensor-bar__sensor']} ${styles['sensor-bar__sensor--light']}`}></div>
          </div>
          <div className={styles['source-buttons']}>
            <button className={`${styles['source-button']} ${source === Source.Pc ? styles.selected : ''}`} onClick={() => selectSource(Source.Pc)}>
                <img src="./icons/sources/pc.svg" alt="PC" />
            </button>
            <button className={`${styles['source-button']} ${source === Source.Laptop ? styles.selected : ''}`} onClick={() => selectSource(Source.Laptop)}>
              <img src="./icons/sources/laptop.svg" alt="Laptop" />
            </button>
            <button className={`${styles['source-button']} ${source === Source.AppleTv ? styles.selected : ''}`} onClick={() => selectSource(Source.AppleTv)}>
              <img src="./icons/sources/apple-tv.svg" alt="Apple TV" />
            </button>
            <button className={`${styles['source-button']} ${source === Source.Bluray ? styles.selected : ''}`} onClick={() => selectSource(Source.Bluray)}>
              <img src="./icons/sources/blu-ray.svg" alt="Blu-ray" />
            </button>
            <button className={`${styles['source-button']} ${source === Source.Hdmi ? styles.selected : ''}`} onClick={() => selectSource(Source.Hdmi)}>
              LECTERN<br />HDMI
            </button>
            <button className={`${styles['source-button']} ${source === Source.InputPlate ? styles.selected : ''}`} onClick={() => selectSource(Source.InputPlate)}>
              FLOOR<br />PLATE
            </button>
          </div>
        </div>

        <div className={styles['mpc-3-201__lower-section']}>
          <div className={`${styles['mpc-3-201__lower-section--crestron-logo']}`}></div>
          <div className={styles['control-strip']}>
            <button className={`${styles['power-button']} ${mute ? styles.selected : ''}`} onClick={muteToggle}>
              <img src="./icons/volume/mute.svg" alt="Mute" />
            </button>
            <div className={styles['control-strip__volume']}>
              <button className={styles['volume-button']} onMouseDown={() => volumeDown(true)} onMouseUp={() => volumeDown(false)} onMouseLeave={() => volumeDown(false)}>
                <img src="./icons/volume/minus.svg" alt="Volume Down" />
              </button>
              <div className={styles['control-strip__volume-bar']}>
                <div id="bargraph" className={styles['control-strip__volume-bar--indicator']} style={{ width: gaugeWidth }}></div>
                <ul className={styles['control-strip__volume-bar--segments']}>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <button className={styles['volume-button']} onMouseDown={() => volumeUp(true)} onMouseUp={() => volumeUp(false)} onMouseLeave={() => volumeUp(false)}>
                <img src="./icons/volume/plus.svg" alt="Volume Up" />
              </button>
            </div>
            <button className={`${styles['power-button']} ${power === Power.On ? styles.selected : ''} ${busy ? styles.busy : ''}`} onClick={powerToggle}>
              <img src="./icons/general/power.svg" alt="Power" />
            </button>
          </div>
          <img className={styles['crestron-logo']} src="./logo/crestron-no-swirl.svg" alt="Crestron Logo" />
        </div>
      </div>

      <div className={`${styles['apple-tv-remote']} styles.disabled`}>
      </div>
    </div>
    
  );
};

export default MPCComponent;
