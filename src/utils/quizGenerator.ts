import { Country, Question } from '@/types/country';
import content from '@/content/content.json';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomCountries(
  countries: Country[],
  count: number,
  exclude?: Country
): Country[] {
  const filtered = exclude
    ? countries.filter((country) => country.code !== exclude.code)
    : countries;
  return shuffleArray(filtered).slice(0, count);
}

function generateFlagQuestion(
  country: Country,
  allCountries: Country[]
): Question {
  const wrongAnswers = getRandomCountries(allCountries, 3, country);

  const options = shuffleArray([
    country.name,
    ...wrongAnswers.map((country) => country.name),
  ]);

  return {
    id: `flag-${country.code}-${Date.now()}`,
    question: content.question.flagQuestion,
    correctAnswer: country.name,
    options,
    imageUrl: country.flagUrl,
  };
}

export function generateQuestions(
  countries: Country[],
  numberOfQuestions: number = 10
): Question[] {
  const questions: Question[] = [];

  const validCountries = countries.filter((country) => country.name);

  if (validCountries.length < 4) {
    console.error('Not enough valid countries to generate quiz');
    return [];
  }

  const shuffledCountries = shuffleArray(validCountries);
  const selectedCountries = shuffledCountries.slice(0, numberOfQuestions);

  selectedCountries.forEach((country) => {
    questions.push(generateFlagQuestion(country, validCountries));
  });

  return questions;
}
