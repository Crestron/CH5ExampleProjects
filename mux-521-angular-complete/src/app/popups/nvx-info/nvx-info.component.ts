import { Component, OnDestroy, OnInit, NgZone,signal } from '@angular/core';

declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-nvx-info',
  templateUrl: './nvx-info.component.html',
  styleUrl: './nvx-info.component.scss',
})
export class NvxInfoComponent implements OnInit, OnDestroy {
  // IP Address of the NVX device
  address = signal('0.0.0.0');
  // Subscription to the address serial join
  addressSubscription!: string;

  constructor(private ngZone: NgZone) {}

  // ngOnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to the ip address join
    this.addressSubscription = CrComLib.subscribeState(
      's',
      'NvxInfo.NvxAddressFb.Indirect',
      (address: string) => {
        console.log('NVX Address Received: ' + address);
        // Run inside Angular's zone to trigger change detection
        this.ngZone.run(() => this.address.set(address));
      }
    );
  }

  // ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    // Unsubscribe from the ip address join
    CrComLib.unsubscribeState(
      's',
      'NvxInfo.NvxAddressFb.Indirect',
      this.addressSubscription
    );
  }
}
