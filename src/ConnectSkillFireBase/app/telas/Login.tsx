import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const logar = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert.alert('Sucesso!', 'Login realizado');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const registrar = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert.alert('Sucesso!', 'Cadastro realizado');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <Text style={styles.title}>
                    Connect Skil
                </Text>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    value={password}
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                {loading ? (
                    <ActivityIndicator size='large' color='#000' />
                ) : (
                    <>
                        <TouchableOpacity onPress={() => logar()}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Logar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => registrar()}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Criar Conta</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#d1e4ef"
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        marginVertical: 7,
        height: 40,
        width: 280,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#f3f6f7',
    },
    buttonContainer: {
        width: 280,
        height: 50,
        marginTop: 5,
        borderRadius: 20,
        backgroundColor: '#3197ce',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

