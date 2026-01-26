import { create } from 'zustand';
import type { Exercise } from '@/services/api/exercises.api';

export interface WorkoutExercise {
  exercise: Exercise;
  sets: {
    reps?: number;
    weight?: number;
    duration?: number;
    distance?: number;
    completed: boolean;
  }[];
}

interface WorkoutDraftStore {
  exercises: WorkoutExercise[];
  addExercises: (exercises: Exercise[]) => void;
  configureSets: (exerciseId: string, sets: WorkoutExercise['sets']) => void;
  removeExercise: (exerciseId: string) => void;
  clear: () => void;
}

export const useWorkoutDraft = create<WorkoutDraftStore>((set) => ({
  exercises: [],
  
  addExercises: (newExercises) =>
    set((state) => {
      // Filtrar ejercicios que ya están agregados
      const existingIds = state.exercises.map((e) => e.exercise._id);
      const toAdd = newExercises.filter((e) => !existingIds.includes(e._id));
      
      // Agregar con configuración por defecto según el tipo
      const withDefaultSets: WorkoutExercise[] = toAdd.map((exercise) => {
        let defaultSets: WorkoutExercise['sets'];
        
        if (exercise.type === 'time') {
          // Default: 3 sets of 30 seconds/minutes
          const defaultDuration = exercise.unit === 'minutes' ? 1 : 30;
          defaultSets = Array(3).fill(null).map(() => ({
            duration: defaultDuration,
            completed: false,
          }));
        } else if (exercise.type === 'distance') {
          // Default: 3 sets of distance based on unit
          const defaultDistance = 
            exercise.unit === 'kilometers' ? 1 :
            exercise.unit === 'miles' ? 1 :
            100; // meters
          defaultSets = Array(3).fill(null).map(() => ({
            distance: defaultDistance,
            completed: false,
          }));
        } else {
          // Default: 3 sets of 10 reps (reps type)
          defaultSets = Array(3).fill(null).map(() => ({
            reps: 10,
            completed: false,
          }));
        }
        
        return {
          exercise,
          sets: defaultSets,
        };
      });

      return {
        exercises: [...state.exercises, ...withDefaultSets],
      };
    }),

  configureSets: (exerciseId, sets) =>
    set((state) => ({
      exercises: state.exercises.map((e) =>
        e.exercise._id === exerciseId ? { ...e, sets } : e
      ),
    })),

  removeExercise: (exerciseId) =>
    set((state) => ({
      exercises: state.exercises.filter((e) => e.exercise._id !== exerciseId),
    })),

  clear: () => set({ exercises: [] }),
}));
