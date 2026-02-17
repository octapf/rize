import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';;
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface AssessmentQuestion {
  id: string;
  category: 'mobility' | 'stability' | 'strength' | 'pain' | 'history';
  question: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation?: string;
}

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Mobility
  {
    id: 'm1',
    category: 'mobility',
    question: '¿Puedes tocarte los dedos de los pies con piernas rectas?',
    riskLevel: 'medium',
    recommendation: 'Trabaja flexibilidad de isquiotibiales y espalda baja',
  },
  {
    id: 'm2',
    category: 'mobility',
    question: '¿Puedes hacer sentadilla profunda (ATG) sin levantar talones?',
    riskLevel: 'medium',
    recommendation: 'Mejora movilidad de tobillo y cadera',
  },
  {
    id: 'm3',
    category: 'mobility',
    question: '¿Puedes juntar las manos detrás de la espalda (arriba y abajo)?',
    riskLevel: 'low',
    recommendation: 'Trabaja movilidad de hombros',
  },
  
  // Stability
  {
    id: 's1',
    category: 'stability',
    question: '¿Puedes mantener equilibrio en una pierna por 30+ segundos?',
    riskLevel: 'medium',
    recommendation: 'Ejercicios unilaterales y trabajo de core',
  },
  {
    id: 's2',
    category: 'stability',
    question: '¿Puedes hacer plancha con técnica perfecta 60+ segundos?',
    riskLevel: 'low',
    recommendation: 'Fortalece core y estabilizadores',
  },
  {
    id: 's3',
    category: 'stability',
    question: '¿Tienes control total en movimientos unilaterales (pistol squat, etc)?',
    riskLevel: 'low',
    recommendation: 'Trabaja asimetrÃ­as y estabilidad',
  },
  
  // Strength
  {
    id: 'st1',
    category: 'strength',
    question: '¿Puedes hacer al menos 10 flexiones perfectas seguidas?',
    riskLevel: 'medium',
    recommendation: 'Fortalece pecho, hombros y tríceps',
  },
  {
    id: 'st2',
    category: 'strength',
    question: '¿Puedes hacer al menos 1 dominada completa?',
    riskLevel: 'medium',
    recommendation: 'Trabaja fuerza de tracción (pull)',
  },
  {
    id: 'st3',
    category: 'strength',
    question: '¿Puedes sentadilla con tu peso corporal en barra por 5+ reps?',
    riskLevel: 'high',
    recommendation: 'Progresión gradual de fuerza en piernas',
  },
  
  // Pain
  {
    id: 'p1',
    category: 'pain',
    question: '¿Sientes dolor en rodillas al subir/bajar escaleras?',
    riskLevel: 'high',
    recommendation: 'Consulta médico, evita impacto hasta resolverlo',
  },
  {
    id: 'p2',
    category: 'pain',
    question: '¿Dolor en espalda baja al levantarte o agacharte?',
    riskLevel: 'high',
    recommendation: 'Evalúa técnica de peso muerto, fortalece core',
  },
  {
    id: 'p3',
    category: 'pain',
    question: '¿Dolor en hombros al levantar brazos sobre cabeza?',
    riskLevel: 'high',
    recommendation: 'Evita press overhead, trabaja movilidad escapular',
  },
  
  // History
  {
    id: 'h1',
    category: 'history',
    question: '¿Has tenido lesiones previas en Últimos 6 meses?',
    riskLevel: 'high',
    recommendation: 'Rehabilitación completa antes de cargas pesadas',
  },
  {
    id: 'h2',
    category: 'history',
    question: '¿Haces calentamiento adecuado (10+ min) antes de entrenar?',
    riskLevel: 'medium',
    recommendation: 'Calentamiento dinámico es esencial',
  },
  {
    id: 'h3',
    category: 'history',
    question: '¿Has incrementado peso/volumen >10% en Últimas semanas?',
    riskLevel: 'high',
    recommendation: 'Progresión gradual, no más de 5-10% semanal',
  },
];

export default function InjuryPrevention() {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [showResults, setShowResults] = useState(false);

  const categories = [
    { key: 'mobility', label: 'Movilidad', icon: 'body', color: 'blue' },
    { key: 'stability', label: 'Estabilidad', icon: 'fitness', color: 'primary' },
    { key: 'strength', label: 'Fuerza', icon: 'barbell', color: 'red' },
    { key: 'pain', label: 'Dolor', icon: 'warning', color: 'amber' },
    { key: 'history', label: 'Historial', icon: 'time', color: 'purple' },
  ];

  const toggleAnswer = (questionId: string, value: boolean) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateResults = (): AssessmentResult[] => {
    const results: AssessmentResult[] = [];

    categories.forEach(cat => {
      const categoryQuestions = ASSESSMENT_QUESTIONS.filter(q => q.category === cat.key);
      const answeredQuestions = categoryQuestions.filter(q => answers[q.id] !== undefined);
      
      let score = 0;
      const recommendations: string[] = [];

      categoryQuestions.forEach(q => {
        const answer = answers[q.id];
        
        if (cat.key === 'pain' || cat.key === 'history') {
          // For pain/history, "No" (false) is good
          if (answer === false) score++;
          if (answer === true && q.recommendation) {
            recommendations.push(q.recommendation);
          }
        } else {
          // For mobility/stability/strength, "Yes" (true) is good
          if (answer === true) score++;
          if (answer === false && q.recommendation) {
            recommendations.push(q.recommendation);
          }
        }
      });

      const scorePercentage = (score / categoryQuestions.length) * 100;
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      
      if (scorePercentage < 50) riskLevel = 'high';
      else if (scorePercentage < 80) riskLevel = 'medium';

      results.push({
        category: cat.label,
        score,
        maxScore: categoryQuestions.length,
        riskLevel,
        recommendations,
      });
    });

    return results;
  };

  const submitAssessment = () => {
    const totalQuestions = ASSESSMENT_QUESTIONS.length;
    const answeredQuestions = Object.keys(answers).length;

    if (answeredQuestions < totalQuestions) {
      Alert.alert(
        'Incompleto',
        `Responde todas las preguntas (${answeredQuestions}/${totalQuestions})`,
        [{ text: 'OK' }]
      );
      return;
    }

    setShowResults(true);
  };

  const resetAssessment = () => {
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();
    const highRiskCount = results.filter(r => r.riskLevel === 'high').length;
    const overallRisk = highRiskCount >= 2 ? 'high' : highRiskCount === 1 ? 'medium' : 'low';

    return (
      <View className="flex-1 bg-zinc-950">
        <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={resetAssessment}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold flex-1 ml-3">
              Resultados
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-6">
            {/* Overall Risk */}
            <View className={`bg-gradient-to-r rounded-xl p-6 mb-6 ${
              overallRisk === 'low' ? 'from-primary to-primary/100' :
              overallRisk === 'medium' ? 'from-amber-500 to-orange-500' :
              'from-red-500 to-pink-500'
            }`}>
              <Text className="text-white opacity-90 text-sm mb-2">Riesgo General de Lesión</Text>
              <Text className="text-white text-4xl font-bold mb-3">
                {overallRisk === 'low' ? '🟢 BAJO' : overallRisk === 'medium' ? '🟡 MEDIO' : '🔴 ALTO'}
              </Text>
              <Text className="text-white opacity-90">
                {overallRisk === 'low' 
                  ? 'Buen estado general. Mantén tus hábitos actuales.'
                  : overallRisk === 'medium'
                  ? 'Algunas áreas requieren atención. Sigue las recomendaciones.'
                  : 'Varias áreas de alto riesgo. Prioriza correcciones antes de cargas pesadas.'}
              </Text>
            </View>

            {/* Category Results */}
            {results.map((result, idx) => {
              const cat = categories[idx];
              
              return (
                <View 
                  key={cat.key}
                  className={`bg-${cat.color}-500/10 rounded-xl p-5 mb-4 border border-${cat.color}-500/30`}
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1">
                      <View className={`w-12 h-12 bg-${cat.color}-500 rounded-xl items-center justify-center mr-3`}>
                        <Ionicons name={cat.icon as any} size={24} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-lg">{result.category}</Text>
                        <Text className={`text-${cat.color}-400 text-sm`}>
                          {result.score}/{result.maxScore} completado
                        </Text>
                      </View>
                    </View>
                    <View className={`rounded-full px-4 py-2 ${
                      result.riskLevel === 'low' ? 'bg-primary' :
                      result.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                    }`}>
                      <Text className="text-white font-bold text-xs">
                        {result.riskLevel === 'low' ? 'BAJO' : result.riskLevel === 'medium' ? 'MEDIO' : 'ALTO'}
                      </Text>
                    </View>
                  </View>

                  {result.recommendations.length > 0 && (
                    <View className={`bg-${cat.color}-500/20 rounded-lg p-3`}>
                      <Text className={`text-${cat.color}-400 font-bold text-sm mb-2`}>
                        Recomendaciones:
                      </Text>
                      {result.recommendations.map((rec, idx) => (
                        <Text key={idx} className={`text-${cat.color}-300 text-sm mb-1`}>
                          • {rec}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}

            {/* Action Plan */}
            <View className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Plan de Acción</Text>
              
              {highRiskCount > 0 ? (
                <>
                  <Text className="text-red-400 font-bold mb-3">⚠️ Prioridad Alta:</Text>
                  <Text className="text-zinc-400 text-sm mb-4">
                    {highRiskCount} área{highRiskCount > 1 ? 's' : ''} de alto riesgo detectada{highRiskCount > 1 ? 's' : ''}. 
                    Enfócate en corregir estas antes de aumentar intensidad.
                  </Text>
                </>
              ) : (
                <>
                  <Text className="text-primary font-bold mb-3">? Buen Estado General</Text>
                  <Text className="text-zinc-400 text-sm mb-4">
                    No se detectaron riesgos altos. Continúa con tu programa actual.
                  </Text>
                </>
              )}

              <Text className="text-white font-bold mb-2">Próximos Pasos:</Text>
              <Text className="text-zinc-400 text-sm">
                1. Implementa recomendaciones específicas{'\n'}
                2. Re-evalúa en 4 semanas{'\n'}
                3. Consulta profesional si dolor persiste{'\n'}
                4. Progresión gradual siempre
              </Text>
            </View>

            <TouchableOpacity
              onPress={resetAssessment}
              className="bg-primary rounded-xl p-4 flex-row items-center justify-center mb-6"
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Nueva Evaluación</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progress = (totalAnswered / totalQuestions) * 100;

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Prevención de Lesiones
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {/* Info */}
          <View className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">Screening de Riesgo</Text>
            <Text className="text-white opacity-90 mb-4">
              Evalúa tu riesgo de lesión y recibe recomendaciones personalizadas
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark" size={20} color="white" />
                <Text className="text-white ml-2">Previene antes que curar</Text>
              </View>
              <Text className="text-white font-bold">
                {totalAnswered}/{totalQuestions}
              </Text>
            </View>
            <View className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
              <View 
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>

          {/* Questions by Category */}
          {categories.map((cat) => {
            const categoryQuestions = ASSESSMENT_QUESTIONS.filter(q => q.category === cat.key);
            
            return (
              <View key={cat.key} className="mb-6">
                <View className="flex-row items-center mb-4">
                  <View className={`w-10 h-10 bg-${cat.color}-500 rounded-xl items-center justify-center mr-3`}>
                    <Ionicons name={cat.icon as any} size={20} color="white" />
                  </View>
                  <Text className="text-white font-bold text-lg">{cat.label}</Text>
                </View>

                {categoryQuestions.map((question) => (
                  <View 
                    key={question.id}
                    className="bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-800"
                  >
                    <Text className="text-white mb-3">{question.question}</Text>
                    
                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => toggleAnswer(question.id, true)}
                        className={`flex-1 rounded-lg py-3 ${
                          answers[question.id] === true
                            ? 'bg-primary'
                            : 'bg-zinc-800'
                        }`}
                      >
                        <Text className={`font-bold text-center ${
                          answers[question.id] === true ? 'text-white' : 'text-zinc-400'
                        }`}>
                          Sí
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={() => toggleAnswer(question.id, false)}
                        className={`flex-1 rounded-lg py-3 ${
                          answers[question.id] === false
                            ? 'bg-red-500'
                            : 'bg-zinc-800'
                        }`}
                      >
                        <Text className={`font-bold text-center ${
                          answers[question.id] === false ? 'text-white' : 'text-zinc-400'
                        }`}>
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={submitAssessment}
            className={`rounded-xl p-5 flex-row items-center justify-center mb-6 ${
              totalAnswered === totalQuestions ? 'bg-primary' : 'bg-zinc-800'
            }`}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Ver Resultados ({totalAnswered}/{totalQuestions})
            </Text>
          </TouchableOpacity>

          {/* Tips */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#9D12DE" />
              <View className="flex-1 ml-3">
                <Text className="text-primary/80 font-bold mb-2">
                  Importancia del Screening
                </Text>
                <Text className="text-primary/60 text-sm">
                  • 60% de lesiones son prevenibles{'\n'}
                  • Identifica debilidades antes que causen problemas{'\n'}
                  • Re-evalúa cada 4-6 semanas{'\n'}
                  • Dolor persistente = consulta médico{'\n'}
                  • Prevención &gt; rehabilitación
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

