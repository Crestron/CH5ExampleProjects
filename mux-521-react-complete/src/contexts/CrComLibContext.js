import React from 'react';

// Import the Crestron Com Lib
import { CrComLib } from '@crestron/ch5-crcomlib';

//Attach methods to window when component mounts
window.CrComLib = CrComLib;
window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative;
window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative;
window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative;
window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative;

// Create a function to pulse a digital join
const pulseDigital = function (join, time = 0) {
  // Publish a true value to the join.
  CrComLib.publishEvent('b', join, true);
  // If a time is specified, release the join after the time has elapsed.
  // else publish a false value to the join immediately
  setTimeout(() => CrComLib.publishEvent('b', join, false), time ?? 0);
};

// Create a context for the Crestron Com Lib
export const CrComLibContext = React.createContext({
  subscribeState: CrComLib.subscribeState,
  unsubscribeState: CrComLib.unsubscribeState,
  publishEvent: CrComLib.publishEvent,
  pulseDigital,
  // getState: CrComLib.getState,
  // getBooleanSignalValue: CrComLib.getBooleanSignalValue,
  // getNumericSignalValue: CrComLib.getNumericSignalValue,
  // getStringSignalValue: CrComLib.getStringSignalValue,
  // getObjectSignalValue: CrComLib.getObjectSignalValue,
  //textFormat: CrComLib.textFormat,
  //subscribeInViewPortChange: CrComLib.subscribeInViewPortChange
});