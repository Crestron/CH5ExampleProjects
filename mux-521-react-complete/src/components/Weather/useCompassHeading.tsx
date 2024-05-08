import React from 'react';

// The headings array is used to convert the bearing to a compass heading.
const headings: string[] = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

// Custom hook for converting degrees to compass heading
function useCompassHeading(degrees: number): string {
  const index = Math.round(degrees / 22.5) % 16;
  return headings[index];
}

// Usage example within a component
const CompassHeading: React.FC<{ degrees: number }> = ({ degrees }) => {
  const heading = useCompassHeading(degrees);
  
  return <span>{heading}</span>;
};

export default CompassHeading;
