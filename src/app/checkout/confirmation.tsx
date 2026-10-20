import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles";
import { useCart } from "../context/CartContext";

export default function ConfirmationScreen() {
  const router = useRouter();
  const { totalPrice } = useCart();

  return (
    <View
      style={[
        styles.container,
        { padding: 20, justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Ionicons
        name="checkmark-circle"
        size={80}
        color="#10B981"
        style={{ marginBottom: 16 }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#1F2937",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Pesanan Berhasil Dibuat!
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#4B5563",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        Kopi racikan spesial Bidheng Coffee sedang disiapkan oleh barista. Total
        pembayaran: Rp {totalPrice.toLocaleString("id-ID")}
      </Text>

      <Pressable
        onPress={() => router.dismissAll()}
        style={{
          backgroundColor: "#7C2D12",
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>
          Kembali ke Menu Utama
        </Text>
      </Pressable>
    </View>
  );
}
