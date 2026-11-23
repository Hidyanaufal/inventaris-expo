import { Ionicons } from "@expo/vector-icons";
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
    TouchableOpacity,
    View,
} from "react-native";
import BarangCard from "../components/BarangCard";
import ModalPinjamBarang from "../components/ModalPinjamBarang";
import ModalTambahBarang from "../components/ModalTambahBarang";
import StatsHeader from "../components/StatsHeader";
import {
    createBarang,
    getBarang,
    getPeminjaman,
    pinjamBarang,
} from "../services/api";

export default function BarangScreen() {
  const [barangList, setBarangList] = useState([]);
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalBarang, setModalBarang] = useState(false);
  const [modalPinjam, setModalPinjam] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);

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

  // Refresh otomatis setiap kali tab ini aktif
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handleTambahBarang = async (payload) => {
    if (!payload.kode_barang || !payload.nama_barang || !payload.stok_total) {
      return Alert.alert("Peringatan", "Lengkapi semua data barang!");
    }
    try {
      await createBarang(payload);
      setModalBarang(false);
      loadData();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const handlePinjamBarang = async (payload) => {
    if (!payload.nama_peminjam || !payload.jumlah_pinjam) {
      return Alert.alert("Peringatan", "Isi nama peminjam dan jumlah!");
    }
    try {
      const result = await pinjamBarang(payload);
      Alert.alert("Sukses", result.message);
      setModalPinjam(false);
      setSelectedBarang(null);
      loadData();
    } catch (err) {
      Alert.alert("Gagal", err.message);
    }
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daftar Inventaris</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setModalBarang(true)}
            >
              <Ionicons name="add" size={18} color="#FFF" />
              <Text style={styles.addBtnText}>Barang Baru</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={barangList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BarangCard
                item={item}
                onPinjam={(barangDipilih) => {
                  setSelectedBarang(barangDipilih);
                  setModalPinjam(true);
                }}
              />
            )}
          />
        </View>
      )}

      <ModalTambahBarang
        visible={modalBarang}
        onClose={() => setModalBarang(false)}
        onSubmit={handleTambahBarang}
      />

      <ModalPinjamBarang
        visible={modalPinjam}
        barang={selectedBarang}
        onClose={() => {
          setModalPinjam(false);
          setSelectedBarang(null);
        }}
        onSubmit={handlePinjamBarang}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
});