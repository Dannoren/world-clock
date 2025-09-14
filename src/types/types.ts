
export interface City {
  id: string;              // unique identifier
  name: string;
  timeZoneOffset: number;  // numeric GMT offset (used for fallback logic)
  imageUrl?: string;       // optional background image
}

export interface ClockProps {
  cityName?: string;
  timeZoneOffset: number;
  size?: number;
  showNumbers?: boolean;
  backgroundImage?: string;
}
