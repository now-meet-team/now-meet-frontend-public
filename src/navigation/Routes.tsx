import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../screens/Home/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShadowVisible: true,
            headerTitle: 'asd',

            headerLeft: () => (
              <Button onPress={() => {}} title="<" color="red" />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
