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

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="SchoolSelection" id={undefined}>
      {/* <Stack.Screen name="Home" component={HomeScreenView} />
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}></Stack.Screen>
      <Stack.Screen name="QuizConfig" component={QuizConfigScreen}></Stack.Screen>
      <Stack.Screen name="Quiz" component={QuizScreen}></Stack.Screen> */}
      <Stack.Screen name="SchoolSelection" component={SchoolSelectionScreen}></Stack.Screen>
      {/* <Stack.Screen name="Score" component={ScoreScreen}></Stack.Screen> */}
    </Stack.Navigator>
  );
}
