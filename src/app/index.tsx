import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
  MENU_BIDHENG,
  MENU_CATEGORIES,
  type MenuCategory,
} from "@/constants/menu";
import { useCart } from "./context/CartContext";
import { useTheme } from "./context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart, totalItems, totalPrice } = useCart();
  const { colors, isDark, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("All");

  const filteredMenu =
    selectedCategory === "All"
      ? MENU_BIDHENG
      : MENU_BIDHENG.filter((item) => item.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: totalItems > 0 ? 110 : 30,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            marginTop: 40,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="cafe" size={28} color={colors.primary} />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: colors.textPrimary,
              }}
            >
              Bidheng Coffee
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ubah tema"
            onPress={toggleTheme}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: colors.cardBg,
              elevation: 2,
            }}
          >
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={22}
              color={isDark ? "#F59E0B" : "#374151"}
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            {MENU_CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === category
                      ? colors.primary
                      : colors.cardBg,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === category
                        ? "#FFFFFF"
                        : colors.textSecondary,
                    fontWeight: "600",
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {filteredMenu.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Pressable onPress={() => router.push(`/products/${item.id}`)}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.textPrimary,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginTop: 2,
                }}
              >
                Kategori: {item.category}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.accent,
                  }}
                >
                  Rp {item.price.toLocaleString("id-ID")}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color:
                      item.rating >= 4.5 ? "#D97706" : colors.textSecondary,
                  }}
                >
                  ★ {item.rating}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => addToCart(item)}
              style={{
                marginTop: 12,
                backgroundColor: colors.primary,
                paddingVertical: 8,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 14 }}
              >
                + Tambah ke Keranjang
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {totalItems > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 16,
            right: 16,
            backgroundColor: colors.primary,
            borderRadius: 12,
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            elevation: 10,
            zIndex: 999,
          }}
        >
          <View>
            <Text style={{ color: "#FDE68A", fontSize: 12 }}>
              {totalItems} item dipilih
            </Text>
            <Text
              style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
            >
              Rp {totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/checkout/address")}
            style={{
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Checkout
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
