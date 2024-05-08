import React, { useState, useEffect, useContext } from 'react';

// Import the styles from the scss file
import styles from './NvxInfo.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

const NvxInfoComponent: React.FC = () => {

  // Access the subscribeState and unsubscribeState functions
  const { subscribeState, unsubscribeState } = useContext(CrComLibContext);

  // Initialize the address state
  const [address, setAddress] = useState<string>('0.0.0.0');

  useEffect(() => {
    // Subscribe to the NVX address
    const addressSubscription = subscribeState(
      's',
      'NvxInfo.NvxAddressFb.Indirect',
      (address: string) => {
        console.log('Nvx Info Address: ' + address);
        setAddress(address);
      }
    );

    // Cleanup function for component unmount
    return () => {
      unsubscribeState(
        's',
        'NvxInfo.NvxAddressFb.Indirect',
        addressSubscription
      );
    };
  }, [subscribeState, unsubscribeState]);

  // Render the component UI
  return (
    <>
      <div className={styles["nvx-info"]}>
        <span>NVX Address:</span>
        <span className="text-highlight">{address}</span>
      </div>
    </>
  );
};

export default NvxInfoComponent;



