const API_URL = "https://restcountries.com/v3.1";

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
}

interface Filters {
  region?: string;
  name?: string;
}

const fetchCountries = async (filters: Filters = {}): Promise<Country[]> => {
  try {
    let url = `${API_URL}/all`;

    if (filters.region) {
      url = `${API_URL}/region/${filters.region}`;
    } else if (filters.name) {
      url = `${API_URL}/name/${filters.name}?fullText=false`;
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
