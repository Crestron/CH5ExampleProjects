import { Component, OnDestroy, OnInit,NgZone,signal, computed } from '@angular/core';
// The WeatherComponent is used to display the Weather widget.
import { WeatherComponent } from '../weather/weather.component';

declare var CrComLib: CrComLib;

@Component({
  standalone: true,
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss',
  imports: [WeatherComponent],
})
export class TitleBarComponent implements OnInit, OnDestroy{

  constructor(private ngZone:NgZone) {}

  titleSubscription!: string;

  title = signal('');

  ngOnInit(): void {

    // Subscribe to the title join to listen for changes.
    this.titleSubscription = CrComLib.subscribeState(
      's',
      'HeaderBar.RoomNameLabel.Indirect',
      (title: string) => {
        console.log('Info -> Received the room name: ' + title);
        this.ngZone.run(() => this.title.set(title));
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the title join when the component is destroyed.
   CrComLib.unsubscribeState('s', 'HeaderBar.RoomNameLabel.Indirect', this.titleSubscription);
  }

  powerClicked(): void {
    console.log('Info -> The power button has been pressed');
    CrComLib.pulseDigital('HeaderBar.PowerButton.Press');
  }
}