import { generateQuestions } from '../quizGenerator';
import { Country } from '@/types/country';

describe('generateQuestions', () => {
  const mockCountries: Country[] = [
    {
      code: 'us',
      name: 'United States',
      flagUrl: 'https://flagcdn.com/w320/us.webp',
    },
    { code: 'ca', name: 'Canada', flagUrl: 'https://flagcdn.com/w320/ca.webp' },
    { code: 'mx', name: 'Mexico', flagUrl: 'https://flagcdn.com/w320/mx.webp' },
    { code: 'br', name: 'Brazil', flagUrl: 'https://flagcdn.com/w320/br.webp' },
    {
      code: 'ar',
      name: 'Argentina',
      flagUrl: 'https://flagcdn.com/w320/ar.webp',
    },
    { code: 'fr', name: 'France', flagUrl: 'https://flagcdn.com/w320/fr.webp' },
    {
      code: 'de',
      name: 'Germany',
      flagUrl: 'https://flagcdn.com/w320/de.webp',
    },
    { code: 'it', name: 'Italy', flagUrl: 'https://flagcdn.com/w320/it.webp' },
  ];

  it('should generate the correct number of questions', () => {
    const numberOfQuestions = 5;
    const questions = generateQuestions(mockCountries, numberOfQuestions);

    expect(questions).toHaveLength(numberOfQuestions);
  });
});
