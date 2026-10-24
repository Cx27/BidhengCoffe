import { ThemeContext } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://192.xxxxxxxxx:3000';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const { isDarkMode } = useContext(ThemeContext);

    const handleSubmit = async () => {
        if (!username || !password) {
            return Alert.alert('Error', 'Username dan password wajib diisi!');
        }
        setIsLoading(true);

        const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await response.json();

            if (response.ok && data.success) {
                if (isRegisterMode) {
                    Alert.alert('Registrasi Berhasil 🎉', 'Silakan masuk dengan akun baru Anda.');
                    setIsRegisterMode(false);
                    setPassword('');
                } else {
                    await AsyncStorage.setItem('user_token', data.token);
                    Alert.alert('Sukses 🚀', 'Login berhasil!');
                    router.back();
                }
            } else {
                Alert.alert('Gagal', data.message || 'Terjadi kesalahan pada server.');
            }
        } catch (error) {
            Alert.alert('Offline / RTO', 'Server API tidak merespons (Timeout 5000ms).');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <Text style={[styles.title, isDarkMode && styles.textDark]}>
                {isRegisterMode ? 'Buat Akun Baru ✍️' : 'Selamat Datang ☕'}
            </Text>
            <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
                {isRegisterMode ? 'Daftar untuk mulai memesan di Bidheng Coffee' : 'Silakan masuk ke akun Anda'}
            </Text>

            <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Username"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={[styles.buttonPrimary, isRegisterMode && styles.buttonRegisterMode]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {isRegisterMode ? 'Daftar Sekarang' : 'Masuk'}
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsRegisterMode(!isRegisterMode)}
            >
                <Text style={[styles.switchText, isDarkMode && styles.switchTextDark]}>
                    {isRegisterMode
                        ? 'Sudah punya akun? Login di sini'
                        : 'Belum punya akun? Register di sini'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F8F9FA' },
    containerDark: { backgroundColor: '#121212' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 6 },
    subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
    subtitleDark: { color: '#aaa' },
    textDark: { color: '#fff' },
    input: { height: 50, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
    inputDark: { backgroundColor: '#1E1E1E', borderColor: '#333', color: '#fff' },
    buttonPrimary: { backgroundColor: '#007BFF', height: 52, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16, elevation: 2 },
    buttonRegisterMode: { backgroundColor: '#28A745' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    switchButton: { padding: 10, alignItems: 'center' },
    switchText: { color: '#007BFF', fontSize: 15, fontWeight: '600' },
    switchTextDark: { color: '#4da6ff' }
});