import { Stack } from "expo-router";

export default function CheckoutLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#7C2D12" },
        headerTintColor: "#FFFFFF",
      }}
    >
      <Stack.Screen name="address" options={{ title: "Alamat Pengiriman" }} />
      <Stack.Screen name="payment" options={{ title: "Metode Pembayaran" }} />
      <Stack.Screen
        name="confirmation"
        options={{ title: "Konfirmasi Pesanan", headerBackVisible: false }}
      />
    </Stack>
  );
}
