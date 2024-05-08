/** A helper library to provide an interface to common CrComLib functions.
 * A small library of extension methods have also been added to simplify the use of CrComLib.
 */

export {};

declare global {
  /** CrComLib interface to provide a basic level of IntelliSense and auto-fill capabilities  */
  interface CrComLib {
    /**
     * Pulses the specified digital join.
     *
     * @remarks
     * This is an extension method to simply the pulsing of digital signals and not part of CrComLib.
     *
     * @param join The signal name or join number of the digital signal to pulse.
     * @param {number} [time] The time in milliseconds to hold the signal high before releasing it.
     */
    pulseDigital: (join: string, time?: number) => void;
    /**
     * Sets the specified digital join to the stated value.
     *
     * @remarks
     * This is an extension method to simply the setting of digital signals and not part of CrComLib.
     *
     * @param join The signal name or join number of the digital signal to set.
     * @param value The value to set the digital signal.
     */
    setDigital(join: string, state: boolean): void;
    /**
     * Sets the specified serial join to the stated value.
     *
     * @remarks
     * This is an extension method to simply the setting of serial signals and not part of CrComLib.
     *
     * @param join The signal name or join number of the serial signal to set.
     * @param value The value to set the serial signal.
     */
    setSerial(join: string, value: string): void;
    /**
     * Sets the specified analog join to the stated value.
     *
     * @remarks
     * This is an extension method to simply the setting of analog signals and not part of CrComLib.
     *
     * @param join The signal name or join number of the analog signal to set.
     * @param value The value to set the analog signal.
     */
    setAnalog(join: string, value: number): void;

    /**
     * Sets the specified object join to the stated value.
     *
     * @remarks
     * This is an extension method to simply the setting of objects and not part of CrComLib.
     *
     * @param join The signal name or join number of the object to set.
     * @param value The value to set the object signal.
     */
    setObject(join: string, value: object): void;
    /**
     * Sets the specified join to the stated value. The join type will be determined by the type of the value.
     *
     * @remarks
     * This is an extension method to simply the setting of signals and not part of CrComLib.
     *
     * @param join The signal name or join number of the signal to set.
     * @param value The value to set the signal.
     */
    setState(join: string, state: number | boolean | string | object): void;
    /**
     * Publishes an event to the specified signal.
     *
     * @param type The type of the signal valid values: "boolean" | "b" | "number" | "numeric" | "n" | "string" | "s" | "object" | "o".
     * @param join The name of the signal.
     * @param value The value that should be published on the signal.
     */
    publishEvent: (
      type: string,
      join: string,
      value: boolean | number | string | object
    ) => void;
    /**
     *Subscribes to the specified signal and calls the callback function when the signal changes.
     * @param type The type of the signal valid values: "boolean" | "b" | "number" | "numeric" | "n" | "string" | "s" | "object" | "o".
     * @param join The name of the signal.
     * @param callback Callback function that will be called on signal change. Receives one parameter the new value of the signal.
     * @param error Callback function that will be called on error. Receives one parameter, the new value of the signal.
     *
     * @returns The subscription id (required for unsubscribing from the signal).
     */
    subscribeState: (
      type: string,
      join: string,
      callback: (value: any) => void,
      error?: (value: any) => void
    ) => string;
    /**
     * Unsubscribes from the specified signal.
     * @param type The type of the signal valid values: "boolean" | "b" | "number" | "numeric" | "n" | "string" | "s" | "object" | "o".
     * @param join The name of the signal.
     * @param subscription The subscription id (from the subscribeState method).

    */
    unsubscribeState: (
      type: string,
      join: string,
      subscription: string
    ) => void;
    /**
     * Get the value of the specified signal.
     *
     * @param type The type of the signal valid values: "boolean" | "b" | "number" | "numeric" | "n" | "string" | "s" | "object" | "o".
     * @param join The name of the signal.
     * @param defaultValue If present, it is the default value returned if there are signals that have not been initialized.
     *
     * @returns The value of the signal or the default value if the signal has not been initialized.
     */
    getState(
      type: string,
      join: string,
      defaultValue?: boolean | number | string | object
    ): boolean | number | string | object | null;
    /**
     * Get the boolean value of the specified signal.
     *
     * @param join The name of the signal.
     * @param defaultValue If present, it is the default value returned if there are signals that have not been initialized.
     * @returns The boolean value of the signal or the default value if the signal has not been initialized.
     */
    getBooleanSignalValue: (
      join: string,
      defaultValue?: boolean
    ) => boolean | null;
    /**
     * Get the numeric (analog) value of the specified signal.
     *
     * @param join The name of the signal.
     * @param defaultValue If present, it is the default value returned if there are signals that have not been initialized.
     * @returns The numeric (analog) value of the signal or the default value if the signal has not been initialized.
     */
    getNumericSignalValue: (
      join: string,
      defaultValue?: number
    ) => number | null;
    /**
     * Get the string value of the specified signal.
     *
     * @param join The name of the signal.
     * @param defaultValue If present, it is the default value returned if there are signals that have not been initialized.
     * @returns The string value of the signal or the default value if the signal has not been initialized.
     */
    getStringSignalValue: (
      join: string,
      defaultValue?: string
    ) => string | null;
    /**
     * Get the object value of the specified signal.
     *
     * @param join The name of the signal.
     * @param defaultValue If present, it is the default value returned if there are signals that have not been initialized.
     * @returns The object value of the signal or the default value if the signal has not been initialized.
     */
    getObjectSignalValue: (
      join: string,
      defaultValue?: object
    ) => object | null;
    /**
     *
     * @param template String that can contain placeholders in the form {n} where n is a number starting from 1.
     * @param args The arguments that will replace the placeholders
     */
    textformat(template: string, ...args: any): string;
    /**
     *
     * @param signalScript String containing JS code. It can contain tokes in the form {{ signalType.signalName }} where signalType can be b(for boolean), s(for string) and n(for number) and signalName is the name of the signal. These tokens will be replaced with the corresponding signal value.
     * @param callback A function that receives one param (the updated and parsed signalScript). It is called each time one of the signals (from the signalScript tokens) changes
     * @param defaultValue If present, it is the default value returned if there are signals that have not been initialized.
     * @returns A subscription id that can be used to unsubscribe from the signal.
     */
    subscribeStateScript(
      signalScript: string,
      callback: (value: any) => void,
      defaultValue: string
    ): string;
    /**
     *
     * @param subscription The subscription id (from the subscribeStateScript method).
     */
    unsubscribeStateScript(subscription: string): void;

    /**
     *
     * @param el HTMLElement that can be observed when enters or leaves the viewport.
     * @param callback Executed when the element enters or leaves the viewport callback params el: HTMLElement, isInViewport: boolean.
     */
    subscribeInViewPortChange(
      el: HTMLElement,
      callback: (el: HTMLElement, isInViewport: boolean) => void
    ): void;
  }
}

/** Extension Methods Below */

// Declare the CrComLib object so we can extend it.
declare var CrComLib: CrComLib;

CrComLib.pulseDigital = function (join: string, time?: number): void {
  // Publish a true value to the join.
  CrComLib.publishEvent('b', join, true);
  // If a time (ms) is specified, release the join after the time has elapsed.
  // Else publish a false value to the join immediately
  setTimeout(() => CrComLib.publishEvent('b', join, false), time ?? 0);
};

CrComLib.setDigital = function (join: string, state: boolean): void {
  // Publish the state to the join.
  CrComLib.publishEvent('b', join, state);
};

CrComLib.setAnalog = function (join: string, value: number): void {
  // Publish the value to the join.
  CrComLib.publishEvent('n', join, value);
};

CrComLib.setSerial = function (join: string, value: string): void {
  // Publish the value to the join.
  CrComLib.publishEvent('s', join, value);
};

CrComLib.setObject = function (join: string, value: object): void {
  // Publish the value to the join.
  CrComLib.publishEvent('o', join, value);
};

CrComLib.setState = function (
  join: string,
  value: number | boolean | string | object
): void {
  // Publish the value to the appropriate join.
  CrComLib.publishEvent(typeof value, join, value);
};
