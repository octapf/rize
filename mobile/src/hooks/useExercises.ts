import { useQuery } from '@tanstack/react-query';
import { exercisesApi, type ExercisesQuery } from '@/services/api/exercises.api';

export const useExercises = (query?: ExercisesQuery) => {
  return useQuery({
    queryKey: ['exercises', query],
    queryFn: () => exercisesApi.getExercises(query),
  });
};

export const useExercisesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['exercises', 'category', category],
    queryFn: () => exercisesApi.getExercisesByCategory(category),
    enabled: !!category,
  });
};
