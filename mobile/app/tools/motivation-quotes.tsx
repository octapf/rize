import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: 'strength' | 'discipline' | 'motivation' | 'persistence' | 'mindset';
}

const QUOTES: Quote[] = [
  // Strength
  { id: '1', text: 'Strength does not come from physical capacity. It comes from an indomitable will.', author: 'Mahatma Gandhi', category: 'strength' },
  { id: '2', text: 'The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.', author: 'Arnold Schwarzenegger', category: 'strength' },
  { id: '3', text: 'The iron never lies to you. You can walk outside and listen to all kinds of talk, get told that you\'re a god or a total bastard. The iron will always kick you the real deal.', author: 'Henry Rollins', category: 'strength' },
  
  // Discipline
  { id: '4', text: 'Discipline is doing what needs to be done, even when you don\'t want to do it.', author: 'Unknown', category: 'discipline' },
  { id: '5', text: 'We are what we repeatedly do. Excellence, then, is not an act but a habit.', author: 'Aristotle', category: 'discipline' },
  { id: '6', text: 'Motivation is what gets you started. Habit is what keeps you going.', author: 'Jim Ryun', category: 'discipline' },
  
  // Motivation
  { id: '7', text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown', category: 'motivation' },
  { id: '8', text: 'Your body can stand almost anything. It\'s your mind that you have to convince.', author: 'Unknown', category: 'motivation' },
  { id: '9', text: 'The pain you feel today will be the strength you feel tomorrow.', author: 'Unknown', category: 'motivation' },
  
  // Persistence
  { id: '10', text: 'Success isn\'t always about greatness. It\'s about consistency. Consistent hard work leads to success.', author: 'Dwayne Johnson', category: 'persistence' },
  { id: '11', text: 'It\'s not about perfect. It\'s about effort. And when you bring that effort every single day, that\'s where transformation happens.', author: 'Jillian Michaels', category: 'persistence' },
  { id: '12', text: 'The hardest lift of all is lifting your butt off the couch.', author: 'Unknown', category: 'persistence' },
  
  // Mindset
  { id: '13', text: 'The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it.', author: 'David Goggins', category: 'mindset' },
  { id: '14', text: 'Do not pray for an easy life, pray for the strength to endure a difficult one.', author: 'Bruce Lee', category: 'mindset' },
  { id: '15', text: 'Pain is temporary. Quitting lasts forever.', author: 'Lance Armstrong', category: 'mindset' },
  
  // Additional quotes
  { id: '16', text: 'The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.', author: 'Arnold Schwarzenegger', category: 'strength' },
  { id: '17', text: 'If it doesn\'t challenge you, it won\'t change you.', author: 'Fred DeVito', category: 'motivation' },
  { id: '18', text: 'The only person you are destined to become is the person you decide to be.', author: 'Ralph Waldo Emerson', category: 'mindset' },
  { id: '19', text: 'Take care of your body. It\'s the only place you have to live.', author: 'Jim Rohn', category: 'discipline' },
  { id: '20', text: 'Fall in love with the process and the results will come.', author: 'Eric Thomas', category: 'persistence' },
];

const AFFIRMATIONS = [
  'Soy más fuerte cada día',
  'Mi cuerpo es capaz de cosas increíbles',
  'Merezco estar en mi mejor forma',
  'La consistencia es mi superpoder',
  'No me rindo, me adapto',
  'Mis límites solo existen en mi mente',
  'Cada rep me acerca a mis metas',
  'Confío en el proceso',
  'Soy disciplinado y enfocado',
  'Mi progreso es imparable',
];

interface SavedQuote {
  quote: Quote;
  savedDate: Date;
}

export default function MotivationQuotes() {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [showAffirmations, setShowAffirmations] = useState(false);

  useEffect(() => {
    // Get daily quote (would be based on date in production)
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setDailyQuote(randomQuote);
  }, []);

  const categories = [
    { key: 'all', label: 'Todos', icon: 'apps', color: 'blue' },
    { key: 'strength', label: 'Fuerza', icon: 'barbell', color: 'red' },
    { key: 'discipline', label: 'Disciplina', icon: 'shield', color: 'purple' },
    { key: 'motivation', label: 'Motivación', icon: 'flash', color: 'amber' },
    { key: 'persistence', label: 'Persistencia', icon: 'trending-up', color: 'primary' },
    { key: 'mindset', label: 'Mentalidad', icon: 'bulb', color: 'cyan' },
  ];

  const filteredQuotes = selectedCategory === 'all'
    ? QUOTES
    : QUOTES.filter(q => q.category === selectedCategory);

  const saveQuote = (quote: Quote) => {
    const alreadySaved = savedQuotes.find(sq => sq.quote.id === quote.id);
    
    if (alreadySaved) {
      setSavedQuotes(savedQuotes.filter(sq => sq.quote.id !== quote.id));
      Alert.alert('Eliminado', 'Quote eliminado de favoritos');
    } else {
      setSavedQuotes([{ quote, savedDate: new Date() }, ...savedQuotes]);
      Alert.alert('Guardado ?', 'Quote agregado a favoritos');
    }
  };

  const shareQuote = (quote: Quote) => {
    Alert.alert(
      'Compartir Quote',
      `"${quote.text}"\n\n- ${quote.author}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Compartir', onPress: () => console.log('Sharing quote') }
      ]
    );
  };

  const isQuoteSaved = (quoteId: string) => {
    return savedQuotes.some(sq => sq.quote.id === quoteId);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat?.color || 'blue';
  };

  const getRandomAffirmation = () => {
    return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  };

  if (showAffirmations) {
    return (
      <View className="flex-1 bg-zinc-950">
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setShowAffirmations(false)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Afirmaciones
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            <View className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-6">
              <Text className="text-white text-2xl font-bold mb-2">Afirmaciones Diarias</Text>
              <Text className="text-white opacity-90">
                Repite estas afirmaciones cada mañana para programar tu mente
              </Text>
            </View>

            {AFFIRMATIONS.map((affirmation, idx) => (
              <View key={idx} className="bg-zinc-900 rounded-xl p-5 mb-3 border border-zinc-800">
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center mr-3 mt-1">
                    <Text className="text-white font-bold">{idx + 1}</Text>
                  </View>
                  <Text className="text-white text-lg flex-1 leading-7">
                    {affirmation}
                  </Text>
                </View>
              </View>
            ))}

            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#9D12DE" />
                <View className="flex-1 ml-3">
                  <Text className="text-primary/80 font-bold mb-2">
                    Cómo Usar Afirmaciones
                  </Text>
                  <Text className="text-primary/60 text-sm">
                    • Repite en voz alta cada mañana{'\n'}
                    • Siente cada palabra, cree en ella{'\n'}
                    • Repite antes de entrenar{'\n'}
                    • Escríbelas en un diario{'\n'}
                    • Programa tu subconsciente para el éxito
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Motivación
          </Text>
          <TouchableOpacity onPress={() => setShowAffirmations(true)}>
            <View className="bg-purple-500 rounded-full p-2">
              <Ionicons name="heart" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Daily Quote */}
          {dailyQuote && (
            <View className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons name="sunny" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Quote del Día</Text>
              </View>
              <Text className="text-white text-xl font-bold mb-3 leading-7">
                "{dailyQuote.text}"
              </Text>
              <Text className="text-white opacity-90 text-right">
                - {dailyQuote.author}
              </Text>
              <View className="flex-row gap-2 mt-4">
                <TouchableOpacity
                  onPress={() => saveQuote(dailyQuote)}
                  className="flex-1 bg-white/20 rounded-lg py-2 flex-row items-center justify-center"
                >
                  <Ionicons name={isQuoteSaved(dailyQuote.id) ? 'heart' : 'heart-outline'} size={18} color="white" />
                  <Text className="text-white font-bold ml-2 text-sm">Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => shareQuote(dailyQuote)}
                  className="flex-1 bg-white/20 rounded-lg py-2 flex-row items-center justify-center"
                >
                  <Ionicons name="share-social" size={18} color="white" />
                  <Text className="text-white font-bold ml-2 text-sm">Compartir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Quick Affirmation */}
          <TouchableOpacity
            onPress={() => Alert.alert('Afirmación', getRandomAffirmation())}
            className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="sparkles" size={20} color="#A855F7" />
                <Text className="text-purple-400 font-bold ml-2">Afirmación Random</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#A855F7" />
            </View>
          </TouchableOpacity>

          {/* Stats */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Total Quotes</Text>
              <Text className="text-white font-bold text-2xl">{QUOTES.length}</Text>
            </View>
            <View className="flex-1 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <Text className="text-zinc-400 text-xs mb-1">Guardados</Text>
              <Text className="text-amber-400 font-bold text-2xl">{savedQuotes.length}</Text>
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  className={`rounded-xl px-4 py-2 flex-row items-center ${
                    selectedCategory === cat.key
                      ? `bg-${cat.color}-500`
                      : 'bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={selectedCategory === cat.key ? 'white' : '#71717A'}
                  />
                  <Text className={`ml-2 font-bold ${selectedCategory === cat.key ? 'text-white' : 'text-zinc-400'}`}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Quotes List */}
          {filteredQuotes.map((quote) => {
            const color = getCategoryColor(quote.category);
            const saved = isQuoteSaved(quote.id);

            return (
              <View 
                key={quote.id}
                className={`bg-${color}-500/10 rounded-xl p-5 mb-4 border border-${color}-500/30`}
              >
                <Text className="text-white text-lg font-bold mb-3 leading-7">
                  "{quote.text}"
                </Text>
                <Text className="text-zinc-400 text-right mb-4">
                  - {quote.author}
                </Text>
                
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => saveQuote(quote)}
                    className={`flex-1 rounded-lg py-2 flex-row items-center justify-center ${
                      saved ? `bg-${color}-500` : 'bg-zinc-800'
                    }`}
                  >
                    <Ionicons name={saved ? 'heart' : 'heart-outline'} size={18} color="white" />
                    <Text className="text-white font-bold ml-2 text-sm">
                      {saved ? 'Guardado' : 'Guardar'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => shareQuote(quote)}
                    className="bg-zinc-800 rounded-lg px-4 py-2 items-center justify-center"
                  >
                    <Ionicons name="share-social" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6 mt-2">
            <View className="flex-row items-start">
              <Ionicons name="bulb" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Usa la Motivación Correctamente
                </Text>
                <Text className="text-primary/60 text-sm">
                  • Motivación te inicia, disciplina te mantiene{'\n'}
                  • Lee un quote antes de entrenar{'\n'}
                  • Guarda favoritos para días difíciles{'\n'}
                  • Comparte con amigos para accountability{'\n'}
                  • Afirmaciones reprograman tu mente
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

