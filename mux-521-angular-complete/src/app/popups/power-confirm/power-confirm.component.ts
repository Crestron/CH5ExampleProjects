import { Component, NgZone, signal } from '@angular/core';
import { FadeInOutAnimation } from '../../animations/animations';

declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-power-confirm',
  templateUrl: './power-confirm.component.html',
  styleUrl: './power-confirm.component.scss',
  animations: [FadeInOutAnimation],
})
export class PowerConfirmComponent {
  // Visibility state of the component
  visible = signal(false);
  // Subscription to the visibility state
  visibilitySubscrption!: string;
  // Handle for the timeout
  timerHandle: any;

  constructor(private ngZone: NgZone) {}
  // ngOnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to the visibility state
    this.visibilitySubscrption = CrComLib.subscribeState(
      'b',
      'MainPage.PowerOffOk.Visibility',
      (state: boolean) => {
        console.log('Power On / Off Visibility: ' + state);
        // Run inside Angular's zone to trigger change detection
        this.ngZone.run(() => this.visible.set(state));
        // Toggle the timeout based on the state
        this.ToggleTimeout(state);
      }
    );
  }

  // ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    // Unsubscribe from the visibility state
    CrComLib.unsubscribeState(
      'b',
      'MainPage.PowerOffOk.Visibility',
      this.visibilitySubscrption
    );
    // Clear the timeout
    clearTimeout(this.timerHandle);
  }

  // Method to toggle the timeout
  ToggleTimeout(state: boolean) {
    if (state) {
      // If the state is true, set a timeout to call the No method after 10 seconds
      this.timerHandle = setTimeout(() => {
        this.No();
      }, 10000);
    } else {
      // If the state is false, clear the timeout
      clearTimeout(this.timerHandle);
    }
  }

  // Method to handle the Yes action
  Yes(): void {
    // Pulse the Yes digital join.
    CrComLib.pulseDigital('PowerOffOk.PowerOffYesButton.Press');
  }

  // Method to handle the No action
  No(): void {
    // Pulse the No digital join.
    CrComLib.pulseDigital('PowerOffOk.PowerOffNoButton.Press');
  }
}
