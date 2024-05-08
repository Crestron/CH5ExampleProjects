import { Component, OnInit, signal } from '@angular/core';

// Declare the CrComLib library so it can be used in the component.
declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-apple-tv-remote',
  templateUrl: './apple-tv-remote.component.html',
  styleUrls: ['./apple-tv-remote.component.scss'],
  imports: [],
})
export class AppleTvRemoteComponent implements OnInit {
  pressed = signal(false);

  constructor() {}

  ngOnInit(): void {}

  RemoteKey(key: string, state: boolean) {
    // Setting pressed to true when a key is pressed to illuminate the indicator led.
    this.pressed.set(state);
    // Publish the remote key event to the CrComLib library.
    CrComLib.publishEvent('b', `AppleTV.${key}`, state);
    // Log to the console the key that was pressed or released.
    console.log(`AppleTV.${key} ${state ? 'Pressed' : 'Released'}`);
  }

  /** Press the defined remote key */
  RemoteKeyDown(key: string): void {
    this.RemoteKey(key, true);
  }

  /** Release the defined remote key */
  RemoteKeyUp(key: string): void {
    this.RemoteKey(key, false);
  }
}