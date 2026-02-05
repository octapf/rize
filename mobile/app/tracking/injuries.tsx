import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface InjuryLog {
  id: string;
  type: 'injury' | 'pain' | 'mobility';
  bodyPart: string;
  severity: 'low' | 'medium' | 'high';
  date: Date;
  description: string;
  treatment: string[];
  status: 'active' | 'recovering' | 'resolved';
  resolvedDate?: Date;
  affectedExercises: string[];
}

const BODY_PARTS = [
  { id: 'shoulder', label: 'Hombro', icon: 'ðŸ¦¾' },
  { id: 'elbow', label: 'Codo', icon: 'ðŸ’ª' },
  { id: 'wrist', label: 'Muñeca', icon: 'ðŸ¤š' },
  { id: 'back', label: 'Espalda', icon: 'ðŸ‹ï¸' },
  { id: 'hip', label: 'Cadera', icon: 'ðŸ¦´' },
  { id: 'knee', label: 'Rodilla', icon: '🦵' },
  { id: 'ankle', label: 'Tobillo', icon: 'ðŸ¦¶' },
  { id: 'other', label: 'Otro', icon: 'ðŸ’Š' },
];

const TREATMENTS = [
  'Reposo',
  'Hielo',
  'Compresión',
  'Elevación',
  'Fisioterapia',
  'Estiramientos',
  'Foam Rolling',
  'Medicación',
  'Reducir carga',
  'Modificar ejercicios',
];

const MOCK_LOGS: InjuryLog[] = [
  {
    id: '1',
    type: 'pain',
    bodyPart: 'shoulder',
    severity: 'medium',
    date: new Date(2026, 0, 25),
    description: 'Dolor en hombro derecho durante press militar',
    treatment: ['Reducir carga', 'Foam Rolling', 'Estiramientos'],
    status: 'recovering',
    affectedExercises: ['Press Militar', 'Press Banca'],
  },
  {
    id: '2',
    type: 'mobility',
    bodyPart: 'hip',
    severity: 'low',
    date: new Date(2026, 0, 20),
    description: 'Falta de movilidad en cadera, dificulta sentadilla profunda',
    treatment: ['Estiramientos', 'Foam Rolling', 'Fisioterapia'],
    status: 'active',
    affectedExercises: ['Sentadilla'],
  },
  {
    id: '3',
    type: 'injury',
    bodyPart: 'knee',
    severity: 'medium',
    date: new Date(2026, 0, 10),
    description: 'Molestia en rodilla izquierda post sentadilla pesada',
    treatment: ['Reposo', 'Hielo', 'Reducir carga'],
    status: 'resolved',
    resolvedDate: new Date(2026, 0, 20),
    affectedExercises: ['Sentadilla', 'Zancadas'],
  },
];

export default function InjuryLog() {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [filter, setFilter] = useState<'all' | 'active' | 'recovering' | 'resolved'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLog, setNewLog] = useState({
    type: 'pain',
    bodyPart: 'shoulder',
    severity: 'low',
    description: '',
    treatment: [] as string[],
    affectedExercises: '',
  });

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter((log) => log.status === filter);

  const getBodyPartInfo = (bodyPart: string) => {
    return BODY_PARTS.find((bp) => bp.id === bodyPart) || BODY_PARTS[0];
  };

  const getSeverityColor = (severity: string): string => {
    const colors: Record<string, string> = {
      low: 'emerald',
      medium: 'amber',
      high: 'red',
    };
    return colors[severity] || 'zinc';
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: 'red',
      recovering: 'amber',
      resolved: 'emerald',
    };
    return colors[status] || 'zinc';
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      active: 'Activo',
      recovering: 'Recuperando',
      resolved: 'Resuelto',
    };
    return labels[status] || 'N/A';
  };

  const toggleTreatment = (treatment: string) => {
    if (newLog.treatment.includes(treatment)) {
      setNewLog({ ...newLog, treatment: newLog.treatment.filter((t) => t !== treatment) });
    } else {
      setNewLog({ ...newLog, treatment: [...newLog.treatment, treatment] });
    }
  };

  const addLog = () => {
    if (!newLog.description) {
      Alert.alert('Error', 'Ingresa una descripción');
      return;
    }

    const log: InjuryLog = {
      id: Date.now().toString(),
      type: newLog.type as any,
      bodyPart: newLog.bodyPart,
      severity: newLog.severity as any,
      date: new Date(),
      description: newLog.description,
      treatment: newLog.treatment,
      status: 'active',
      affectedExercises: newLog.affectedExercises.split(',').map((ex) => ex.trim()).filter(Boolean),
    };

    setLogs([log, ...logs]);
    setNewLog({
      type: 'pain',
      bodyPart: 'shoulder',
      severity: 'low',
      description: '',
      treatment: [],
      affectedExercises: '',
    });
    setShowAddForm(false);
    Alert.alert('Registro Guardado', 'Lesión/molestia registrada');
  };

  const updateStatus = (id: string, newStatus: 'active' | 'recovering' | 'resolved') => {
    setLogs(logs.map((log) =>
      log.id === id
        ? { ...log, status: newStatus, resolvedDate: newStatus === 'resolved' ? new Date() : undefined }
        : log
    ));
  };

  const deleteLog = (id: string) => {
    Alert.alert(
      'Eliminar Registro',
      '¿Estás seguro?',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setLogs(logs.filter((l) => l.id !== id)) },
      ]
    );
  };

  const getActiveIssues = () => {
    return logs.filter((l) => l.status === 'active' || l.status === 'recovering').length;
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 border-b border-zinc-800">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold flex-1 ml-3">
            Injury Log
          </Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Ionicons name={showAddForm ? 'close' : 'add-circle'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Status Filters */}
        <View className="flex-row gap-2">
          {['all', 'active', 'recovering', 'resolved'].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg ${
                filter === status ? 'bg-primary' : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              <Text className={`font-semibold text-sm ${filter === status ? 'text-white' : 'text-zinc-400'}`}>
                {status === 'all' ? 'Todos' : getStatusLabel(status)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          {showAddForm ? (
            <View className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <Text className="text-white font-bold text-lg mb-4">Nuevo Registro</Text>

              {/* Type Selection */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Tipo</Text>
                <View className="flex-row gap-2">
                  {['pain', 'injury', 'mobility'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setNewLog({ ...newLog, type })}
                      className={`flex-1 py-2 rounded-lg ${
                        newLog.type === type ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-center font-bold ${newLog.type === type ? 'text-white' : 'text-zinc-400'}`}>
                        {type === 'pain' ? 'Dolor' : type === 'injury' ? 'Lesión' : 'Movilidad'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Body Part */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Parte del Cuerpo</Text>
                <View className="flex-row flex-wrap gap-2">
                  {BODY_PARTS.map((bp) => (
                    <TouchableOpacity
                      key={bp.id}
                      onPress={() => setNewLog({ ...newLog, bodyPart: bp.id })}
                      className={`px-3 py-2 rounded-lg ${
                        newLog.bodyPart === bp.id ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={newLog.bodyPart === bp.id ? 'text-white font-bold' : 'text-zinc-400'}>
                        {bp.icon} {bp.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Severity */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Severidad</Text>
                <View className="flex-row gap-2">
                  {['low', 'medium', 'high'].map((sev) => (
                    <TouchableOpacity
                      key={sev}
                      onPress={() => setNewLog({ ...newLog, severity: sev })}
                      className={`flex-1 py-2 rounded-lg ${
                        newLog.severity === sev ? `bg-${getSeverityColor(sev)}-500` : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={`text-center font-bold ${newLog.severity === sev ? 'text-white' : 'text-zinc-400'}`}>
                        {sev === 'low' ? 'Leve' : sev === 'medium' ? 'Media' : 'Alta'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Description */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Descripción</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Describe el problema..."
                  placeholderTextColor="#71717A"
                  multiline
                  numberOfLines={3}
                  value={newLog.description}
                  onChangeText={(text) => setNewLog({ ...newLog, description: text })}
                />
              </View>

              {/* Treatment */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Tratamiento</Text>
                <View className="flex-row flex-wrap gap-2">
                  {TREATMENTS.map((treatment) => (
                    <TouchableOpacity
                      key={treatment}
                      onPress={() => toggleTreatment(treatment)}
                      className={`px-3 py-2 rounded-lg ${
                        newLog.treatment.includes(treatment) ? 'bg-primary' : 'bg-zinc-800'
                      }`}
                    >
                      <Text className={newLog.treatment.includes(treatment) ? 'text-white font-bold' : 'text-zinc-400'}>
                        {treatment}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Affected Exercises */}
              <View className="mb-4">
                <Text className="text-zinc-400 text-sm mb-2">Ejercicios Afectados (separados por comas)</Text>
                <TextInput
                  className="bg-zinc-800 rounded-xl px-4 py-3 text-white"
                  placeholder="Press Banca, Press Militar, ..."
                  placeholderTextColor="#71717A"
                  value={newLog.affectedExercises}
                  onChangeText={(text) => setNewLog({ ...newLog, affectedExercises: text })}
                />
              </View>

              <TouchableOpacity
                onPress={addLog}
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
              >
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text className="text-white font-bold ml-2">Guardar Registro</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Summary */}
              <View className="bg-zinc-900 rounded-xl p-4 mb-6 border border-zinc-800">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-zinc-400 text-sm mb-1">Problemas Activos</Text>
                    <Text className="text-white text-3xl font-bold">{getActiveIssues()}</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-6xl">{getActiveIssues() === 0 ? '✅' : 'âš ï¸'}</Text>
                  </View>
                </View>
              </View>

              {/* Logs List */}
              {filteredLogs.length === 0 ? (
                <View className="bg-zinc-900 rounded-xl p-8 items-center border border-zinc-800">
                  <Text className="text-6xl mb-3">ðŸ’Š</Text>
                  <Text className="text-white font-bold text-lg mb-2">Sin Registros</Text>
                  <Text className="text-zinc-400 text-center">
                    Registra lesiones y molestias para mejor tracking
                  </Text>
                </View>
              ) : (
                filteredLogs.sort((a, b) => b.date.getTime() - a.date.getTime()).map((log) => {
                  const bodyPartInfo = getBodyPartInfo(log.bodyPart);
                  const statusColor = getStatusColor(log.status);
                  const severityColor = getSeverityColor(log.severity);

                  return (
                    <View key={log.id} className="bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-800">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-row items-start flex-1">
                          <View className={`w-12 h-12 bg-${severityColor}-500 rounded-xl items-center justify-center mr-3`}>
                            <Text className="text-2xl">{bodyPartInfo.icon}</Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-white font-bold text-lg mb-1">
                              {bodyPartInfo.label}
                            </Text>
                            <View className="flex-row gap-2">
                              <View className={`bg-${statusColor}-500/10 rounded px-2 py-0.5 border border-${statusColor}-500/30`}>
                                <Text className={`text-${statusColor}-400 text-xs font-bold`}>
                                  {getStatusLabel(log.status)}
                                </Text>
                              </View>
                              <View className={`bg-${severityColor}-500/10 rounded px-2 py-0.5 border border-${severityColor}-500/30`}>
                                <Text className={`text-${severityColor}-400 text-xs font-bold`}>
                                  {log.severity === 'low' ? 'Leve' : log.severity === 'medium' ? 'Media' : 'Alta'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => deleteLog(log.id)}>
                          <Ionicons name="trash" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {/* Description */}
                      <View className="bg-zinc-800 rounded-lg p-3 mb-3">
                        <Text className="text-zinc-300 text-sm">{log.description}</Text>
                      </View>

                      {/* Treatment */}
                      {log.treatment.length > 0 && (
                        <View className="mb-3">
                          <Text className="text-zinc-400 text-xs mb-2">TRATAMIENTO</Text>
                          <View className="flex-row flex-wrap gap-2">
                            {log.treatment.map((t, idx) => (
                              <View key={idx} className="bg-primary/10 rounded px-2 py-1 border border-primary/30">
                                <Text className="text-primary/80 text-xs">{t}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}

                      {/* Affected Exercises */}
                      {log.affectedExercises.length > 0 && (
                        <View className="mb-3">
                          <Text className="text-zinc-400 text-xs mb-2">EJERCICIOS AFECTADOS</Text>
                          <View className="flex-row flex-wrap gap-2">
                            {log.affectedExercises.map((ex, idx) => (
                              <View key={idx} className="bg-red-500/10 rounded px-2 py-1 border border-red-500/30">
                                <Text className="text-red-400 text-xs">{ex}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}

                      {/* Status Update */}
                      {log.status !== 'resolved' && (
                        <View className="flex-row gap-2">
                          {log.status === 'active' && (
                            <TouchableOpacity
                              onPress={() => updateStatus(log.id, 'recovering')}
                              className="flex-1 bg-amber-500 rounded-lg p-2"
                            >
                              <Text className="text-white text-sm font-bold text-center">Marcar Recuperando</Text>
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                            onPress={() => updateStatus(log.id, 'resolved')}
                            className="flex-1 bg-primary rounded-lg p-2"
                          >
                            <Text className="text-white text-sm font-bold text-center">Marcar Resuelto</Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      {/* Dates */}
                      <View className="mt-3 pt-3 border-t border-zinc-800">
                        <Text className="text-zinc-500 text-xs">
                          Registrado: {format(log.date, "d MMM yyyy", { locale: es })}
                          {log.resolvedDate && ` • Resuelto: ${format(log.resolvedDate, "d MMM yyyy", { locale: es })}`}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </>
          )}

          {/* Tips */}
          <View className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="medical" size={20} color="#EF4444" />
              <View className="flex-1 ml-3">
                <Text className="text-red-400 font-bold mb-2">
                  Prevención de Lesiones
                </Text>
                <Text className="text-red-300 text-sm">
                  • Calentamiento adecuado siempre{'\n'}
                  • No ignorar dolores persistentes{'\n'}
                  • Consulta profesional si es grave{'\n'}
                  • Técnica perfecta &gt; peso pesado{'\n'}
                  • Deload weeks cada 4-6 semanas
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

