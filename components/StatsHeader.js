import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsHeader({ barangList, peminjamanList, onRefresh }) {
  const totalStokTersedia = barangList.reduce((sum, item) => sum + item.stok_tersedia, 0);
  const sedangDipinjam = peminjamanList.filter((p) => p.status === 'DIPINJAM').length;

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>InvenTrack</Text>
          <Text style={styles.headerSub}>Manajemen Stok Real-time</Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
          <Ionicons name="refresh" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{barangList.length}</Text>
          <Text style={styles.statLabel}>Jenis Barang</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#16A34A' }]}>{totalStokTersedia}</Text>
          <Text style={styles.statLabel}>Stok Tersedia</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#D97706' }]}>{sedangDipinjam}</Text>
          <Text style={styles.statLabel}>Sedang Dipinjam</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4F46E5',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#C7D2FE' },
  refreshBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: -10 },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 4 },
});