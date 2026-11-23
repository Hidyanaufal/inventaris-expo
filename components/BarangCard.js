import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarangCard({ item, onPinjam }) {
  const habis = item.stok_tersedia === 0;

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.codeBadge}>
          {item.kode_barang} • {item.kategori}
        </Text>
        <Text style={styles.cardTitle}>{item.nama_barang}</Text>
        <Text style={styles.stockText}>
          Tersedia:{" "}
          <Text style={{ fontWeight: "bold", color: "#4F46E5" }}>
            {item.stok_tersedia}
          </Text>{" "}
          / {item.stok_total} unit
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.pinjamBtn, habis && { backgroundColor: "#CBD5E1" }]}
        disabled={habis}
        onPress={() => onPinjam(item)}
      >
        <Text style={styles.pinjamBtnText}>{habis ? "Habis" : "Pinjam"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  codeBadge: { fontSize: 11, color: "#64748B", marginBottom: 4 },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#0F172A" },
  stockText: { fontSize: 13, color: "#475569", marginTop: 4 },
  pinjamBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pinjamBtnText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
});