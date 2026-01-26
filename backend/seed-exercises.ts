import mongoose from 'mongoose';
import { Exercise } from './src/models/Exercise';
import { env } from './src/config/env';
import { logger } from './src/utils/logger';

const exercises = [
  // PUSH - Principiante
  {
    name: { es: 'Flexiones de Rodillas', en: 'Knee Push-ups' },
    category: 'push',
    difficulty: 1,
    description: {
      es: 'Flexiones con las rodillas apoyadas, ideal para principiantes',
      en: 'Push-ups with knees on the ground, ideal for beginners',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Flexiones Inclinadas', en: 'Incline Push-ups' },
    category: 'push',
    difficulty: 2,
    description: {
      es: 'Flexiones con las manos elevadas en una superficie',
      en: 'Push-ups with hands elevated on a surface',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Flexiones', en: 'Push-ups' },
    category: 'push',
    difficulty: 3,
    description: {
      es: 'Flexión de brazos estándar',
      en: 'Standard push-up',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Flexiones Diamante', en: 'Diamond Push-ups' },
    category: 'push',
    difficulty: 4,
    description: {
      es: 'Flexiones con las manos juntas formando un diamante',
      en: 'Push-ups with hands together forming a diamond',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Fondos en Paralelas', en: 'Parallel Bar Dips' },
    category: 'push',
    difficulty: 5,
    description: {
      es: 'Fondos en barras paralelas',
      en: 'Dips on parallel bars',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Flexiones Arquero', en: 'Archer Push-ups' },
    category: 'push',
    difficulty: 6,
    description: {
      es: 'Flexiones con un brazo extendido lateralmente',
      en: 'Push-ups with one arm extended to the side',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Pseudo Planche Push-ups', en: 'Pseudo Planche Push-ups' },
    category: 'push',
    difficulty: 7,
    description: {
      es: 'Flexiones con manos atrás y cuerpo inclinado adelante',
      en: 'Push-ups with hands back and body leaning forward',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Flexiones a Una Mano', en: 'One Arm Push-ups' },
    category: 'push',
    difficulty: 8.5,
    description: {
      es: 'Flexión de brazos con un solo brazo',
      en: 'Push-up with one arm',
    },
    isGlobal: true,
  },

  // PULL - Principiante a Avanzado
  {
    name: { es: 'Remo Invertido', en: 'Inverted Row' },
    category: 'pull',
    difficulty: 2,
    description: {
      es: 'Remo horizontal con el cuerpo bajo una barra',
      en: 'Horizontal rowing with body under a bar',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas Asistidas', en: 'Assisted Pull-ups' },
    category: 'pull',
    difficulty: 3,
    description: {
      es: 'Dominadas con ayuda de banda elástica o apoyo',
      en: 'Pull-ups with elastic band or support assistance',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas Negativas', en: 'Negative Pull-ups' },
    category: 'pull',
    difficulty: 3.5,
    description: {
      es: 'Fase excéntrica lenta de la dominada',
      en: 'Slow eccentric phase of pull-up',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas', en: 'Pull-ups' },
    category: 'pull',
    difficulty: 4,
    description: {
      es: 'Dominada estándar con agarre prono',
      en: 'Standard pull-up with pronated grip',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas Chin-ups', en: 'Chin-ups' },
    category: 'pull',
    difficulty: 4,
    description: {
      es: 'Dominadas con agarre supino',
      en: 'Pull-ups with supinated grip',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas Arquero', en: 'Archer Pull-ups' },
    category: 'pull',
    difficulty: 6,
    description: {
      es: 'Dominadas con un brazo más extendido',
      en: 'Pull-ups with one arm more extended',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas a Una Mano Asistidas', en: 'Assisted One Arm Pull-ups' },
    category: 'pull',
    difficulty: 7,
    description: {
      es: 'Dominadas a una mano sujetando la muñeca',
      en: 'One arm pull-ups holding the wrist',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dominadas a Una Mano', en: 'One Arm Pull-ups' },
    category: 'pull',
    difficulty: 9,
    description: {
      es: 'Dominada completa con un solo brazo',
      en: 'Full pull-up with one arm',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Muscle-up', en: 'Muscle-up' },
    category: 'pull',
    difficulty: 7,
    description: {
      es: 'Transición de dominada a fondo sobre la barra',
      en: 'Transition from pull-up to dip above the bar',
    },
    isGlobal: true,
  },

  // LEGS
  {
    name: { es: 'Sentadillas', en: 'Squats' },
    category: 'legs',
    difficulty: 1,
    description: {
      es: 'Sentadilla básica con peso corporal',
      en: 'Basic bodyweight squat',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Zancadas', en: 'Lunges' },
    category: 'legs',
    difficulty: 2,
    description: {
      es: 'Zancadas alternadas',
      en: 'Alternating lunges',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Sentadillas Búlgaras', en: 'Bulgarian Split Squats' },
    category: 'legs',
    difficulty: 3,
    description: {
      es: 'Sentadilla con pie trasero elevado',
      en: 'Squat with rear foot elevated',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Sentadillas Pistol Asistidas', en: 'Assisted Pistol Squats' },
    category: 'legs',
    difficulty: 5,
    description: {
      es: 'Sentadilla a una pierna con apoyo',
      en: 'One leg squat with support',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Sentadillas Pistol', en: 'Pistol Squats' },
    category: 'legs',
    difficulty: 7,
    description: {
      es: 'Sentadilla completa a una pierna',
      en: 'Full one leg squat',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Saltos de Cajón', en: 'Box Jumps' },
    category: 'legs',
    difficulty: 4,
    description: {
      es: 'Saltos explosivos a una plataforma',
      en: 'Explosive jumps to a platform',
    },
    isGlobal: true,
  },

  // CORE
  {
    name: { es: 'Plancha', en: 'Plank' },
    category: 'core',
    difficulty: 1,
    description: {
      es: 'Plancha frontal estática',
      en: 'Static front plank',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Plancha Lateral', en: 'Side Plank' },
    category: 'core',
    difficulty: 2,
    description: {
      es: 'Plancha lateral estática',
      en: 'Static side plank',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Crunches', en: 'Crunches' },
    category: 'core',
    difficulty: 1,
    description: {
      es: 'Abdominales básicos',
      en: 'Basic crunches',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Elevaciones de Piernas', en: 'Leg Raises' },
    category: 'core',
    difficulty: 3,
    description: {
      es: 'Elevaciones de piernas acostado',
      en: 'Lying leg raises',
    },
    isGlobal: true,
  },
  {
    name: { es: 'L-Sit', en: 'L-Sit' },
    category: 'core',
    difficulty: 5,
    description: {
      es: 'Aguante en forma de L',
      en: 'L-shape hold',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Dragon Flag', en: 'Dragon Flag' },
    category: 'core',
    difficulty: 7,
    description: {
      es: 'Bandera del dragón - ejercicio avanzado de core',
      en: 'Dragon flag - advanced core exercise',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Ab Wheel', en: 'Ab Wheel' },
    category: 'core',
    difficulty: 6,
    description: {
      es: 'Rueda abdominal',
      en: 'Ab wheel rollout',
    },
    isGlobal: true,
  },

  // SKILLS
  {
    name: { es: 'Pino Contra Pared', en: 'Wall Handstand' },
    category: 'skills',
    difficulty: 3,
    description: {
      es: 'Pino apoyado en pared',
      en: 'Handstand against wall',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Pino Libre', en: 'Freestanding Handstand' },
    category: 'skills',
    difficulty: 6,
    description: {
      es: 'Pino sin apoyo',
      en: 'Freestanding handstand',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Flexiones en Pino', en: 'Handstand Push-ups' },
    category: 'skills',
    difficulty: 7,
    description: {
      es: 'Flexiones verticales en posición de pino',
      en: 'Vertical push-ups in handstand position',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Front Lever Tuck', en: 'Front Lever Tuck' },
    category: 'skills',
    difficulty: 5,
    description: {
      es: 'Front lever con rodillas recogidas',
      en: 'Front lever with knees tucked',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Front Lever', en: 'Front Lever' },
    category: 'skills',
    difficulty: 8,
    description: {
      es: 'Bandera horizontal frontal',
      en: 'Horizontal front flag',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Back Lever', en: 'Back Lever' },
    category: 'skills',
    difficulty: 7,
    description: {
      es: 'Bandera horizontal trasera',
      en: 'Horizontal back flag',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Planche Lean', en: 'Planche Lean' },
    category: 'skills',
    difficulty: 4,
    description: {
      es: 'Inclinación hacia adelante en plancha',
      en: 'Forward lean in planche position',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Planche Tuck', en: 'Planche Tuck' },
    category: 'skills',
    difficulty: 6,
    description: {
      es: 'Plancha con rodillas recogidas',
      en: 'Planche with knees tucked',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Full Planche', en: 'Full Planche' },
    category: 'skills',
    difficulty: 9.5,
    description: {
      es: 'Plancha completa - ejercicio extremo',
      en: 'Full planche - extreme exercise',
    },
    isGlobal: true,
  },
  {
    name: { es: 'Human Flag', en: 'Human Flag' },
    category: 'skills',
    difficulty: 8.5,
    description: {
      es: 'Bandera humana lateral',
      en: 'Lateral human flag',
    },
    isGlobal: true,
  },
];

async function seedExercises() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Clear existing global exercises
    await Exercise.deleteMany({ isGlobal: true });
    logger.info('Cleared existing exercises');

    // Insert new exercises
    await Exercise.insertMany(exercises);
    logger.info(`Seeded ${exercises.length} exercises`);

    await mongoose.connection.close();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Seed failed:', error);
    process.exit(1);
  }
}

seedExercises();
