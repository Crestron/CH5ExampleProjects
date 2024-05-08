import React, { useContext } from 'react';

// Import the styles from the scss file
import styles from './OPad8Way.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const DNavComponent = ({ join = 'MediaControl.Dpad' }) => {

  // Access the pulseDigital function
  const { pulseDigital } = useContext(CrComLibContext);

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
    <nav className={styles["o-pad"]}>
      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--up']}`} onClick={up}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>
      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--up-right']}`}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--right']}`} onClick={right}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--down-right']}`}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--up-left']}`}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--left']}`} onClick={left}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--down-left']}`}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--down']}`} onClick={down}>
        <img src="./images/icons/navigation/arrow.svg" />
      </button>

      <button className={`${styles['o-pad__button']} ${styles['o-pad__button--centre']}`} onClick={ok}>
      </button>
    </nav>
  );
};

export default DNavComponent;
