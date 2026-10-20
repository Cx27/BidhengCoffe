import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { MENU_BIDHENG } from "@/constants/menu";
import { styles } from "@/styles";
import { useCart } from "../context/CartContext";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = MENU_BIDHENG.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Produk tidak ditemukan!</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Kembali ke Menu</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#7C2D12" />
        <Text style={styles.backButtonText}>Kembali</Text>
      </Pressable>

      <View style={styles.card}>
        <View style={styles.productMeta}>
          <Text style={styles.categoryBadge}>{product.category}</Text>
          <Text style={styles.rating}>★ {product.rating}</Text>
        </View>

        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productPrice}>
          Rp {product.price.toLocaleString("id-ID")}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionTitle}>Deskripsi Menu:</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Pressable
          onPress={() => {
            addToCart(product);
            router.back();
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Tambah ke Keranjang</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
