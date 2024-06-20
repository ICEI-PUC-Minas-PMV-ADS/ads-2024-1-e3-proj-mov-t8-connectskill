import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
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
                <Button title="Salvar" onPress={() => editarInteresse(item.id, editingValue)} />
              </>
            ) : (
              <>
                <Text style={styles.itemText}>{item.interesse}</Text>
                <View style={styles.buttonGroup}>
                  <Button title="Deletar" onPress={() => deletarInteresse(item.id)} />
                  <Button title="Editar" onPress={() => {
                    setEditingId(item.id);
                    setEditingValue(item.interesse);
                  }} />
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
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Interesse" onPress={adicionarInteresse} />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
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
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 5,
  },
});
