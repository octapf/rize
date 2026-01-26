import { create } from 'zustand';
import type { Exercise } from '@/services/api/exercises.api';

export interface WorkoutExercise {
  exercise: Exercise;
  sets: {
    reps: number;
    weight?: number;
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
      
      // Agregar con configuración por defecto (3 series de 10 reps)
      const withDefaultSets: WorkoutExercise[] = toAdd.map((exercise) => ({
        exercise,
        sets: [
          { reps: 10, completed: false },
          { reps: 10, completed: false },
          { reps: 10, completed: false },
        ],
      }));

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
