import { Component } from '@angular/core';

// Declare the CrComLib object to use the Crestron Com Library.
declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {

  /** The start button has been clicked  */
  OnStartButtonClicked() {
    // Write to console what has happened.
    console.log('Info -> The start button has been clicked.');
    // Pulse the digital join for the start button.
    CrComLib.pulseDigital('StartPage.Button.Press');
    /** The start button has been clicked  */
    // CrComLib.publishEvent('b','StartPage.Button.Press',true);
    // CrComLib.publishEvent('b','StartPage.Button.Press',false);
  }

}