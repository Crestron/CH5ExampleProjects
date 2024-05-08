import React, { useState, useEffect, useContext } from 'react';

// Import the styles from the scss file
import styles from './SourceList.module.scss';

// Import the CrComLibContext
import { CrComLibContext } from '../../contexts/CrComLibContext';

// Define the SourceButton interface
interface SourceButton {
  title: string;
  state: boolean;
}

// Define the SourceListComponentProps interface
interface SourceListComponentProps {
  sources: number;
}

const SourceListComponent: React.FC<SourceListComponentProps> = ({ sources }) => {

  // Access the subscribeState, unsubscribeState, and pulseDigital functions
  const { subscribeState, unsubscribeState, pulseDigital } = useContext(CrComLibContext);

  // Initialize the sourceButtons state with the correct type
  const [sourceButtons, setSourceButtons] = useState<SourceButton[]>([]);

  useEffect(() => {
    // Initialize sourceButtons with the default values
    const newSourceButtons = Array.from({ length: sources }, () => ({ title: '', state: false }));

    // Update the sourceButtons state
    setSourceButtons(newSourceButtons);

    // Subscribe to each source button
    const subscriptions = newSourceButtons.map((_, index) => ({
      
      // Subscribe to the title state
      titleSubscription: subscribeState(
        's',
        `MainPage.SourceList.Button${index + 1}Text`,
        (title: string) => updateSourceButton(index, 'title', title)
      ),

      // Subscribe to the state of each source button
      stateSubscription: subscribeState(
        'b',
        `MainPage.SourceList.Button${index + 1}ItemSelected`,
        (state: boolean) => updateSourceButton(index, 'state', state)
      ),
    }));

    // Cleanup function for component unmount
    return () => {
      // Unsubscribe from each source button
      subscriptions.forEach(({ titleSubscription, stateSubscription }, index) => {
        unsubscribeState('s', `MainPage.SourceList.Button${index + 1}Text`, titleSubscription);
        unsubscribeState('b', `MainPage.SourceList.Button${index + 1}ItemSelected`, stateSubscription);
      });
    };
  }, [sources, subscribeState, unsubscribeState]); // The useEffect hook will only run when the sources, subscribeState, or unsubscribeState functions change

  // Update the sourceButtons state based on the index and key
  const updateSourceButton = (index: number, key: 'title' | 'state', value: string | boolean) => {
    setSourceButtons(prevButtons => prevButtons.map((button, i) =>
      i === index ? { ...button, [key]: value } : button
    ));
  };

  // Function to select a source button
  const selectSource = (index: number) => {
    pulseDigital(`MainPage.SourceList.Button${index + 1}ItemPress`);
  }

  // Render the component UI
  return (
    <ul className={styles["source-list"]}>
      {sourceButtons.length ? (
        sourceButtons.map((button, index) => (
          <li key={index} className="source-list__item">
            <button
              className={`${styles['source-list__button']} ${button.state ? styles['selected'] : ''}`}
              onClick={() => selectSource(index)}
            >
              {button.title}
            </button>
          </li>
        ))
      ) : (
        // Handling the case where there are no source buttons
        <li className="source-list__item">No sources available</li>
      )}
    </ul>
  );
};

export default SourceListComponent;