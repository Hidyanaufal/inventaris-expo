import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import PeminjamanCard from "../components/PeminjamanCard";
import StatsHeader from "../components/StatsHeader";
import { getBarang, getPeminjaman, kembalikanBarang } from "../services/api";

export default function PeminjamanScreen() {
  const [barangList, setBarangList] = useState([]);
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [dataBarang, dataPinjam] = await Promise.all([
        getBarang(),
        getPeminjaman(),
      ]);
      setBarangList(dataBarang);
      setPeminjamanList(dataPinjam);
    } catch (error) {
      Alert.alert(
        "Koneksi Gagal",
        "Pastikan server API berjalan & IP sudah benar.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handleKembalikan = (id) => {
    Alert.alert(
      "Konfirmasi Pengembalian",
      "Apakah barang ini sudah dikembalikan dalam kondisi baik?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Kembalikan",
          onPress: async () => {
            try {
              const result = await kembalikanBarang(id);
              Alert.alert("Berhasil", result.message);
              loadData();
            } catch (err) {
              Alert.alert("Error", err.message);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />

      <StatsHeader
        barangList={barangList}
        peminjamanList={peminjamanList}
        onRefresh={loadData}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 40 }}
        />
      ) : (
        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>
            Riwayat Peminjaman
          </Text>
          <FlatList
            data={peminjamanList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PeminjamanCard item={item} onKembalikan={handleKembalikan} />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
});