import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  discount?: number;
  popular?: boolean;
  features: string[];
}

const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: '1',
    name: 'An·lisis con IA',
    description: 'An·lisis avanzado de fotos de comida y tÈcnica',
    icon: 'sparkles',
    category: 'IA',
  },
  {
    id: '2',
    name: 'Planes Personalizados',
    description: 'Entrenamientos y dietas adaptados a ti',
    icon: 'fitness',
    category: 'Entrenamiento',
  },
  {
    id: '3',
    name: 'Sin Anuncios',
    description: 'Experiencia premium sin interrupciones',
    icon: 'eye-off',
    category: 'Experiencia',
  },
  {
    id: '4',
    name: 'Backup Ilimitado',
    description: 'Almacenamiento ilimitado en la nube',
    icon: 'cloud',
    category: 'Datos',
  },
  {
    id: '5',
    name: 'EstadÌsticas Avanzadas',
    description: 'Gr·ficos y mÈtricas detalladas',
    icon: 'analytics',
    category: 'Analytics',
  },
  {
    id: '6',
    name: 'Videos Premium',
    description: 'Acceso a todos los tutoriales en video',
    icon: 'play-circle',
    category: 'Contenido',
  },
  {
    id: '7',
    name: 'Soporte Prioritario',
    description: 'AtenciÛn al cliente 24/7',
    icon: 'chatbubbles',
    category: 'Soporte',
  },
  {
    id: '8',
    name: 'Integraciones Avanzadas',
    description: 'Conecta con todas las apps',
    icon: 'git-network',
    category: 'Integraciones',
  },
];

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Mensual',
    price: 9.99,
    period: 'mes',
    features: ['Todas las funciones premium', 'Cancela cuando quieras'],
  },
  {
    id: 'yearly',
    name: 'Anual',
    price: 79.99,
    period: 'aÒo',
    discount: 33,
    popular: true,
    features: [
      'Todas las funciones premium',
      '2 meses gratis',
      'Cancela cuando quieras',
      'Ahorra $40/aÒo',
    ],
  },
  {
    id: 'lifetime',
    name: 'De por Vida',
    price: 199.99,
    period: '˙nico pago',
    features: [
      'Todas las funciones premium',
      'Acceso de por vida',
      'Todas las futuras actualizaciones',
      'Mejor valor',
    ],
  },
];

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);

  const handleSubscribe = () => {
    Alert.alert(
      'Confirmar SuscripciÛn',
      `øSuscribirte al plan ${selectedPlan.name} por $${selectedPlan.price}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Suscribirse',
          onPress: () => {
            Alert.alert(
              '°Bienvenido a Premium!',
              'Tu suscripciÛn est· activa. Disfruta de todas las funciones premium.'
            );
          },
        },
      ]
    );
  };

  const restorePurchases = () => {
    Alert.alert('Restaurando compras...', 'Verificando tu suscripciÛn', [
      {
        text: 'OK',
        onPress: () => {
          setTimeout(() => {
            Alert.alert(
              'Compras Restauradas',
              'No se encontraron compras previas. Si ya eres suscriptor, contacta soporte.'
            );
          }, 1500);
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Rize Premium
          </Text>
          <TouchableOpacity onPress={restorePurchases}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Premium Badge */}
        <View className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-500/30">
          <View className="flex-row items-center">
            <View className="bg-amber-500 w-12 h-12 rounded-full items-center justify-center">
              <Ionicons name="star" size={24} color="white" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-amber-500 font-bold text-lg">
                Desbloquea Todo
              </Text>
              <Text className="text-amber-300 text-sm mt-0.5">
                Maximiza tu potencial con Premium
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Plans */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Elige tu Plan
          </Text>

          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan)}
              className={`rounded-xl p-4 mb-3 border ${
                selectedPlan.id === plan.id
                  ? 'bg-amber-500/20 border-amber-500'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            >
              {plan.popular && (
                <View className="absolute -top-2 right-4 bg-amber-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-bold">M√ÅS POPULAR</Text>
                </View>
              )}

              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text
                    className={`font-bold text-lg ${
                      selectedPlan.id === plan.id ? 'text-amber-500' : 'text-white'
                    }`}
                  >
                    {plan.name}
                  </Text>
                  {plan.discount && (
                    <View className="bg-primary/20 px-2 py-0.5 rounded mt-1 self-start">
                      <Text className="text-primary text-xs font-bold">
                        Ahorra {plan.discount}%
                      </Text>
                    </View>
                  )}
                </View>
                <View className="items-end">
                  <Text
                    className={`font-bold text-2xl ${
                      selectedPlan.id === plan.id ? 'text-amber-500' : 'text-white'
                    }`}
                  >
                    ${plan.price}
                  </Text>
                  <Text className="text-zinc-400 text-sm">/{plan.period}</Text>
                </View>
              </View>

              <View className="space-y-2">
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={selectedPlan.id === plan.id ? '#FFEA00' : '#9D12DE'}
                    />
                    <Text
                      className={`ml-2 text-sm ${
                        selectedPlan.id === plan.id
                          ? 'text-amber-200'
                          : 'text-zinc-300'
                      }`}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Premium Features */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Funciones Premium
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {PREMIUM_FEATURES.map((feature) => (
              <View
                key={feature.id}
                className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
                style={{ width: '48%' }}
              >
                <View className="bg-amber-500/20 w-12 h-12 rounded-xl items-center justify-center mb-3">
                  <Ionicons name={feature.icon as any} size={24} color="#FFEA00" />
                </View>
                <Text className="text-white font-bold mb-1">{feature.name}</Text>
                <Text className="text-zinc-400 text-xs leading-4">
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials */}
        <View className="px-6 pt-6">
          <Text className="text-white font-bold text-lg mb-3">
            Lo que dicen los usuarios
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color="#FFEA00" />
              ))}
            </View>
            <Text className="text-white font-semibold mb-2">
              "Vale cada centavo"
            </Text>
            <Text className="text-zinc-300 text-sm leading-5 mb-2">
              El an·lisis con IA me ayudÛ a corregir mi tÈcnica y evitar lesiones.
              Los planes personalizados son increÌbles.
            </Text>
            <Text className="text-zinc-500 text-xs">- Carlos M.</Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <View className="flex-row items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color="#FFEA00" />
              ))}
            </View>
            <Text className="text-white font-semibold mb-2">
              "La mejor inversiÛn"
            </Text>
            <Text className="text-zinc-300 text-sm leading-5 mb-2">
              Las estadÌsticas avanzadas me permitieron optimizar mi
              entrenamiento. Resultados visibles en 3 meses.
            </Text>
            <Text className="text-zinc-500 text-xs">- Ana R.</Text>
          </View>
        </View>

        {/* FAQ */}
        <View className="px-6 pt-6 pb-6">
          <Text className="text-white font-bold text-lg mb-3">
            Preguntas Frecuentes
          </Text>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <Text className="text-white font-semibold mb-2">
              øPuedo cancelar en cualquier momento?
            </Text>
            <Text className="text-zinc-300 text-sm leading-5">
              SÌ, puedes cancelar tu suscripciÛn cuando quieras sin penalizaciÛn.
              Tendr·s acceso hasta el final del perÌodo pagado.
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-3">
            <Text className="text-white font-semibold mb-2">
              øHay garantÌa de devoluciÛn?
            </Text>
            <Text className="text-zinc-300 text-sm leading-5">
              Ofrecemos garantÌa de 7 dÌas. Si no est·s satisfecho, te devolvemos
              el 100% de tu dinero, sin preguntas.
            </Text>
          </View>

          <View className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <Text className="text-white font-semibold mb-2">
              øQuÈ mÈtodos de pago aceptan?
            </Text>
            <Text className="text-zinc-300 text-sm leading-5">
              Aceptamos tarjetas de crÈdito/dÈbito, PayPal, Apple Pay y Google Pay.
              Todos los pagos son seguros y cifrados.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View className="px-6 pb-6 bg-zinc-950 border-t border-zinc-800">
        <TouchableOpacity
          onPress={handleSubscribe}
          className="bg-amber-500 rounded-xl p-4 mt-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            Suscribirse por ${selectedPlan.price}/{selectedPlan.period}
          </Text>
        </TouchableOpacity>

        <Text className="text-zinc-500 text-xs text-center mt-3">
          Al suscribirte, aceptas nuestros TÈrminos de Servicio y PolÌtica de
          Privacidad. La suscripciÛn se renueva autom·ticamente.
        </Text>
      </View>
    </View>
  );
}

