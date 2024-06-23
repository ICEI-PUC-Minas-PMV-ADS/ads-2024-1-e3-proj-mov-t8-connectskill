import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import { collection, getDocs, Firestore, addDoc, doc, query, where } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

interface User {
  id: string;
  name: string;
  email?: string;
  celular?: string;
  interesses: Interesse[];
  habilidades: Habilidade[];
}

interface Interesse {
  id: string;
  interesse: string;
}

interface Habilidade {
  id: string;
  habilidade: string;
}

const ConnectList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const firestore: Firestore = FIREBASE_DB;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'Usuarios');
        const usersSnapshot = await getDocs(usersCollection);

        if (usersSnapshot.empty) {
          console.log("Usuarios nao encontrados na collection 'Usuarios' no Firestore");
        } else {
          console.log(`${usersSnapshot.size} Usuarios encontrados`);
        }

        const usersList = await Promise.all(
          usersSnapshot.docs.map(async doc => {
            const data = doc.data();
            const interessesCollection = collection(firestore, 'Usuarios', doc.id, 'Interesses');
            const habilidadesCollection = collection(firestore, 'Usuarios', doc.id, 'Habilidades');

            const interessesSnapshot = await getDocs(interessesCollection);
            const habilidadesSnapshot = await getDocs(habilidadesCollection);

            const interesses = interessesSnapshot.docs.map(doc => ({
              id: doc.id,
              interesse: doc.data().interesse || 'Sem interesses',
            }));

            const habilidades = habilidadesSnapshot.docs.map(doc => ({
              id: doc.id,
              habilidade: doc.data().habilidade || 'Sem habilidades',
            }));

            return {
              id: doc.id,
              name: data.name || 'Sem name',
              email: data.email,
              celular: data.celular,
              interesses,
              habilidades,
            };
          })
        );

        setUsers(usersList);
        setFilteredUsers(usersList);
        console.log('Usuarios:', usersList);
      } catch (error) {
        console.error("Erro ao fazer fetch dos usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = users.filter(user =>
        user.interesses.some(i => i.interesse.toLowerCase().includes(lowercasedQuery)) ||
        user.habilidades.some(h => h.habilidade.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredUsers(filtered);
    }
  };

  const handleCardPress = async (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleConnectPress = async () => {
    if (FIREBASE_AUTH.currentUser && selectedUser) {
      try {
        const userDocRef = doc(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid);
        const conexoesCollectionRef = collection(userDocRef, 'Conexoes');
        
        // Verifica se a conexão já existe
        const q = query(conexoesCollectionRef, where('connectedUserId', '==', selectedUser.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          Alert.alert('Atenção', 'Você já está conectado com este usuário.');
        } else {
          await addDoc(conexoesCollectionRef, {
            connectedUserId: selectedUser.id,
          });
          Alert.alert('Sucesso!', 'Conexão adicionada');
        }
      } catch (error) {
        console.error("Erro ao fazer conexao:", error);
        Alert.alert('Erro', 'Não foi possível adicionar a conexão');
      }
    } else {
      Alert.alert('Erro', 'Usuário não autenticado ou usuário selecionado inválido');
    }

    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Filtrar por interesse ou skill"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {filteredUsers.length === 0 ? (
        <Text style={styles.noUsersText}>No users found</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              {item.email && <Text style={styles.cardSubtitle}><Text style={styles.bold}>Email:</Text> {item.email}</Text>}
              {item.celular && <Text style={styles.cardSubtitle}><Text style={styles.bold}>Celular:</Text> {item.celular}</Text>}
              <Text style={styles.cardSubtitle}><Text style={styles.bold}>Interesses:</Text> {item.interesses.map(i => i.interesse).join(', ')}</Text>
              <Text style={styles.cardSubtitle}><Text style={styles.bold}>Habilidades:</Text> {item.habilidades.map(h => h.habilidade).join(', ')}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}

      {selectedUser && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedUser.name}</Text>
              <Text style={styles.sectionTitle}>Interesses</Text>
              {selectedUser.interesses.length === 0 ? (
                <Text style={styles.itemText}>No interests found</Text>
              ) : (
                selectedUser.interesses.map(interesse => (
                  <Text key={interesse.id} style={styles.itemText}>{interesse.interesse}</Text>
                ))
              )}
              <Text style={styles.sectionTitle}>Habilidades</Text>
              {selectedUser.habilidades.length === 0 ? (
                <Text style={styles.itemText}>No skills found</Text>
              ) : (
                selectedUser.habilidades.map(habilidade => (
                  <Text key={habilidade.id} style={styles.itemText}>{habilidade.habilidade}</Text>
                ))
              )}
              <View style={styles.connectButtonContainer}>
                <Button title="Connect" onPress={handleConnectPress} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ConnectList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  noUsersText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  connectButtonContainer: {
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});
