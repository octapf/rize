import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { leaderboardApi, LeaderboardEntry } from '@/services/api/leaderboard.api';

const LEADERBOARD_TYPES = [
  { key: 'xp', label: 'XP Total', icon: 'flash', color: '#FFEA00' },
  { key: 'workouts', label: 'Workouts (Mes)', icon: 'barbell', color: '#9D12DE' },
  { key: 'volume', label: 'Volumen (Mes)', icon: 'speedometer', color: '#8b5cf6' },
  { key: 'streak', label: 'Racha', icon: 'flame', color: '#ef4444' },
];

const VIEWS = [
  { key: 'global', label: 'Global', icon: 'globe' },
  { key: 'friends', label: 'Amigos', icon: 'people' },
];

export default function LeaderboardScreen() {
  const [selectedType, setSelectedType] = useState('xp');
  const [selectedView, setSelectedView] = useState<'global' | 'friends'>('global');

  const { data: globalData, isLoading: globalLoading } = useQuery({
    queryKey: ['leaderboard', selectedType, 'global'],
    queryFn: () => {
      switch (selectedType) {
        case 'xp':
          return leaderboardApi.getTopByXP(50);
        case 'workouts':
          return leaderboardApi.getTopByWorkouts(50);
        case 'volume':
          return leaderboardApi.getTopByVolume(50);
        case 'streak':
          return leaderboardApi.getTopByStreak(50);
        default:
          return leaderboardApi.getTopByXP(50);
      }
    },
    enabled: selectedView === 'global',
  });

  const { data: friendsData, isLoading: friendsLoading } = useQuery({
    queryKey: ['leaderboard', selectedType, 'friends'],
    queryFn: () =>
      leaderboardApi.getFriendsLeaderboard(
        selectedType as 'xp' | 'workouts' | 'volume'
      ),
    enabled: selectedView === 'friends',
  });

  const { data: userRanksData } = useQuery({
    queryKey: ['leaderboard', 'user-ranks'],
    queryFn: () => leaderboardApi.getUserRanks(),
  });

  const data = selectedView === 'global' ? globalData : friendsData;
  const isLoading = selectedView === 'global' ? globalLoading : friendsLoading;
  const leaderboard = data?.data || [];
  const userRanks = userRanksData?.data;

  const getRankColor = (rank: number): string => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return '#666';
  };

  const getRankIcon = (rank: number): string => {
    if (rank === 1) return 'trophy';
    if (rank === 2) return 'medal';
    if (rank === 3) return 'medal';
    return 'ribbon';
  };

  const formatValue = (entry: LeaderboardEntry): string => {
    switch (selectedType) {
      case 'xp':
        return `${entry.xp?.toLocaleString() || 0} XP`;
      case 'workouts':
        return `${entry.workoutCount || 0} workouts`;
      case 'volume':
        return `${(entry.totalVolume || 0).toLocaleString()} kg`;
      case 'streak':
        return `${entry.streak || 0} días`;
      default:
        return '';
    }
  };

  const renderItem = ({ item }: { item: LeaderboardEntry }) => {
    const rankColor = getRankColor(item.rank);
    const rankIcon = getRankIcon(item.rank);

    return (
      <View
        style={[
          styles.entryCard,
          item.isCurrentUser && styles.entryCardHighlight,
        ]}
      >
        {/* Rank */}
        <View style={styles.rankContainer}>
          {item.rank <= 3 ? (
            <Ionicons name={rankIcon as any} size={32} color={rankColor} />
          ) : (
            <Text style={styles.rankNumber}>#{item.rank}</Text>
          )}
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color="#666" />
            </View>
          )}
          {item.isCurrentUser && (
            <View style={styles.youBadge}>
              <Text style={styles.youBadgeText}>TÚ</Text>
            </View>
          )}
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text
            style={[styles.userName, item.isCurrentUser && styles.userNameHighlight]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>

        {/* Value */}
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{formatValue(item)}</Text>
        </View>
      </View>
    );
  };

  const selectedTypeData = LEADERBOARD_TYPES.find((t) => t.key === selectedType);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Clasificación',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />

      {/* User Ranks Summary */}
      {userRanks && selectedView === 'global' && (
        <LinearGradient colors={['#1a1a1a', '#000']} style={styles.ranksHeader}>
          <Text style={styles.ranksTitle}>Tus Rankings</Text>
          <View style={styles.ranksGrid}>
            <View style={styles.rankItem}>
              <Ionicons name="flash" size={20} color="#FFEA00" />
              <Text style={styles.rankLabel}>XP</Text>
              <Text style={styles.rankValue}>#{userRanks.xpRank}</Text>
            </View>
            <View style={styles.rankItem}>
              <Ionicons name="flame" size={20} color="#ef4444" />
              <Text style={styles.rankLabel}>Racha</Text>
              <Text style={styles.rankValue}>#{userRanks.streakRank}</Text>
            </View>
            <View style={styles.rankItem}>
              <Ionicons name="barbell" size={20} color="#9D12DE" />
              <Text style={styles.rankLabel}>Workouts</Text>
              <Text style={styles.rankValue}>#{userRanks.workoutsRank}</Text>
            </View>
          </View>
          <Text style={styles.totalUsers}>
            de {userRanks.totalUsers.toLocaleString()} usuarios
          </Text>
        </LinearGradient>
      )}

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        {VIEWS.map((view) => (
          <TouchableOpacity
            key={view.key}
            style={[
              styles.viewButton,
              selectedView === view.key && styles.viewButtonActive,
            ]}
            onPress={() => setSelectedView(view.key as 'global' | 'friends')}
          >
            <Ionicons
              name={view.icon as any}
              size={20}
              color={selectedView === view.key ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.viewButtonText,
                selectedView === view.key && styles.viewButtonTextActive,
              ]}
            >
              {view.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Type Tabs */}
      <View style={styles.typeTabs}>
        <FlatList
          horizontal
          data={LEADERBOARD_TYPES}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.typeTab,
                selectedType === item.key && styles.typeTabActive,
                selectedType === item.key && { borderColor: item.color },
              ]}
              onPress={() => setSelectedType(item.key)}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={selectedType === item.key ? item.color : '#666'}
              />
              <Text
                style={[
                  styles.typeTabText,
                  selectedType === item.key && { color: item.color },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Leaderboard List */}
      {isLoading && (
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Cargando clasificación...</Text>
        </View>
      )}

      {!isLoading && leaderboard.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="trophy-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>
            {selectedView === 'friends'
              ? 'Aún no hay datos de tus amigos'
              : 'No hay datos disponibles'}
          </Text>
        </View>
      )}

      {!isLoading && leaderboard.length > 0 && (
        <FlatList
          data={leaderboard}
          renderItem={renderItem}
          keyExtractor={(item) => item.userId}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  ranksHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  ranksTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  ranksGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  rankItem: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  rankLabel: {
    fontSize: 12,
    color: '#999',
  },
  rankValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  totalUsers: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
  },
  viewButtonActive: {
    backgroundColor: '#9D12DE',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  viewButtonTextActive: {
    color: '#fff',
  },
  typeTabs: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  tabsList: {
    padding: 16,
    gap: 12,
  },
  typeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333',
  },
  typeTabActive: {
    backgroundColor: '#27272a',
  },
  typeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  list: {
    padding: 16,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  entryCardHighlight: {
    borderWidth: 2,
    borderColor: '#9D12DE',
    backgroundColor: '#0a2f1f',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#9D12DE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  youBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  userNameHighlight: {
    color: '#9D12DE',
  },
  username: {
    fontSize: 12,
    color: '#999',
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
});

