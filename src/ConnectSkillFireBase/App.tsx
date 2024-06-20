import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Login from './app/telas/Login';
import Register from './app/telas/Register';
import List from './app/telas/List';
import Perfil from './app/telas/Perfil';
import Skills from './app/telas/Skills';
import ConnectList from './app/telas/ConnectList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TooltipButton = ({ message }: { message: string }) => (
  <TouchableOpacity onPress={() => Alert.alert('Info', message)}>
    <Ionicons name="information-circle-outline" size={24} color="black" style={{ marginRight: 15 }} />
  </TouchableOpacity>
);

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Connect') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Meus Interesses') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Minhas Habilidades') {
            iconName = focused ? 'hammer' : 'hammer-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = undefined as any;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight: () => {
          const message = route.name === 'Connect'
            ? 'Aqui você pode conectar com outros usuários, visualizar interesses e habilidades deles.'
            : route.name === 'Meus Interesses'
              ? 'Nesta aba, você pode adicionar, editar e remover seus interesses.'
              : route.name === 'Minhas Habilidades'
                ? 'Nesta aba, você pode adicionar, editar e remover suas habilidades.'
                : route.name === 'Perfil'
                  ? 'Nesta aba, você pode visualizar e editar seu perfil, bem como sair da conta.'
                  : '';
          return <TooltipButton message={message} />;
        },
      })}
    >
      <Tab.Screen name="Connect" component={ConnectList} />
      <Tab.Screen name="Meus Interesses" component={List} />
      <Tab.Screen name="Minhas Habilidades" component={Skills} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("usuario: ", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
