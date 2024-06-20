import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert, Image } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface LoginProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {
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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <View style={styles.header}>
          <Ionicons name="people-circle-outline" size={50} color="#000" />
          <Text style={styles.title}>Connect Skill!</Text>
        </View>
        <Text style={styles.slogan}>Connect-se e compartilhe suas habilidades com outras pessoas!</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size='large' color='#000' />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Button title='Logar' onPress={logar} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Registrar' onPress={() => navigation.navigate('Register')} />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
  },
  slogan: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    marginVertical: 7,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 7,
  },
});
