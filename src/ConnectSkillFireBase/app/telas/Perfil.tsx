import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, doc, Firestore, getDoc, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

interface Interesse {
  id: string;
  interesse: string;
}

interface Habilidade {
  id: string;
  habilidade: string;
}

interface User {
  id: string;
  name: string;
  email?: string;
  celular?: string;
}

const Perfil = () => {
  const usuario = FIREBASE_AUTH.currentUser;
  const [name, setName] = useState('');
  const [celular, setCelular] = useState('');
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [conexoes, setConexoes] = useState<User[]>([]);
  const [hasConexoes, setHasConexoes] = useState<boolean>(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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

      const unsubscribeConexoes = onSnapshot(
        collection(firestore, 'Usuarios', usuario.uid, 'Conexoes'),
        async (snapshot) => {
          if (snapshot.empty) {
            setHasConexoes(false);
            setConexoes([]);
          } else {
            setHasConexoes(true);
            const loadedConexoes: User[] = [];
            for (const conexaoDoc of snapshot.docs) {
              const connectedUserId = conexaoDoc.data().connectedUserId;
              const connectedUserDoc = await getDoc(doc(firestore, 'Usuarios', connectedUserId));
              if (connectedUserDoc.exists()) {
                const connectedUserData = connectedUserDoc.data();
                loadedConexoes.push({
                  id: connectedUserDoc.id,
                  name: connectedUserData.name || '',
                  email: connectedUserData.email,
                  celular: connectedUserData.celular,
                });
              }
            }
            setConexoes(loadedConexoes);
          }
        },
        (error) => {
          console.error("Erro ao fazer o fetch das conexões:", error);
        }
      );

      return () => {
        unsubscribeInteresses();
        unsubscribeHabilidades();
        unsubscribeConexoes();
      };
    }
  }, [usuario]);

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Perfil</Text>
      <Text style={styles.emailText}>Nome: {name}</Text>
      <Text style={styles.emailText}>Email: {usuario?.email}</Text>
      <Text style={styles.emailText}>Celular: {celular}</Text>

      <TouchableOpacity onPress={() => toggleSection('Interesses')} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Interesses</Text>
        <Ionicons name={expandedSection === 'Interesses' ? "chevron-up" : "chevron-down"} size={20} color="#333" />
      </TouchableOpacity>
      {expandedSection === 'Interesses' && (
        <FlatList
          data={interesses}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.interesse}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
      
      <TouchableOpacity onPress={() => toggleSection('Habilidades')} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Habilidades</Text>
        <Ionicons name={expandedSection === 'Habilidades' ? "chevron-up" : "chevron-down"} size={20} color="#333" />
      </TouchableOpacity>
      {expandedSection === 'Habilidades' && (
        <FlatList
          data={habilidades}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.habilidade}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
      
      <TouchableOpacity onPress={() => toggleSection('Conexoes')} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Conexões</Text>
        <Ionicons name={expandedSection === 'Conexoes' ? "chevron-up" : "chevron-down"} size={20} color="#333" />
      </TouchableOpacity>
      {expandedSection === 'Conexoes' && (
        hasConexoes ? (
          <FlatList
            data={conexoes}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemText}><Text style={styles.bold}>Email:</Text> {item.email}</Text>
                <Text style={styles.itemText}><Text style={styles.bold}>Celular:</Text> {item.celular}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noConnectionsText}>Você ainda não tem conexões</Text>
        )
      )}

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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noConnectionsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
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
  bold: {
    fontWeight: 'bold',
  },
});
