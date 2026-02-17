export const BADGES = {
  // Workout Milestones
  FIRST_WORKOUT: {
    id: 'first_workout',
    name: 'Primer Paso',
    description: 'Completa tu primer entrenamiento',
    icon: 'footsteps',
    color: '#9D12DE',
    tier: 'bronze',
  },
  WORKOUTS_10: {
    id: 'workouts_10',
    name: 'Comprometido',
    description: 'Completa 10 entrenamientos',
    icon: 'barbell',
    color: '#3B82F6',
    tier: 'silver',
  },
  WORKOUTS_50: {
    id: 'workouts_50',
    name: 'Guerrero',
    description: 'Completa 50 entrenamientos',
    icon: 'shield',
    color: '#8B5CF6',
    tier: 'gold',
  },
  WORKOUTS_100: {
    id: 'workouts_100',
    name: 'Centurión',
    description: 'Completa 100 entrenamientos',
    icon: 'trophy',
    color: '#F59E0B',
    tier: 'platinum',
  },
  WORKOUTS_250: {
    id: 'workouts_250',
    name: 'Legendario',
    description: 'Completa 250 entrenamientos',
    icon: 'star',
    color: '#EF4444',
    tier: 'diamond',
  },

  // Streak Milestones
  STREAK_7: {
    id: 'streak_7',
    name: 'Una Semana',
    description: 'Mantén una racha de 7 días',
    icon: 'flame',
    color: '#F59E0B',
    tier: 'bronze',
  },
  STREAK_30: {
    id: 'streak_30',
    name: 'Un Mes',
    description: 'Mantén una racha de 30 días',
    icon: 'flame',
    color: '#EF4444',
    tier: 'silver',
  },
  STREAK_100: {
    id: 'streak_100',
    name: 'Incombustible',
    description: 'Mantén una racha de 100 días',
    icon: 'flame',
    color: '#DC2626',
    tier: 'gold',
  },

  // Volume Milestones
  VOLUME_10K: {
    id: 'volume_10k',
    name: 'Levantador',
    description: 'Levanta 10,000 kg en total',
    icon: 'speedometer',
    color: '#8B5CF6',
    tier: 'bronze',
  },
  VOLUME_50K: {
    id: 'volume_50k',
    name: 'Titán',
    description: 'Levanta 50,000 kg en total',
    icon: 'speedometer',
    color: '#7C3AED',
    tier: 'silver',
  },
  VOLUME_100K: {
    id: 'volume_100k',
    name: 'Hércules',
    description: 'Levanta 100,000 kg en total',
    icon: 'speedometer',
    color: '#6D28D9',
    tier: 'gold',
  },

  // XP/Level Milestones
  LEVEL_5: {
    id: 'level_5',
    name: 'Aprendiz',
    description: 'Alcanza el nivel 5',
    icon: 'ribbon',
    color: '#9D12DE',
    tier: 'bronze',
  },
  LEVEL_10: {
    id: 'level_10',
    name: 'Experto',
    description: 'Alcanza el nivel 10',
    icon: 'medal',
    color: '#3B82F6',
    tier: 'silver',
  },
  LEVEL_20: {
    id: 'level_20',
    name: 'Maestro',
    description: 'Alcanza el nivel 20',
    icon: 'trophy',
    color: '#8B5CF6',
    tier: 'gold',
  },
  LEVEL_50: {
    id: 'level_50',
    name: 'Gran Maestro',
    description: 'Alcanza el nivel 50',
    icon: 'star',
    color: '#F59E0B',
    tier: 'platinum',
  },

  // Records
  FIRST_RECORD: {
    id: 'first_record',
    name: 'Récord Personal',
    description: 'Establece tu primer récord',
    icon: 'trending-up',
    color: '#9D12DE',
    tier: 'bronze',
  },
  RECORDS_10: {
    id: 'records_10',
    name: 'Rompe Récords',
    description: 'Establece 10 récords personales',
    icon: 'trending-up',
    color: '#3B82F6',
    tier: 'silver',
  },
  RECORDS_50: {
    id: 'records_50',
    name: 'Imparable',
    description: 'Establece 50 récords personales',
    icon: 'trending-up',
    color: '#8B5CF6',
    tier: 'gold',
  },

  // Social
  FIRST_FRIEND: {
    id: 'first_friend',
    name: 'Sociable',
    description: 'Agrega tu primer amigo',
    icon: 'people',
    color: '#3B82F6',
    tier: 'bronze',
  },
  FRIENDS_10: {
    id: 'friends_10',
    name: 'Popular',
    description: 'Agrega 10 amigos',
    icon: 'people',
    color: '#6366F1',
    tier: 'silver',
  },
  CHALLENGE_WIN: {
    id: 'challenge_win',
    name: 'Campeón',
    description: 'Gana tu primer reto',
    icon: 'flash',
    color: '#EF4444',
    tier: 'bronze',
  },
  CHALLENGES_10: {
    id: 'challenges_10',
    name: 'Invencible',
    description: 'Gana 10 retos',
    icon: 'flash',
    color: '#DC2626',
    tier: 'gold',
  },

  // Special
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Completa un entrenamiento antes de las 6 AM',
    icon: 'sunny',
    color: '#F59E0B',
    tier: 'bronze',
  },
  NIGHT_OWL: {
    id: 'night_owl',
    name: 'Ave Nocturna',
    description: 'Completa un entrenamiento después de las 10 PM',
    icon: 'moon',
    color: '#8B5CF6',
    tier: 'bronze',
  },
  MARATHON: {
    id: 'marathon',
    name: 'Maratonista',
    description: 'Completa un entrenamiento de más de 2 horas',
    icon: 'time',
    color: '#EF4444',
    tier: 'silver',
  },
  PERFECT_WEEK: {
    id: 'perfect_week',
    name: 'Semana Perfecta',
    description: 'Entrena todos los días de la semana',
    icon: 'calendar',
    color: '#9D12DE',
    tier: 'gold',
  },
};

export const BADGE_TIERS = {
  bronze: {
    color: '#CD7F32',
    gradient: ['#CD7F32', '#B87333'],
    name: 'Bronce',
  },
  silver: {
    color: '#C0C0C0',
    gradient: ['#C0C0C0', '#A8A8A8'],
    name: 'Plata',
  },
  gold: {
    color: '#FFD700',
    gradient: ['#FFD700', '#FFC700'],
    name: 'Oro',
  },
  platinum: {
    color: '#E5E4E2',
    gradient: ['#E5E4E2', '#D4D3D1'],
    name: 'Platino',
  },
  diamond: {
    color: '#B9F2FF',
    gradient: ['#B9F2FF', '#A0E7FF'],
    name: 'Diamante',
  },
};

export type BadgeId = keyof typeof BADGES;
export type BadgeTier = keyof typeof BADGE_TIERS;
