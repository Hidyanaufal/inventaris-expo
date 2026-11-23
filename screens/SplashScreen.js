import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // replace agar user tidak bisa kembali ke splash screen dengan tombol back
      navigation.replace('MainTabs');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <View style={styles.logoCircle}>
        <Ionicons name="cube" size={64} color="#4F46E5" />
      </View>
      <Text style={styles.splashTitle}>InvenTrack</Text>
      <Text style={styles.splashSubtitle}>Sistem Inventaris & Peminjaman Barang</Text>
      <ActivityIndicator size="small" color="#FFFFFF" style={{ marginTop: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  splashTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 1 },
  splashSubtitle: { fontSize: 14, color: '#E0E7FF', marginTop: 6 },
});