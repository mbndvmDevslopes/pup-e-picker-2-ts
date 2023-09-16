import { useContext } from 'react';
import { DogContext } from './dog-context';

export const useDogContext = () => {
  const context = useContext(DogContext);
  return context;
};
