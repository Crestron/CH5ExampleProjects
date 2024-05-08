import React, { useState, useEffect, useContext } from 'react';

// Import the styles from the scss file
import styles from './MainPage.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

// Import the components used in this component
import PowerConfirmComponent from '../PowerConfirm/PowerConfirm';
import TitleBarComponent from '../TitleBar/TitleBar';
import SourceListComponent from '../SourceList/SourceList';
import VolumeComponent from '../Volume/Volume';
import NvxInfoComponent from '../NvxInfo/NvxInfo';
import MediaControlComponent from '../AppleTV/AppleTV';
import AirMediaComponent from '../AirMedia/AirMedia';

// Define the source enum
enum eSource {
  None = -1,
  AppleTV,
  AirMedia,
  GlobalSource2,
  GlobalSource3,
  GlobalSource4,
  GlobalSource5,
}

// Define the number of sources
const sourcesCount = 6;

const MainPage: React.FC = () => {
  
  // Access the subscribeState and unsubscribeStatefunctions
  const { subscribeState, unsubscribeState } = useContext(CrComLibContext);

  // Initialize the source state
  const [source, setSource] = useState<eSource>(eSource.None);

  useEffect(() => {
    // Subscribe to each source button
    const subscriptionIds = Array.from({ length: sourcesCount }, (_, index) => {
      return subscribeState('b', `MainPage.SourceList.Button${index + 1}ItemSelected`, (state: boolean) => {
        if (!state) return;
        setSource(index as eSource);
        console.log('Info -> main-page -> The source is now: ' + eSource[index]);
      });
    });

    // Cleanup function for component unmount
    return () => {
      subscriptionIds.forEach((id, index) => unsubscribeState('b', `MainPage.SourceList.Button${index + 1}ItemSelected`, id));
    };
  }, [subscribeState, unsubscribeState]);

  // Render the correct source content
  const sourceContent = () => {
    switch (source) {
      case eSource.None: return null;
      case eSource.AirMedia: return <AirMediaComponent />;
      case eSource.AppleTV: return <MediaControlComponent />;
      default: return <NvxInfoComponent />;
    }
  };

  // Render the component UI
  return (
    <div className={`page ${styles.page}`}>
      <PowerConfirmComponent />
      <TitleBarComponent />
      <div className="content">
        <SourceListComponent sources={sourcesCount} />
        <div className={styles['control-container']}>
          <span className={styles['source-title']}></span>
          <div className={styles['source-content']}>
            {sourceContent()}
          </div>
        </div>
        <VolumeComponent />
      </div>
    </div>
  );
}

export default MainPage;