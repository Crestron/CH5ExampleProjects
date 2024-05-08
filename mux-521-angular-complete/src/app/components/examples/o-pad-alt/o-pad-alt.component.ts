import { Component,Input } from '@angular/core';

declare var CrComLib: CrComLib;

@Component({
  standalone:true,
  selector: 'app-o-pad-alt-example',
  templateUrl: './o-pad-alt.component.html',
  styleUrl: './o-pad-alt.component.scss'
})
export class OPadAltExampleComponent {
    // Use the @Input decorator to define the join property.
    @Input() join: string = 'MediaControl.Dpad';

    /** Pulses the up digital join */
    up(): void {
      CrComLib.pulseDigital(this.join + '.Up');
    }
    /** Pulses the down digital join */
    down(): void {
      CrComLib.pulseDigital(this.join + '.Down');
    }
    /** Pulses the up digital join */
    left(): void {
      CrComLib.pulseDigital(this.join + '.Left');
    }
    /** Pulses the up digital join */
    right(): void {
      CrComLib.pulseDigital(this.join + '.Right');
    }
    /** Pulses the up center join */
    center(): void {
      CrComLib.pulseDigital(this.join + '.Center');
    }
  }
