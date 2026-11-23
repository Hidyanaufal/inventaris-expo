import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ModalTambahBarang({ visible, onClose, onSubmit }) {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [kategori, setKategori] = useState("");
  const [stokTotal, setStokTotal] = useState("");

  const handleSave = () => {
    onSubmit({
      kode_barang: kodeBarang.trim(),
      nama_barang: namaBarang.trim(),
      kategori: kategori.trim() || "Umum",
      stok_total: parseInt(stokTotal, 10),
    });
    setKodeBarang("");
    setNamaBarang("");
    setKategori("");
    setStokTotal("");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Tambah Barang Baru</Text>
          <TextInput
            style={styles.input}
            placeholder="Kode Barang (misal: BRG-004)"
            value={kodeBarang}
            onChangeText={setKodeBarang}
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Barang"
            value={namaBarang}
            onChangeText={setNamaBarang}
          />
          <TextInput
            style={styles.input}
            placeholder="Kategori (misal: Elektronik)"
            value={kategori}
            onChangeText={setKategori}
          />
          <TextInput
            style={styles.input}
            placeholder="Jumlah Stok Awal"
            keyboardType="numeric"
            value={stokTotal}
            onChangeText={setStokTotal}
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={{ color: "#64748B" }}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: { backgroundColor: "#FFF", borderRadius: 16, padding: 20 },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelBtn: { padding: 10, marginRight: 10 },
  saveBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});