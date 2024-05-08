import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { DPadExampleComponent } from '../../components/examples/d-pad/d-pad.component';
import { OPadExampleComponent } from '../../components/examples/o-pad/o-pad.component';
import { OPadAltExampleComponent } from '../../components/examples/o-pad-alt/o-pad-alt.component';
import { OPad8WayExampleComponent } from '../../components/examples/o-pad-8-way/o-pad-8-way.component';

declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-apple-tv',
  templateUrl: './apple-tv.component.html',
  styleUrl: './apple-tv.component.scss',
  imports: [
    DPadExampleComponent,
    OPadExampleComponent,
    OPadAltExampleComponent,
    OPad8WayExampleComponent
  ],
})
export class AppleTvComponent implements OnInit, OnDestroy {

  constructor(private ngZone: NgZone) {}

  // ngOnInit lifecycle hook
  ngOnInit(): void {
  }

  // ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
  }

  // Method to handle the back action
  back(): void {
    // Pulse the back join
    CrComLib.pulseDigital('MediaControl.BackButton.Press');
  }

  // Method to handle the play/pause action
  playPause(): void {
    // Pulse the play/pause join
    CrComLib.pulseDigital('MediaControl.PlayButton.Press');
  }

  // Method to handle the menu action
  menu(): void {
    // Pulse the menu join
    CrComLib.pulseDigital('MediaControl.MenuButton.Press');
  }
}
