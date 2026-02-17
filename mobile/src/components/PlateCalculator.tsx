import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { View, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface PlateCalculatorProps {
  visible: boolean;
  targetWeight: number;
  onClose: () => void;
}

// Standard barbell weights
const BARBELL_WEIGHTS = [
  { name: 'Barra Olímpica', weight: 20, unit: 'kg' },
  { name: 'Barra Estándar', weight: 15, unit: 'kg' },
  { name: 'Barra EZ', weight: 10, unit: 'kg' },
  { name: 'Barra Hex', weight: 25, unit: 'kg' },
];

// Standard plate weights (kg)
const STANDARD_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5];

interface PlateCount {
  weight: number;
  count: number;
}

export const PlateCalculator: React.FC<PlateCalculatorProps> = ({
  visible,
  targetWeight,
  onClose,
}) => {
  const [selectedBarbell, setSelectedBarbell] = useState(BARBELL_WEIGHTS[0]);

  const calculatePlates = (): PlateCount[] => {
    let remainingWeight = targetWeight - selectedBarbell.weight;
    
    if (remainingWeight <= 0) {
      return [];
    }

    // Divide by 2 because plates go on both sides
    remainingWeight = remainingWeight / 2;

    const plates: PlateCount[] = [];

    for (const plateWeight of STANDARD_PLATES) {
      const count = Math.floor(remainingWeight / plateWeight);
      if (count > 0) {
        plates.push({ weight: plateWeight, count });
        remainingWeight -= count * plateWeight;
      }
    }

    return plates;
  };

  const plates = calculatePlates();
  const totalPlateWeight = plates.reduce((sum, p) => sum + p.weight * p.count, 0) * 2;
  const actualWeight = selectedBarbell.weight + totalPlateWeight;
  const difference = targetWeight - actualWeight;

  const getPlateColor = (weight: number): string => {
    // IWF standard colors
    switch (weight) {
      case 25:
        return '#ef4444'; // Red
      case 20:
        return '#3b82f6'; // Blue
      case 15:
        return '#eab308'; // Yellow
      case 10:
        return '#9D12DE'; // Green
      case 5:
        return '#f5f5f5'; // White
      case 2.5:
        return '#ef4444'; // Red
      case 1.25:
        return '#3b82f6'; // Blue
      case 0.5:
        return '#eab308'; // Yellow
      default:
        return '#9ca3af'; // Gray
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient colors={['#1a1a1a', '#000']} style={styles.gradient}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Calculadora de Discos</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Target Weight */}
              <View style={styles.targetSection}>
                <Text style={styles.label}>Peso Objetivo</Text>
                <Text style={styles.targetWeight}>{targetWeight} kg</Text>
              </View>

              {/* Barbell Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tipo de Barra</Text>
                <View style={styles.barbellOptions}>
                  {BARBELL_WEIGHTS.map((barbell) => (
                    <TouchableOpacity
                      key={barbell.name}
                      style={[
                        styles.barbellOption,
                        selectedBarbell.name === barbell.name &&
                          styles.barbellOptionSelected,
                      ]}
                      onPress={() => setSelectedBarbell(barbell)}
                    >
                      <Text
                        style={[
                          styles.barbellName,
                          selectedBarbell.name === barbell.name &&
                            styles.barbellNameSelected,
                        ]}
                      >
                        {barbell.name}
                      </Text>
                      <Text
                        style={[
                          styles.barbellWeight,
                          selectedBarbell.name === barbell.name &&
                            styles.barbellWeightSelected,
                        ]}
                      >
                        {barbell.weight} kg
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Plates Breakdown */}
              {plates.length > 0 ? (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Discos por Lado</Text>
                  <View style={styles.platesContainer}>
                    {plates.map((plate, index) => (
                      <View key={index} style={styles.plateRow}>
                        <View
                          style={[
                            styles.plateCircle,
                            { backgroundColor: getPlateColor(plate.weight) },
                          ]}
                        >
                          <Text style={styles.plateWeight}>{plate.weight}</Text>
                          <Text style={styles.plateUnit}>kg</Text>
                        </View>
                        <Text style={styles.plateCount}>× {plate.count}</Text>
                        <Text style={styles.plateTotalWeight}>
                          = {(plate.weight * plate.count).toFixed(1)} kg
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="information-circle" size={48} color="#666" />
                  <Text style={styles.emptyText}>
                    El peso objetivo es menor o igual al peso de la barra
                  </Text>
                </View>
              )}

              {/* Summary */}
              <View style={styles.summary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Barra:</Text>
                  <Text style={styles.summaryValue}>
                    {selectedBarbell.weight} kg
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discos (ambos lados):</Text>
                  <Text style={styles.summaryValue}>{totalPlateWeight} kg</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabelTotal}>Peso Total:</Text>
                  <Text style={styles.summaryValueTotal}>{actualWeight} kg</Text>
                </View>
                {difference !== 0 && (
                  <View style={styles.differenceRow}>
                    <Ionicons
                      name={difference > 0 ? 'arrow-up' : 'arrow-down'}
                      size={16}
                      color={difference > 0 ? '#ef4444' : '#9D12DE'}
                    />
                    <Text
                      style={[
                        styles.differenceText,
                        { color: difference > 0 ? '#ef4444' : '#9D12DE' },
                      ]}
                    >
                      {Math.abs(difference).toFixed(1)} kg{' '}
                      {difference > 0 ? 'menos' : 'más'} que el objetivo
                    </Text>
                  </View>
                )}
              </View>

              {/* Visual Representation */}
              {plates.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Vista de Barra</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.barbellView}
                  >
                    {/* Left plates */}
                    {plates.map((plate, index) =>
                      Array(plate.count)
                        .fill(0)
                        .map((_, i) => (
                          <View
                            key={`left-${index}-${i}`}
                            style={[
                              styles.plateDisc,
                              {
                                backgroundColor: getPlateColor(plate.weight),
                                width: 40 + plate.weight,
                                height: 60 + plate.weight * 2,
                              },
                            ]}
                          />
                        ))
                    )}

                    {/* Barbell */}
                    <View style={styles.barbell}>
                      <Text style={styles.barbellLabel}>
                        {selectedBarbell.weight}kg
                      </Text>
                    </View>

                    {/* Right plates */}
                    {plates.map((plate, index) =>
                      Array(plate.count)
                        .fill(0)
                        .map((_, i) => (
                          <View
                            key={`right-${index}-${i}`}
                            style={[
                              styles.plateDisc,
                              {
                                backgroundColor: getPlateColor(plate.weight),
                                width: 40 + plate.weight,
                                height: 60 + plate.weight * 2,
                              },
                            ]}
                          />
                        ))
                    )}
                  </ScrollView>
                </View>
              )}
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '90%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  targetSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  targetWeight: {
    fontSize: 48,
    fontWeight: '900',
    color: '#9D12DE',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  barbellOptions: {
    gap: 8,
  },
  barbellOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
  },
  barbellOptionSelected: {
    borderColor: '#9D12DE',
    backgroundColor: '#0a2f1f',
  },
  barbellName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  barbellNameSelected: {
    color: '#9D12DE',
  },
  barbellWeight: {
    fontSize: 14,
    color: '#999',
  },
  barbellWeightSelected: {
    color: '#9D12DE',
    fontWeight: '700',
  },
  platesContainer: {
    gap: 12,
  },
  plateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
  },
  plateCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  plateWeight: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  plateUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000',
  },
  plateCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  plateTotalWeight: {
    fontSize: 14,
    color: '#999',
    marginLeft: 'auto',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#999',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  summaryValueTotal: {
    fontSize: 24,
    fontWeight: '900',
    color: '#9D12DE',
  },
  differenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    justifyContent: 'center',
  },
  differenceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  barbellView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 20,
  },
  plateDisc: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    marginHorizontal: 2,
  },
  barbell: {
    width: 100,
    height: 20,
    backgroundColor: '#6b7280',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  barbellLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
});
