import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles";

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("QRIS");

  const methods = ["QRIS", "Transfer Bank", "COD (Bayar di Tempat)"];

  return (
    <View style={[styles.container, { padding: 20 }]}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#1F2937",
          marginBottom: 16,
        }}
      >
        Pilih Metode Pembayaran
      </Text>

      {methods.map((method) => (
        <Pressable
          key={method}
          onPress={() => setSelectedMethod(method)}
          style={{
            backgroundColor: selectedMethod === method ? "#FEF3C7" : "#FFFFFF",
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: selectedMethod === method ? "#D97706" : "#D1D5DB",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#1F2937",
              fontWeight: selectedMethod === method ? "bold" : "normal",
            }}
          >
            {method}
          </Text>
        </Pressable>
      ))}

      <Pressable
        onPress={() => router.replace("/checkout/confirmation")}
        style={{
          backgroundColor: "#D97706",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>
          Konfirmasi & Selesaikan Pesanan
        </Text>
      </Pressable>
    </View>
  );
}
