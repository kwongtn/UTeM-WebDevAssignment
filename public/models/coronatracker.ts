export interface WorldOMeter {
  countryCode: string;
  country: string;
  countryName: string;
  lat: number;
  lng: number;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  dailyConfirmed: number;
  dailyDeaths: number;
  activeCases: number;
  totalCritical: number;
  totalConfirmedPerMillionPopulation: number;
  totalDeathsPerMillionPopulation: number | null;
  FR: string | null;
  PR: string | null;
  lastUpdated: string;
}

export interface DailyNewStats {
  'MAX(ac.country_code)': string;
  lat: number;
  lng: number;
  country: string;
  daily_cases: number;
  daily_deaths: number;
  last_updated: string;
}

export interface TotalTrending {
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  lastUpdated: string;
}
