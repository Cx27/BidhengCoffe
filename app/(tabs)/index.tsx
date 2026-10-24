import { CartContext, CartItem } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';
import * as Location from 'expo-location';
import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const API_URL = 'http://192.168.30.33:3000';

const MENU_DATA: CartItem[] = [
  { id: '1', name: 'Kopi Susu Bidheng', price: 15000, quantity: 0, imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=500&auto=format&fit=crop' },
  { id: '2', name: 'Americano Hitam', price: 12000, quantity: 0, imageUrl: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=500&auto=format&fit=crop' },
  { id: '3', name: 'Caramel Macchiato', price: 20000, quantity: 0, imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop' },
];

export default function KatalogScreen() {
  const { addToCart } = useContext(CartContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [distance, setDistance] = useState('Menghitung...');
  const [coffeeLoc, setCoffeeLoc] = useState({ latitude: -7.9213, longitude: 112.5982, status: 'Memuat status...' });

  const [isMapVisible, setIsMapVisible] = useState(true);

  useEffect(() => {
    const fetchCoffeeLocation = async () => {
      try {
        const response = await fetch(`${API_URL}/api/location`);
        const data = await response.json();
        if (data.latitude && data.longitude) {
          setCoffeeLoc(data);
        }
      } catch (error) {
        console.log('Gagal ambil posisi kopi dari server');
      }
    };

    fetchCoffeeLocation();
    const interval = setInterval(fetchCoffeeLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setDistance('GPS Ditolak');
        return;
      }

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 5 },
        (location) => {
          const userLat = location.coords.latitude;
          const userLon = location.coords.longitude;

          const R = 6371;
          const dLat = (coffeeLoc.latitude - userLat) * (Math.PI / 180);
          const dLon = (coffeeLoc.longitude - userLon) * (Math.PI / 180);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userLat * (Math.PI / 180)) * Math.cos(coffeeLoc.latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distKm = R * c;

          if (distKm < 1) {
            setDistance(`${(distKm * 1000).toFixed(0)} meter`);
          } else {
            setDistance(`${distKm.toFixed(2)} km`);
          }
        }
      );
    })();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [coffeeLoc.latitude, coffeeLoc.longitude]);

  const openExternalMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coffeeLoc.latitude},${coffeeLoc.longitude}&travelmode=driving`;
    Linking.openURL(url).catch((err) => Alert.alert('Error', 'Gagal membuka Google Maps'));
  };

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
    Alert.alert('Masuk Keranjang 🛒', `${item.name} ditambahkan!`);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.info}>
        <Text style={[styles.name, isDarkMode && styles.textDark]} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, isDarkMode && styles.textDark]}>Bidheng Coffee</Text>
          <Text style={styles.status} numberOfLines={1}>📍 Jarak: {distance} | {coffeeLoc.status}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.mapToggleButton}
            onPress={() => setIsMapVisible(!isMapVisible)}
          >
            <Text style={styles.mapToggleText}>{isMapVisible ? '🗺️ Tutup Peta' : '🗺️ Buka Peta'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
            <Text style={styles.themeButtonText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isMapVisible && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: coffeeLoc.latitude,
              longitude: coffeeLoc.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{ latitude: coffeeLoc.latitude, longitude: coffeeLoc.longitude }}
              title="Bidheng Coffee (Keliling)"
              description={coffeeLoc.status}
            />
          </MapView>

          <TouchableOpacity style={styles.navigateButton} onPress={openExternalMaps}>
            <Text style={styles.navigateButtonText}>🧭 Buka Rute di Google Maps</Text>
          </TouchableOpacity>
        </View>
      )}

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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingTop: 35
  },
  headerDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  textDark: { color: '#FFF' },
  status: { fontSize: 12, color: '#28A745', marginTop: 4, fontWeight: '500' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mapToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  mapToggleText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  themeButton: { padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8 },
  themeButtonText: { fontSize: 14 },
  mapContainer: {
    height: 210,
    width: '100%',
    backgroundColor: '#ddd',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  navigateButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#28A745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navigateButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardDark: { backgroundColor: '#1E1E1E' },
  productImage: { width: 60, height: 60, borderRadius: 10, marginRight: 12, backgroundColor: '#ddd' },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  price: { fontSize: 14, color: '#007BFF', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007BFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: -2 },
});