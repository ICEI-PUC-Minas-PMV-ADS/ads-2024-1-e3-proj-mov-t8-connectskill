import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; // Import the NavigationContainer component
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/telas/Login';
import List from './app/telas/List';
import Perfil from './app/telas/Perfil';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';

//TODO: passar as stacks para arquivos separados

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function Inside() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Lista de Interesses" component={List} />
      <InsideStack.Screen name="Perfil" component={Perfil} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("usuario: ", user);
      setUser(user);
    } );
  } , []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        { user ? (
          <Stack.Screen name="Inside" component={Inside} options={{headerShown: false}} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
