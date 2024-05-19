const API_URL = "https://restcountries.com/v3.1";
export interface Country {
  name: {
    common: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: { [key: string]: { name: string; symbol: string } };
  languages: { [key: string]: string };
  borders: string[];
  flags: { png: string };
  cca3: string;
}
interface Filters {
  region?: string;
  name?: string;
  cca3?: string;
}

const fetchCountries = async (filters: Filters = {}): Promise<Country[]> => {
  console.log("filters", filters);

  try {
    let url = `${API_URL}/all`;

    if (filters.region) {
      url = `${API_URL}/region/${filters.region}`;
    } else if (filters.name) {
      url = `${API_URL}/name/${filters.name}?fullText=false`;
    } else if (filters.cca3) {
      url = `${API_URL}/alpha/${filters.cca3}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error getting response");
    }
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export default fetchCountries;
