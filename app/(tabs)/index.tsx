import { CartContext, CartItem } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MENU_DATA: CartItem[] = [
  {
    id: '1',
    name: 'Kopi Susu Bidheng',
    price: 15000,
    quantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Americano Hitam',
    price: 12000,
    quantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Caramel Macchiato',
    price: 20000,
    quantity: 0,
    imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop'
  },
];

export default function KatalogScreen() {
  const { addToCart } = useContext(CartContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
    Alert.alert('Masuk Keranjang 🛒', `${item.name} berhasil ditambahkan!`);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />

      <View style={styles.info}>
        <Text style={[styles.name, isDarkMode && styles.textDark]}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => handleAddToCart(item)}
        accessibilityLabel={`Tambah ${item.name}`}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <View>
          <Text style={[styles.title, isDarkMode && styles.textDark]}>Bidheng Coffee</Text>
          <Text style={styles.status}>🟢 Keliling: Area Kos</Text>
        </View>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MENU_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  containerDark: { backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingTop: 40
  },
  headerDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  textDark: { color: '#FFF' },
  status: { fontSize: 14, color: '#28A745', marginTop: 4, fontWeight: '500' },
  themeButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12
  },
  themeButtonText: { fontSize: 18 },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardDark: { backgroundColor: '#1E1E1E' },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: '#ddd'
  },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  price: { fontSize: 15, color: '#007BFF', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007BFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: -2 },
});