import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const Perfil = () => {
  const usuario = FIREBASE_AUTH.currentUser;

  return (
    <View style={styles.container}>
      <Text>Email: {usuario?.email}</Text>
    </View>
  );
}

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#d1e4ef"
  },
});
