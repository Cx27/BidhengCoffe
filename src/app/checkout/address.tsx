import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AddressScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Form Alamat Pengiriman
      </Text>
      <Pressable
        onPress={() => router.push("/checkout/payment")}
        style={{ backgroundColor: "#7C2D12", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
          Lanjut ke Pembayaran
        </Text>
      </Pressable>
    </View>
  );
}
