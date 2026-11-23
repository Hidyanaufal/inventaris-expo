import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventaris</Text>
      <Text style={styles.subtitle}>Aplikasi Manajemen Barang</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Barang</Text>
        <Text style={styles.number}>0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Barang Tersedia</Text>
        <Text style={styles.number}>0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Barang Dipinjam</Text>
        <Text style={styles.number}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 24,
    paddingTop: 70,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2457C5',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#555',
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2457C5',
    marginTop: 10,
  },
});