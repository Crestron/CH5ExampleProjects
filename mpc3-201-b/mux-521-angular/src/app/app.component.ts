import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  NgZone,
} from '@angular/core';
import { FadeInOutAnimation } from './animations/animations';
import { AppleTvRemoteComponent } from './apple-tv-remote/apple-tv-remote.component';

/** Global services / helper imports */
// As an example we are importing some global helpers to assist with the CrComLib.
import './helpers/CrComLibHelpers';
import { WebXPanelService } from './helpers/WebXPanel';

/** End of global services import */

declare var CrComLib: CrComLib;

enum Source {
  None = 0,
  Pc = 1,
  Laptop,
  AppleTv,
  Bluray,
  Hdmi,
  InputPlate,
}

enum Power {
  Off,
  On,
  Warming,
  Cooling,
}

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [FadeInOutAnimation],
  imports: [AppleTvRemoteComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MPC-3-201';

  level = signal(0);
  gaugeWidth = computed(() => `${this.level() / 655.35}%`);

  levelSubscription!: string;

  mute = signal(false);
  muteSubscription!: string;

  Source = Source;
  source = signal(Source.None);
  sourceSubscription!: string;

  Power = Power;
  power = signal(Power.Off);
  busy = computed(() => this.power() > Power.On);
  powerSubscription!: string;

  constructor(private ngZone: NgZone, private webXPanel: WebXPanelService) {
    // Stops users right clicking with their mouse.
    document.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false
    );
  }

  ngOnInit(): void {
    this.levelSubscription = CrComLib.subscribeState(
      'n',
      'MPC3201B.Bargraph',
      (level: number) => {
        this.ngZone.run(() => this.level.set(level));
      }
    );

    this.sourceSubscription = CrComLib.subscribeState(
      'n',
      'MPC3201B.SourceFb',
      (source: number) => this.ngZone.run(() => this.source.set(source))
    );

    this.powerSubscription = CrComLib.subscribeState(
      'n',
      'MPC3201B.PowerState',
      (power: number) => this.ngZone.run(() => this.power.set(power))
    );

    this.muteSubscription = CrComLib.subscribeState(
      'b',
      'MPC3201B.MuteFb',
      (mute: boolean) => this.ngZone.run(() => this.mute.set(mute))
    );
  }

  ngOnDestroy(): void {
    CrComLib.unsubscribeState('n', 'MPC3201B.Bargraph', this.levelSubscription);

    CrComLib.unsubscribeState(
      'n',
      'MPC3201B.SourceFb',
      this.sourceSubscription
    );
    CrComLib.unsubscribeState(
      'n',
      'MPC3201B.PowerState',
      this.powerSubscription
    );
    CrComLib.unsubscribeState('n', 'MPC3201B.MuteFb', this.muteSubscription);
  }

  SelectSource(source: Source): void {
    CrComLib.publishEvent('n', 'MPC3201B.Source', source);
  }

  VolumeUp(state: boolean): void {
    CrComLib.publishEvent('b', 'MPC3201B.VolumeUp', state);
  }

  VolumeDown(state: boolean): void {
    CrComLib.publishEvent('b', 'MPC3201B.VolumeDown', state);
  }

  MuteToggle() {
    CrComLib.pulseDigital('MPC3201B.Mute');
  }

  PowerToggle() {
    CrComLib.pulseDigital('MPC3201B.Power');
  }
}
