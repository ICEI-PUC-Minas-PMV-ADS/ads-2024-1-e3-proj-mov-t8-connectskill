import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { collection, Firestore, addDoc, deleteDoc, doc, onSnapshot, getDocs, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface Interesse {
  id: string;
  interesse: string;
}

/**
 * Componente de lista de interesses.
 * 
 * @param navigation - Objeto de navegação utilizado para navegar entre as telas.
 * @returns O componente de lista de interesses.
 */
const List = ({ navigation }: RouterProps) => {
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [novoInteresse, setNovoInteresse] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const firestore: Firestore = FIREBASE_DB;

  useEffect(() => {
    /**
     * busca os interesses do usuário atual no Firestore.
     * 
     * @returns Uma função de cancelamento que pode ser usada para parar de ouvir as atualizações dos interesses.
     */
    const unsubscribe = onSnapshot(
      collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser!.uid, 'Interesses'),
      (snapshot) => {
        const loadedInteresses = snapshot.docs.map(doc => ({
          id: doc.id,
          interesse: doc.data().interesse as string,
        }));
        setInteresses(loadedInteresses);
      },
      (error) => {
        console.error("erro ao fazer o fetch dos interesses:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const MAX_INTERESTS = 5;

  const adicionarInteresse = async () => {
    if (novoInteresse.trim().length > 0 && FIREBASE_AUTH.currentUser?.uid) {
      try {
        const currentInterestsSnapshot = await getDocs(collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Interesses'));
        const currentNumberOfInterests = currentInterestsSnapshot.docs.length;

        if (currentNumberOfInterests < MAX_INTERESTS) {
          await addDoc(collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Interesses'), {
            interesse: novoInteresse
          });
          setNovoInteresse("");
        } else {
          console.error("Limit of interests reached.");
        }
      } catch (error) {
        console.error("erro ao adicionar interesse:", error);
      }
    } else {
      console.error("erro ao adicionar interesse: usuário nao autenticado ou uid indefinido");
    }
  };

  const editarInteresse = async (interesseId: string, novoValor: string) => {
    if (novoValor.trim().length > 0 && FIREBASE_AUTH.currentUser?.uid && interesseId) {
      try {
        const interesseRef = doc(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Interesses', interesseId);
        await updateDoc(interesseRef, {
          interesse: novoValor
        });
        setEditingId(null);
        setEditingValue("");
      } catch (error) {
        console.error("erro ao editar interesse:", error);
      }
    } else {
      console.error("erro ao editar interesse: usuário não autenticado, uid indefinido, ou id do interesse indefinido");
    }
  };

  const deletarInteresse = async (id: string) => {
    if (FIREBASE_AUTH.currentUser?.uid) {
      try {
        await deleteDoc(doc(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Interesses', id));
      } catch (error) {
        console.error("erro ao deletar interesse:", error);
      }
    } else {
      console.error("usuário nao autenticado ou uid indefinido");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={interesses}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editingValue}
                  onChangeText={setEditingValue}
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => editarInteresse(item.id, editingValue)}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.itemText}>{item.interesse}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deletarInteresse(item.id)}>
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={() => {
                    setEditingId(item.id);
                    setEditingValue(item.interesse);
                  }}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <TextInput
        value={novoInteresse}
        onChangeText={setNovoInteresse}
        placeholder="Adicionar novo interesse"
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={adicionarInteresse}>
        <Text style={styles.buttonText}>Adicionar Interesse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
