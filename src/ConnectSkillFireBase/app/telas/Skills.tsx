import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { collection, Firestore, addDoc, deleteDoc, doc, onSnapshot, getDocs, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface Skill {
  id: string;
  habilidade: string;
}

/**
 * Componente de lista de habilidades.
 * 
 * @param navigation - Objeto de navegação utilizado para navegar entre as telas.
 * @returns O componente de lista de habilidades.
 */
const Skills = ({ navigation }: RouterProps) => {
  const [habilidades, setHabilidades] = useState<Skill[]>([]);
  const [novaHabilidade, setNovaHabilidade] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const firestore: Firestore = FIREBASE_DB;

  useEffect(() => {
    /**
     * Busca as habilidades do usuário atual no Firestore.
     * 
     * @returns Uma função de cancelamento que pode ser usada para parar de ouvir as atualizações das habilidades.
     */
    const unsubscribe = onSnapshot(
      collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser!.uid, 'Habilidades'),
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

    return () => unsubscribe();
  }, []);

  const MAX_SKILLS = 5; // Define o número máximo de habilidades permitido

  const adicionarHabilidade = async () => {
    if (novaHabilidade.trim().length > 0 && FIREBASE_AUTH.currentUser?.uid) {
      try {
        // Busca o número atual de habilidades
        const currentSkillsSnapshot = await getDocs(collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Habilidades'));
        const currentNumberOfSkills = currentSkillsSnapshot.docs.length;

        // Verifica se o limite foi atingido
        if (currentNumberOfSkills < MAX_SKILLS) {
          // Adiciona a nova habilidade se estiver abaixo do limite
          await addDoc(collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Habilidades'), {
            habilidade: novaHabilidade
          });
          setNovaHabilidade("");
        } else {
          console.error("Limite de habilidades atingido.");
        }
      } catch (error) {
        console.error("Erro ao adicionar habilidade:", error);
      }
    } else {
      console.error("Erro ao adicionar habilidade: usuário não autenticado ou uid indefinido");
    }
  };

  const editarHabilidade = async (habilidadeId: string, novoValor: string) => {
    if (novoValor.trim().length > 0 && FIREBASE_AUTH.currentUser?.uid && habilidadeId) {
      try {
        const habilidadeRef = doc(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Habilidades', habilidadeId);
        await updateDoc(habilidadeRef, {
          habilidade: novoValor
        });
        setEditingId(null);
        setEditingValue("");
      } catch (error) {
        console.error("Erro ao editar habilidade:", error);
      }
    } else {
      console.error("Erro ao editar habilidade: usuário não autenticado, uid indefinido, ou id da habilidade indefinido");
    }
  };

  const deletarHabilidade = async (id: string) => {
    if (FIREBASE_AUTH.currentUser?.uid) {
      try {
        await deleteDoc(doc(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Habilidades', id));
      } catch (error) {
        console.error("Erro ao deletar habilidade:", error);
      }
    } else {
      console.error("Usuário não autenticado ou uid indefinido");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={habilidades}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editingValue}
                  onChangeText={setEditingValue}
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => editarHabilidade(item.id, editingValue)}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.itemText}>{item.habilidade}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deletarHabilidade(item.id)}>
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={() => {
                    setEditingId(item.id);
                    setEditingValue(item.habilidade);
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
        value={novaHabilidade}
        onChangeText={setNovaHabilidade}
        placeholder="Adicionar nova habilidade"
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={adicionarHabilidade}>
        <Text style={styles.buttonText}>Adicionar Habilidade</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Skills;

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
