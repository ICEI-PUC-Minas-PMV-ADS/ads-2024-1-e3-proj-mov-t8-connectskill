import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { collection, Firestore, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'

//TODO: passar as interfaces para arquivos separados

interface RouterProps {
  navigation: NavigationProp<any, any>
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

    /**
     * adiciona um novo interesse ao usuário autenticado.
     * 
     * @returns {Promise<void>} Promise vazia.
     */
    const adicionarInteresse = async () => {
        if (novoInteresse.trim().length > 0 && FIREBASE_AUTH.currentUser?.uid) {
            try {
                await addDoc(collection(firestore, 'Usuarios', FIREBASE_AUTH.currentUser.uid, 'Interesses'), {
                    interesse: novoInteresse
                });
                setNovoInteresse("");
            } catch (error) {
                console.error("erro ao adicionar interesse:", error);
            }
        } else {
            console.error("erro ao adicionar interesse: usuário nao autenticado ou uid indefinido");
        }
    };

    /**
     * deleta um interesse do usuário atual.
     * 
     * @param id - O ID do interesse a ser deletado.
     */
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
                        <Text>{item.interesse}</Text>
                            <Button title="Deletar" onPress={() => deletarInteresse(item.id)} />
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
            <View style={styles.buttonContainer}>
                <Button title='Perfil' onPress={() => navigation.navigate('Perfil')} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Sair' color={"grey"} onPress={() => FIREBASE_AUTH.signOut()} />
            </View>
        </View>
    );
}

export default List

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
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