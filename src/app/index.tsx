import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles";

interface CoffeeItem {
  readonly id: string;
  name: string;
  price: number;
  category: "Espresso" | "Milk Base" | "Non-Coffee";
  rating: number;
}

const MENU_BIDHENG: CoffeeItem[] = [
  {
    id: "1",
    name: "Kopi Tubruk Bidheng",
    price: 10000,
    category: "Espresso",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Es Kopi Susu Aren",
    price: 18000,
    category: "Milk Base",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Matcha Latte",
    price: 20000,
    category: "Non-Coffee",
    rating: 4.3,
  },
];

export default function Index() {
  const renderCategoryBadge = (category: string) => {
    return <Text style={styles.badge}>Kategori: {category}</Text>;
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Ionicons name="cafe" size={28} color="#7C2D12" />
        <Text style={styles.headerTitle}>Bidheng Coffee Menu</Text>
      </View>

      {MENU_BIDHENG.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.coffeeName}>{item.name}</Text>
          {renderCategoryBadge(item.category)}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#B45309" }}
            >
              Rp {item.price.toLocaleString("id-ID")}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: item.rating >= 4.5 ? "#D97706" : "#9CA3AF",
              }}
            >
              ★ {item.rating}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
