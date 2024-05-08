import { Pipe, PipeTransform } from '@angular/core';

// The headings array is used to convert the bearing to a compass heading.
const headings: string[] = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

@Pipe({
  standalone: true,
  name: 'heading'
})
export class HeadingPipe implements PipeTransform {

  /** Takes a bearing in degrees and returns a compass heading */
  transform(degrees: number): unknown {
    // The bearing is converted to a compass heading by dividing the degrees by 22.5 and using the result as an index for the directions array.
    var heading = Math.round(degrees / 22.5) % 16;
    // The index is then used to return the compass heading.
    return headings[heading];
  }

}
