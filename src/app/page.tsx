import { fetchCountries } from '@/services/countryService';
import HomeClient from '@/components/HomeClient';
import QuizInitializer from '@/components/QuizInitializer';

export default async function Home() {
  const countries = await fetchCountries();

  return (
    <QuizInitializer countries={countries}>
      <HomeClient />
    </QuizInitializer>
  );
}

export const metadata = {
  title: 'Flag Quiz - Test Your Geography Knowledge',
  description:
    'Challenge yourself with our interactive flag quiz! Test your knowledge of country flags.',
};
