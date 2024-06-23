import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface RegisterProps {
  navigation: NavigationProp<any, any>;
}

const Register = ({ navigation }: RegisterProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [celular, setCelular] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateCelular = (celular: string) => {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(celular);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const registrar = async () => {
    if (name.length > 50) {
      Alert.alert('Erro', 'O nome deve ter no máximo 50 caracteres.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (!validateCelular(celular)) {
      Alert.alert('Erro', 'Por favor, insira um número de celular válido no formato DDD + Celular, por exemplo 31912344321.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres, com pelo menos um número e um caractere especial.');
      return;
    }

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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Ionicons name="people-circle-outline" size={50} color="#000" />
          <Text style={styles.title}>Connect Skill</Text>
        </View>
        <Text style={styles.slogan}>Connect-se e compartilhe suas habilidades com outras pessoas!</Text>
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
          keyboardType='email-address'
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
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -130,
    left: 0,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
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
