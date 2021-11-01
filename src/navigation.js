import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TestScreen1, TestScreen2 } from './Screens/TestScreen'

const Stack = createNativeStackNavigator();

export default Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Test1" component={TestScreen1} />
            <Stack.Screen name="Test2" component={TestScreen2} />
        </Stack.Navigator>
    </NavigationContainer>
)