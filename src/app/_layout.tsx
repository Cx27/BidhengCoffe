import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="checkout"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="products/[id]"
            options={{ headerShown: true, title: "Detail Produk" }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
