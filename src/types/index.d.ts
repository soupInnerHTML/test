interface IAirport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  region: string;
  timezone: string;
  latitude: string;
  longitude: string;
  elevation_ft: string;
  country: string;
  filtered?: boolean;
}
