import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PeminjamanCard({ item, onKembalikan }) {
  const isDipinjam = item.status === "DIPINJAM";

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: isDipinjam ? "#FEF3C7" : "#DCFCE7" },
          ]}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: isDipinjam ? "#92400E" : "#166534",
            }}
          >
            {item.status}
          </Text>
        </View>
        <Text style={styles.cardTitle}>
          {item.nama_barang} ({item.jumlah_pinjam} unit)
        </Text>
        <Text style={styles.stockText}>Peminjam: {item.nama_peminjam}</Text>
      </View>

      {isDipinjam && (
        <TouchableOpacity
          style={styles.returnBtn}
          onPress={() => onKembalikan(item.id)}
        >
          <Text style={styles.returnBtnText}>Kembalikan</Text>
        </TouchableOpacity>
      )}
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
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#0F172A" },
  stockText: { fontSize: 13, color: "#475569", marginTop: 4 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  returnBtn: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  returnBtnText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
});