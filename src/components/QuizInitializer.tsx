'use client';

import { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Country } from '@/types/country';

interface QuizInitializerProps {
  countries: Country[];
  children: React.ReactNode;
}

export default function QuizInitializer({
  countries,
  children,
}: QuizInitializerProps) {
  const { setCountries, countries: contextCountries } = useQuiz();

  useEffect(() => {
    if (contextCountries.length === 0 && countries.length > 0) {
      setCountries(countries);
    }
  }, [countries, setCountries, contextCountries.length]);

  return <>{children}</>;
}
