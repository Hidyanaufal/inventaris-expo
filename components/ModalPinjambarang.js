import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ModalPinjamBarang({
  visible,
  barang,
  onClose,
  onSubmit,
}) {
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [jumlahPinjam, setJumlahPinjam] = useState("1");

  const handleConfirm = () => {
    if (!barang) return;
    onSubmit({
      barang_id: barang.id,
      nama_peminjam: namaPeminjam.trim(),
      jumlah_pinjam: parseInt(jumlahPinjam, 10),
    });
    setNamaPeminjam("");
    setJumlahPinjam("1");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Pinjam: {barang?.nama_barang}</Text>
          <Text style={{ marginBottom: 12, color: "#64748B" }}>
            Stok tersedia saat ini: {barang?.stok_tersedia} unit
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Peminjam"
            value={namaPeminjam}
            onChangeText={setNamaPeminjam}
          />
          <TextInput
            style={styles.input}
            placeholder="Jumlah Dipinjam"
            keyboardType="numeric"
            value={jumlahPinjam}
            onChangeText={setJumlahPinjam}
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={{ color: "#64748B" }}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleConfirm}>
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                Konfirmasi Pinjam
              </Text>
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