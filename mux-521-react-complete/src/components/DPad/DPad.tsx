import React, { useContext } from 'react';

// Import the styles from the scss file
import styles from './DPad.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

// Create a type for the props
type DNavComponentProps = {
  join: string;
}

const DNavComponent: React.FC<DNavComponentProps> = ({ join = 'MediaControl.Dpad'}) => {
  // Access the pulseDigital function
  const { pulseDigital } = useContext(CrComLibContext);

  // Create the functions to send the digital pulses
  const up = () => {
    pulseDigital(`${join}.Up`);
  };

  const down = () => {
    pulseDigital(`${join}.Down`);
  };

  const left = () => {
    pulseDigital(`${join}.Left`);
  };

  const right = () => {
    pulseDigital(`${join}.Right`);
  };

  const ok = () => {
    pulseDigital(`${join}.Center`);
  };

  // Render the component UI
  return (
    <nav className={styles["d-pad"]}>
      <div className={styles["d-pad__corner--top-left"]}></div>

      <button className={styles["d-pad__button"]} onClick={up}>
        <img src="./images/icons/navigation/up.svg" alt="Up" />
      </button>

      <div className={styles["d-pad__corner--top-right"]}></div>

      <button className={styles["d-pad__button"]} onClick={left}>
        <img src="./images/icons/navigation/left.svg" alt="Left" />
      </button>

      <button className={`${styles['d-pad__button']} ${styles['d-pad__button--centre']}`} onClick={ok}>

      </button>
      <button className={styles["d-pad__button"]} onClick={right}>
        <img src="./images/icons/navigation/right.svg" alt="Right" />
      </button>

      <div className={styles["d-pad__corner--bottom-left"]}></div>

      <button className={styles["d-pad__button"]} onClick={down}>
        <img src="./images/icons/navigation/down.svg" alt="Down" />
      </button>

      <div className={styles["d-pad__corner--bottom-right"]}></div>
    </nav>
  );
};

export default DNavComponent;
