import React, { useState, useEffect, useContext } from 'react';

// Import the styles from the scss file
import styles from './AirMedia.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const AirmediaComponent: React.FC = () => {

  // Access the subscribeState and unsubscribeState functions
  const { subscribeState, unsubscribeState } = useContext(CrComLibContext);

  // Initialize the address and pin states
  const [address, setAddress] = useState('0.0.0.0');
  const [pin, setPin] = useState('1988');

  useEffect(() => {

    // Subscribe to the AirMedia address
    const addressSubscription = subscribeState(
      's',
      'AirMediaInfo.AirmediaAddressFb.Indirect',
      (newAddress: string) => {
        if (newAddress.length === 0) return;
        console.log('Airmedia - Adddress Received: ' + newAddress);
        setAddress(newAddress);
      }
    );

    // Subscribe to the AirMedia pin
    const pinSubscription = subscribeState(
      's',
      'AirMediaInfo.AirmediaPinFb.Indirect',
      (newPin: string) => {
        if (newPin.length > 0) return;
        console.log('Airmedia pin received: ' + newPin);
        setPin(newPin);
      }
    );

    // Cleanup function for component unmount
    return () => {
      unsubscribeState('s', 'AirMediaInfo.AirmediaAddressFb.Indirect', addressSubscription);
      unsubscribeState('s', 'AirMediaInfo.AirmediaPinFb.Indirect', pinSubscription);
    };
  }, [subscribeState, unsubscribeState]); // The useEffect hook will only run when the subscribeState or unsubscribeState functions change

  // Render the component UI
  return (
    <>
      <div className={styles["airmedia"]}>
        <span>AirMedia Address:</span>
        <span className="text-highlight">{address}</span>
        <span>Access Pin:</span>
        <span className="text-highlight">{pin}</span>
      </div>
    </>
  );
};

export default AirmediaComponent;
