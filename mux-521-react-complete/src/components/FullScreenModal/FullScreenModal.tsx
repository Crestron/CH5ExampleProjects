import React, { useEffect, useState } from 'react';
import styles from './FullScreenModal.module.scss';

interface FullScreenModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  shouldCloseOnChildClick?: boolean;
  autoCloseTimeout?: number; // New prop for auto-close functionality
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  visible,
  onClose,
  children,
  shouldCloseOnChildClick = false,
  autoCloseTimeout, // Optional, so it may be undefined
}) => {
  const [bodyHeight, setBodyHeight] = useState('100vh');

  useEffect(() => {
    // Update the modal height to match the body's scroll height
    const updateHeight = () => {
      const currentBodyHeight = document.body.scrollHeight + 'px';
      setBodyHeight(currentBodyHeight);
    };

    updateHeight(); // Initial update
    window.addEventListener('resize', updateHeight); // Adjust height on window resize

    return () => window.removeEventListener('resize', updateHeight); // Cleanup on unmount
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    // Set up the auto-close functionality if the autoCloseTimeout is provided
    if (autoCloseTimeout && visible) {
      timeoutId = setTimeout(() => {
        onClose();
      }, autoCloseTimeout);
    }

    // Cleanup the timeout when the component unmounts or the visibility changes
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [autoCloseTimeout, visible, onClose]);

  if (!visible) return null;

  const handleClick = () => {
    console.log('Clicked on the modal background');
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('Clicked on the modal content');
    if (shouldCloseOnChildClick) return;
    
    e.stopPropagation();
  };

  const heightStyle: React.CSSProperties = {
    height: bodyHeight,
  };

  return (
    <div className={styles.fullScreenModal} style={heightStyle} onClick={handleClick}>
      <div onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default FullScreenModal;
