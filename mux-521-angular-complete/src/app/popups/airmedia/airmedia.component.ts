import { Component, NgZone, OnDestroy, OnInit,signal } from '@angular/core';

declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-airmedia',
  templateUrl: './airmedia.component.html',
  styleUrl: './airmedia.component.scss',
})
export class AirmediaComponent implements OnInit, OnDestroy {
 // The IP address / hostname of the airmedia device
  address =signal('0.0.0.0');
  // Subscription to the address serial join
  addressSubscription!: string;
  // The current pin of the airmedia device
  pin =signal('1988');
  // Subscription to the pin serial join
  pinSubscription!: string;

  constructor(private ngZone: NgZone) {}

  // ngOnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to the address serial join
    this.addressSubscription = CrComLib.subscribeState(
      's',
      'AirMediaInfo.AirmediaAddressFb.Indirect',
      (address: string) => {
        if (address.length == 0) return;
        console.log('Title Bar - Title Received: ' + address);
        this.ngZone.run(() => this.address.set(address));
      }
    );

    // Subscribe to the pin serial join
    this.pinSubscription = CrComLib.subscribeState(
      's',
      'AirMediaInfo.AirmediaPinFb.Indirect',
      (pin: string) => {
        if (pin.length == 0) return;
        console.log('airmedia pin received: ' + pin);
        this.ngZone.run(() => this.pin.set(pin));
      }
    );
  }

  // ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    // Unsubscribe from the address state
    CrComLib.unsubscribeState(
      's',
      'AirMediaInfo.AirmediaAddressFb.Indirect',
      this.addressSubscription
    );

    // Unsubscribe from the pin state
    CrComLib.unsubscribeState(
      's',
      'AirMediaInfo.AirmediaPinFb.Indirect',
      this.pinSubscription
    );
  }
}
