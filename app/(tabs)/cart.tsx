import { CartContext, CartItem } from '@/context/CartContext';
import { ThemeContext } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
    const { cart, removeFromCart, totalPrice, clearCart } = useContext(CartContext);
    const { isDarkMode } = useContext(ThemeContext);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            Alert.alert('Kosong', 'Pilih kopi dulu dawg!');
            return;
        }
        try {
            const token = await AsyncStorage.getItem('user_token');
            if (!token) {
                Alert.alert(
                    'Akses Ditolak',
                    'Silakan Login atau Register untuk memproses pesanan.',
                    [
                        { text: 'Nanti Aja', style: 'cancel' },
                        { text: 'Login Sekarang', onPress: () => console.log('Navigasi ke Login') }
                    ]
                );
                return;
            }
            Alert.alert('Sukses 🎉', 'Pesanan masuk antrean Barista!');
            clearCart();
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={[styles.card, isDarkMode && styles.cardDark]}>
            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
            <View style={styles.info}>
                <Text style={[styles.name, isDarkMode && styles.textDark]} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.price}>
                    Rp {item.price.toLocaleString('id-ID')} <Text style={styles.qtyText}>x {item.quantity}</Text>
                </Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                activeOpacity={0.7}
                onPress={() => removeFromCart(item.id)}
            >
                <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
            <View style={[styles.header, isDarkMode && styles.headerDark]}>
                <Text style={[styles.title, isDarkMode && styles.textDark]}>Keranjang ☕</Text>
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Belum ada kopi yang dipilih.</Text>
                </View>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <View style={[styles.footer, isDarkMode && styles.headerDark]}>
                <View style={styles.totalContainer}>
                    <Text style={[styles.totalText, isDarkMode && styles.textDark]}>Total:</Text>
                    <Text style={styles.totalPrice}>Rp {totalPrice.toLocaleString('id-ID')}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    activeOpacity={0.8}
                    onPress={handleCheckout}
                >
                    <Text style={styles.checkoutButtonText}>Checkout Sekarang</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    containerDark: { backgroundColor: '#121212' },
    header: { padding: 20, paddingTop: 40, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
    headerDark: { backgroundColor: '#1E1E1E', borderColor: '#333' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    textDark: { color: '#FFF' },
    list: { padding: 16 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 12,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    cardDark: { backgroundColor: '#1E1E1E' },
    thumbnail: { width: 50, height: 50, borderRadius: 10, marginRight: 12, backgroundColor: '#ddd' },
    info: { flex: 1, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: '700', color: '#333' },
    price: { fontSize: 14, color: '#007BFF', marginTop: 4, fontWeight: 'bold' },
    qtyText: { color: '#666', fontWeight: 'normal' },
    removeButton: {
        backgroundColor: '#FF3B30',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    removeButtonText: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: -2 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#888' },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
    totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
    totalText: { fontSize: 18, fontWeight: '600', color: '#333' },
    totalPrice: { fontSize: 22, fontWeight: 'bold', color: '#28A745' },
    checkoutButton: {
        backgroundColor: '#28A745',
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});