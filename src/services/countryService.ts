import { Country } from '@/types/country';

interface GraphQLCountry {
  code: string;
  name: string;
}

interface GraphQLResponse {
  data: {
    countries: GraphQLCountry[];
  };
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const query = `
      query {
        countries {
          code
          name
        }
      }
    `;

    const response = await fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'force-cache',
      next: { revalidate: 86400 },
    });

    const result: GraphQLResponse = await response.json();
    const countries = result.data.countries;

    // Transform GraphQL data → our Country interface
    return countries.map((country) => {
      const code = country.code.toLowerCase();

      return {
        code,
        name: country.name,
        flagUrl: `https://flagcdn.com/w320/${code}.png`,
      } as Country;
    });
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
}
