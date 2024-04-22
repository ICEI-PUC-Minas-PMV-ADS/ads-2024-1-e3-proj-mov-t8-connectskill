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
        }finally{
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
        }finally{
            setLoading(false);
        }
    };


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
      <Text
      style={{fontSize: 30, marginBottom: 20}}
      >
        Connect Skill
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

      { loading ? ( <ActivityIndicator size='large' color='#000' /> 
      ) : ( 
        <>
            <View style={styles.buttonContainer}>
                <Button title='Logar' onPress={() => logar()} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Criar Conta' onPress={() => registrar()} />
            </View>
        </>
    )}
    </KeyboardAvoidingView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 7,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    }, 
    buttonContainer: {
        marginVertical: 7
    }
})

