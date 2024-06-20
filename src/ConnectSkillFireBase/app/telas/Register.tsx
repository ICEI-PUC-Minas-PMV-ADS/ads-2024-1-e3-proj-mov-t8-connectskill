import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [celular, setCelular] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const registrar = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      const userDocRef = doc(FIREBASE_DB, 'Usuarios', user.uid);
      await setDoc(userDocRef, {
        email: email,
        name: name,
        celular: celular,
      });

      const habilidadesCollectionRef = collection(userDocRef, 'Habilidades');
      const interessesCollectionRef = collection(userDocRef, 'Interesses');
      
      await addDoc(habilidadesCollectionRef, { habilidade: 'Sua primeira skill!' });
      await addDoc(interessesCollectionRef, { interesse: 'Seu primeiro interesse!' });

      Alert.alert('Sucesso!', 'Cadastro realizado');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.title}>
          Connect Skill - Registrar
        </Text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder='Nome'
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          value={email}
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={celular}
          style={styles.input}
          placeholder='Celular'
          keyboardType='phone-pad'
          onChangeText={(text) => setCelular(text)}
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
          <View style={styles.buttonContainer}>
            <Button title='Registrar' onPress={registrar} />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
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
    marginVertical: 7,
  },
});
