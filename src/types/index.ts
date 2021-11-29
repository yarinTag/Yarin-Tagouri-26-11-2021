export interface DailyForecastsProps {
  icon: string;
  epochData: number;
  description: string;
  minTemp: {
    celsius: number;
    fahrenheit: number;
  };
  maxTemp: {
    celsius: number;
    fahrenheit: number;
  };
}

export interface CurrentWeatherProps {
  icon: string;
  epochData: number;
  description: string;
  temp: {
    celsius: number;
    fahrenheit: number;
  };
}

export interface AutoWeatherProps {
  version: number;
  id: string;
  type: string;
  rank: number;
  localizedName: string;
  country: {
    id: string;
    localizedName: string;
  };
  administrativeArea: {
    id: string;
    localizedName: string;
  };
}

export interface FavoriteWeatherProps {
  description: string;
  icon: string;
  id: string;
  location: string;
  temp: { celsius: number; fahrenheit: number };
}
