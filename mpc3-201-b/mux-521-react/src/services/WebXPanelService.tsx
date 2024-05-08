import React, { useEffect } from 'react';

// Crestron Web XPanel Import
import { getWebXPanel, runsInContainerApp } from '@crestron/ch5-webxpanel';

// Define the type for the query parameters.
interface QueryParameters {
  host?: string;
  ipid?: string;
  port?: number;
  roomid?: string;
  tokenurl?: string;
  authToken?: string;
  [key: string]: string | number | undefined;
};

// Define the type for the event detail.
interface EventDetail {
  reason?: string;
  redirectTo?: string;
  url?: string;
  ipId?: number;
  roomId?: string;
};

// Define constants for default configuration
const DEFAULT_CONFIG = {
  host: '192.168.200.111', // should be window.location.hostname once we are installed on the processor;
  ipid: '0x04',
  port: 49200,
  roomId: 'MASTERS',
  authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3MTA0MjExOTgsInVzZXJuYW1lIjoiT2ZmbGluZVRva2VuIiwiT3B0aW9uYWwiOiIxMjc2NTU3NjQwIn0.AWgTDF8uJDKUYpDWp_TtEWzKr1-I1FHK5uaSsquMDSw',
};

/** Gets the query parameters from the URL */
function getQueryParameters(): QueryParameters {
  // Get the url of the window location.
  const url = new URL(window.location.href);
  // Get the search parameters from the URL.
  const urlParameters = new URLSearchParams(url.search);
  // Create an object to store the queries.
  const queries: QueryParameters = {};
  // Loop through the search parameters and add them to the queries object.
  urlParameters.forEach((value, key) => {
    // Add the query to the queries object.
    queries[key.toLowerCase()] = value;
  });
  // Return the queries object.
  return queries;
}

const WebXPanelService: React.FC = () => {
  useEffect(() => {
    const {
      isActive,
      WebXPanel,
      WebXPanelConfigParams,
      WebXPanelEvents,
    } = getWebXPanel(!runsInContainerApp());

    // If the WebXPanel is not active, log a message to the console and exit.
    if (!isActive) {
      console.log('Not running on a WebXPanel environment. Exiting...');
      return;
    }

    // Log a message to the console to indicate that the WebXPanel is running.
    console.log('Running on a WebXPanel environment. Initializing...');

    // Create a function to add an event listener to the WebXPanel.
    const addEventListener = <K extends keyof typeof WebXPanelEvents>(
      event: K,
      callback: (detail: EventDetail) => void
    ) => {
      WebXPanel.addEventListener(WebXPanelEvents[event], (e: CustomEvent) => callback(e.detail as EventDetail));
    };

    // Add an event listener to the WebXPanel to listen for the NOT_AUTHORIZED event.
    addEventListener(WebXPanelEvents.NOT_AUTHORIZED, detail => {
      // If the WebXPanel is not authorized, log the reason to the console and redirect to the URL provided in the detail.
      console.log('Crestron WebXPanel Not authorized: ', detail);
      // Redirect to the URL provided in the detail.
      window.location.href = detail.redirectTo!;
    });

    // Add an event listener to the WebXPanel to listen for the CONNECT_CIP event.
    addEventListener(WebXPanelEvents.CONNECT_CIP, detail => {
      const { url, ipId, roomId } = detail;
      // Log the URL, IPID, and RoomID of the connection to the console.
      console.log(`Connected to ${url}, 0x${ipId!.toString(16).padStart(2, '0')}, ${roomId}`);
      console.log();
    });

    // Add an event listener to the WebXPanel to listen for the DISCONNECT_CIP event.
    addEventListener(WebXPanelEvents.DISCONNECT_CIP, detail => {
      // Log the reason for the disconnection to the console.
      console.log(`Disconnected from CIP. Reason: ${detail.reason}`);
    });

    // Add an event listener to the WebXPanel to listen for the Websocket error event.
    addEventListener(WebXPanelEvents.ERROR_WS, detail => {
      // Log the reason for the error to the console.
      console.log(`Websocket Error: ${detail.reason}`);
    });

    // Get the query parameters from the URL.
    const entries = getQueryParameters();

    // Set the WebXPanelConfigParams based on the query parameters.
    WebXPanelConfigParams.host = entries.host ?? DEFAULT_CONFIG.host;

    // Adding toLowerCase to ensure that if the IPID is entered accidentally as 0X00 rather than 0x00 it will still work.
    WebXPanelConfigParams.ipId = (entries.ipid ?? DEFAULT_CONFIG.ipid).toLowerCase();

    // If the port is not set, the default value of 49200 will be used.
    WebXPanelConfigParams.port = entries.port ?? DEFAULT_CONFIG.port;

    // If the room ID is not set, the default value of MASTERS will be used.
    WebXPanelConfigParams.roomId = entries.roomid ?? DEFAULT_CONFIG.roomId;

    // If the token URL is not set, the default value of the Crestron token URL will be used.
    WebXPanelConfigParams.tokenUrl = entries.tokenurl ?? `https://${WebXPanelConfigParams.host}/cws/websocket/getWebSocketToken`;

    // Log the WebXPanelConfigParams to the console.
    console.log('Crestron WebXPanelConfigParams: ', JSON.stringify(WebXPanelConfigParams));

    // Imitialise the WebXPanel with the WebXPanelConfigParams.
    WebXPanel.initialize(WebXPanelConfigParams);
  }, []);

  return null;
};

export default WebXPanelService;
