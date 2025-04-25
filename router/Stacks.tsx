import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenView from "../screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import QuizConfigScreen from '../screens/QuizConfigScreen';
import QuizScreen from '../screens/QuizScreen';
import SchoolSelectionScreen from '../screens/SchoolSelectionScreen';
import ScoreScreen from '../screens/ScoreScreen';
import { RootStackParamList } from './stack.interface';
import Header from '../components/molecules/Header';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
    // showQuiz ? 'Uniquiz' :
    //   showLogin ? 'Iniciar Sesión' :
    //     showScore ? 'Resultados' :
    //       showProfileEdit ? 'Editar Perfil' : 'Uniquiz'
export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.surface,
      },
      contentStyle: {
        backgroundColor: colors.background,
      }
    }} initialRouteName="Home" id={undefined}>
      <Stack.Screen options={{
        header: () => <Header showMenu title='Home' ></Header>
      }} name="Home" component={HomeScreenView} />
      <Stack.Screen options={{
        header: () => <Header showBack title='Selecciona Universidad' ></Header>
      }} name="SchoolSelection" component={SchoolSelectionScreen}></Stack.Screen>
      <Stack.Screen options={{
        header: () => <Header showMenu title='Configura tu Quiz' ></Header>
      }} name="QuizConfig" component={QuizConfigScreen}></Stack.Screen>
      {/* <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen> */}
      {/* <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}></Stack.Screen>
      <Stack.Screen name="Quiz" component={QuizScreen}></Stack.Screen> */}
      {/* <Stack.Screen name="Score" component={ScoreScreen}></Stack.Screen> */}
    </Stack.Navigator>
  );
}
