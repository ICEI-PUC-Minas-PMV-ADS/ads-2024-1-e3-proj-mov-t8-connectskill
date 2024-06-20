import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, doc, Firestore, getDoc, onSnapshot } from 'firebase/firestore';

interface Interesse {
  id: string;
  interesse: string;
}

interface Habilidade {
  id: string;
  habilidade: string;
}

const Perfil = () => {
  const usuario = FIREBASE_AUTH.currentUser;
  const [name, setName] = useState('');
  const [celular, setCelular] = useState('');
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);

  const firestore: Firestore = FIREBASE_DB;

  useEffect(() => {
    if (usuario) {
      const userDocRef = doc(firestore, 'Usuarios', usuario.uid);

      const fetchUserDetails = async () => {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setCelular(userData.celular || '');
        }
      };

      fetchUserDetails();

      const unsubscribeInteresses = onSnapshot(
        collection(firestore, 'Usuarios', usuario.uid, 'Interesses'),
        (snapshot) => {
          const loadedInteresses = snapshot.docs.map(doc => ({
            id: doc.id,
            interesse: doc.data().interesse as string,
          }));
          setInteresses(loadedInteresses);
        },
        (error) => {
          console.error("Erro ao fazer o fetch dos interesses:", error);
        }
      );

      // Fetch skills
      const unsubscribeHabilidades = onSnapshot(
        collection(firestore, 'Usuarios', usuario.uid, 'Habilidades'),
        (snapshot) => {
          const loadedHabilidades = snapshot.docs.map(doc => ({
            id: doc.id,
            habilidade: doc.data().habilidade as string,
          }));
          setHabilidades(loadedHabilidades);
        },
        (error) => {
          console.error("Erro ao fazer o fetch das habilidades:", error);
        }
      );

      return () => {
        unsubscribeInteresses();
        unsubscribeHabilidades();
      };
    }
  }, [usuario]);

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Perfil</Text>
      <Text style={styles.emailText}>Nome: {name}</Text>
      <Text style={styles.emailText}>Email: {usuario?.email}</Text>
      <Text style={styles.emailText}>Celular: {celular}</Text>

      <Text style={styles.headerText}>Interesses</Text>
      <FlatList
        data={interesses}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.interesse}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      
      <Text style={styles.headerText}>Habilidades</Text>
      <FlatList
        data={habilidades}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.habilidade}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#e57373',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
