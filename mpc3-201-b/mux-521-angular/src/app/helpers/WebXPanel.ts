import { Injectable, NgZone } from '@angular/core';

/** Crestron Web XPanel Import */
import { getWebXPanel, runsInContainerApp } from '@crestron/ch5-webxpanel';

const {
  isActive,
  WebXPanel,
  WebXPanelConfigParams,
  WebXPanelEvents,
  getVersion,
  getBuildDate,
} = getWebXPanel(!runsInContainerApp());

// Log the version and build date of the WebXPanel to the console.
console.log(`Crestron WebXPanel version: ${getVersion()}`);
console.log(`Crestron WebXPanel build date: ${getBuildDate()}`);

@Injectable({
  providedIn: 'root',
})
export class WebXPanelService {
  constructor(private ngZone: NgZone) {
    // Add an event listener to the WebXPanel to listen for the NOT_AUTHORIZED event.
    WebXPanel.addEventListener(
      WebXPanelEvents.NOT_AUTHORIZED,
      ({ detail }: any) => {
        // If the WebXPanel is not authorized, log the reason to the console and redirect to the URL provided in the detail.
        console.log('Crestron WebXPanel Not authorized: ', detail);
        // Redirect to the URL provided in the detail.
        window.location.href = detail.redirectTo;
      }
    );

    WebXPanel.addEventListener(
      WebXPanelEvents.CONNECT_CIP,
      ({ detail }: any) => {
        const { url, ipId, roomId } = detail;
        console.log(
          `Connected to ${url}, 0x${ipId
            .toString(16)
            .padStart(2, '0')}, ${roomId}`
        );
      }
    );

    WebXPanel.addEventListener(
      WebXPanelEvents.DISCONNECT_CIP,
      ({ detail }: any) => {
        const { reason } = detail;
        console.log(`Disconnected from CIP. Reason: ${reason}`);
      }
    );

    WebXPanel.addEventListener(WebXPanelEvents.ERROR_WS, ({ detail }: any) => {
      const { reason } = detail;
      console.log(`Websocket Error: ${reason}`);
    });

    if (isActive) {
      // Get the query parameters from the URL.
      var entries = this.GetQueryParameters();
      // Set the WebXPanelConfigParams based on the query parameters.
      // If the query parameters are not set, the default values will be used.
    //  WebXPanelConfigParams.host = entries['host'] ?? '192.168.1.211'; // should be window.location.hostname once we are installed on the processor;
      
      WebXPanelConfigParams.host = entries['host'] ?? window.location.hostname; // should be window.location.hostname once we are installed on the processor;
      // Adding toLowerCase to ensure that if the IPID is entered accidentally as 0X00 rather than 0x00 it will still work.
      WebXPanelConfigParams.ipId = (entries['ipid'] ?? '0x04').toLowerCase();
      WebXPanelConfigParams.port = entries['port'] ?? 49200;
     // WebXPanelConfigParams.roomId = entries['roomid'] ?? 'MPC3201B';
      // WebXPanelConfigParams.tokenSource = entries['tokensource'];
        WebXPanelConfigParams.tokenUrl =
          entries['tokenurl'] ||
          `https://${WebXPanelConfigParams.host}/cws/websocket/getWebSocketToken`;
      //   WebXPanelConfigParams.authToken =
      //   entries['authtoken'] ??
      // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ4ZDFmMzY4LWFlNmUtNGVlZi04YzhiLWY3MWFjOWM3OThjOCIsImx2IjoiRGVmYXVsdCBMZXZlbCIsInZlciI6IjEuMCIsImV4cGkiOiIwIn0.qJvblCW6ZpkkmWU6BJ2UUh6OuHfjgoRw-Lm5_-zwX2U';

      console.log(
        'Crestron WebXPanelConfigParams: ' +
          JSON.stringify(WebXPanelConfigParams)
      );
      this.ngZone.runOutsideAngular(() =>
        WebXPanel.initialize(WebXPanelConfigParams)
      );
    }
  }

  /** Gets the query parameters from the URL */
  GetQueryParameters() {
    // Get the url of the window location.
    var url = new URL(window.location.href);
    // Get the search parameters from the URL.
    var urlParameters: any = new URLSearchParams(url.search);
    var queries: any = {};
    for (var [key, value] of urlParameters) {
      queries[key.toLowerCase()] = value;
    }
    return queries;
  }
}
