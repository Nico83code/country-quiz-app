import { fetchCountries } from '@/services/countryService';

export default async function Home() {
  const countries = await fetchCountries();
  console.log('Fetched countries:', countries);
  console.log('Total countries:', countries.length);

  return (
    <div>
      <h1>Country Quiz App</h1>
      <p>Coming soon...</p>
      <p>Loaded {countries.length} countries</p>
    </div>
  );
}
