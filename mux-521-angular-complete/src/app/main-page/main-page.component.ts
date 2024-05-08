import { Component, OnDestroy, OnInit, signal, NgZone } from '@angular/core';

// The AirMediaComponent is used to display the AirMedia popup.
import { AirmediaComponent } from '../popups/airmedia/airmedia.component';
// The AppleTvComponent is used to display the Apple TV popup.
import { AppleTvComponent } from '../popups/apple-tv/apple-tv.component';
// The NvxInfoComponent is used to display the NvxInfo popup.
import { NvxInfoComponent } from '../popups/nvx-info/nvx-info.component';
// The PowerConfirmComponent is used to display the PowerConfirm popup.
import { PowerConfirmComponent } from '../popups/power-confirm/power-confirm.component';
// The SourceListComponent is used to display the SourceList widget.
import { SourceListComponent } from '../components/source-list/source-list.component';
// The TitleBarComponent is used to display the TitleBar widget.
import { TitleBarComponent } from '../components/title-bar/title-bar.component';
// The VolumeComponent is used to display the Volume widget.
import { VolumeComponent } from '../components/volume/volume.component';

declare var CrComLib: CrComLib;

enum Source {
  None = -1,
  AppleTV,
  AirMedia,
  GlobalSource2,
  GlobalSource3,
  GlobalSource4,
  GlobalSource5,
}

@Component({
  standalone: true,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  imports: [
    AirmediaComponent,
    AppleTvComponent,
    NvxInfoComponent,
    PowerConfirmComponent,
    SourceListComponent,
    TitleBarComponent,
    VolumeComponent,
  ],
})
export class MainPageComponent implements OnInit, OnDestroy {
  // Declare the Source enum.
  Source = Source;

  // The number of sources we are displaying.
  readonly Sources = 6 ;

  source = signal(Source.None);

  // Declare the sourceSubscription array.
  sourceSubscription: string[] = new Array(6);

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    for (let i = 0; i < this.Sources; i++) {
      this.sourceSubscription[i] = CrComLib.subscribeState(
        'b',
        // Our list is 1 based, so we add 1 to the index.
        `MainPage.SourceList.Button${i + 1}ItemSelected`,
        (state: boolean) => {
          // If the state is false, return as we are going to convert positive states to the Source enum.
          if(!state) return;
          this.ngZone.run(() => this.source.set(i));
          console.log('Info -> main-page -> The source is now: ' + Source[this.source()]);
        }
      );
    }
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.Sources; i++) {
      CrComLib.unsubscribeState(
        'b',
        // Our list is 1 based, so we add 1 to the index.
        `MainPage.SourceList.Button${i + 1}Selected`,
        this.sourceSubscription[i]
      );
    }
  }
}
