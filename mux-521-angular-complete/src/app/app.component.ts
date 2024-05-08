import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Global services / helper imports */
// As an example we are importing some global helpers to assist with the CrComLib.
import './helpers/CrComLibHelpers';
import { WebXPanelService } from './services/WebXPanel';
import { CrestronRouterService } from './services/CrestronRouterService';
/** End of global services import */

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  // The constructor is used to inject the WebXPanelService and CrestronRouterService services.
  // The CrestronRouterService is a service that is used to navigate between pages in the application.
  // The WebXPanelService is a service that is used to handle the WebXPanel events.
  constructor(private webXPanel: WebXPanelService, private routerService:CrestronRouterService) {
    // Prevent the context menu from appearing when right clicking on the application.
    document.addEventListener(
      'contextmenu',
      function (e) {
        // Prevent the default context menu from appearing.
        e.preventDefault();
      },
      false
    );
  }
}
