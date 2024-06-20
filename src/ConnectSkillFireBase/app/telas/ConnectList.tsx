import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { collection, getDocs, Firestore } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';

interface User {
  id: string;
  name: string;
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const firestore: Firestore = FIREBASE_DB;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'Usuarios');
        const usersSnapshot = await getDocs(usersCollection);

        if (usersSnapshot.empty) {
          console.log("No users found in Firestore collection 'Usuarios'");
        } else {
          console.log(`Found ${usersSnapshot.size} users`);
        }

        const usersList = usersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'No name'
          };
        });

        setUsers(usersList);
        console.log('Fetched users:', usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const interessesCollection = collection(firestore, 'Usuarios', userId, 'Interesses');
      const habilidadesCollection = collection(firestore, 'Usuarios', userId, 'Habilidades');

      const interessesSnapshot = await getDocs(interessesCollection);
      const habilidadesSnapshot = await getDocs(habilidadesCollection);

      const loadedInteresses = interessesSnapshot.docs.map(doc => ({
        id: doc.id,
        interesse: doc.data().interesse || 'No interesse'
      }));

      const loadedHabilidades = habilidadesSnapshot.docs.map(doc => ({
        id: doc.id,
        habilidade: doc.data().habilidade || 'No habilidade'
      }));

      setInteresses(loadedInteresses);
      setHabilidades(loadedHabilidades);

      console.log('Fetched interests:', loadedInteresses);
      console.log('Fetched skills:', loadedHabilidades);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCardPress = async (user: User) => {
    setSelectedUser(user);
    await fetchUserDetails(user.id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
    setInteresses([]);
    setHabilidades([]);
  };

  return (
    <View style={styles.container}>
      {users.length === 0 ? (
        <Text style={styles.noUsersText}>No users found</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
              <Text style={styles.cardText}>{item.name}</Text>
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
              <Text style={styles.modalTitle}>{selectedUser.name}</Text>
              <Text style={styles.sectionTitle}>Interesses</Text>
              {interesses.length === 0 ? (
                <Text style={styles.itemText}>No interests found</Text>
              ) : (
                interesses.map(interesse => (
                  <Text key={interesse.id} style={styles.itemText}>{interesse.interesse}</Text>
                ))
              )}
              <Text style={styles.sectionTitle}>Habilidades</Text>
              {habilidades.length === 0 ? (
                <Text style={styles.itemText}>No skills found</Text>
              ) : (
                habilidades.map(habilidade => (
                  <Text key={habilidade.id} style={styles.itemText}>{habilidade.habilidade}</Text>
                ))
              )}
              <Button title="Fechar" onPress={closeModal} />
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
  cardText: {
    fontSize: 18,
    color: '#333',
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
});
