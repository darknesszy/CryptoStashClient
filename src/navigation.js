import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { TestScreen1, TestScreen2 } from './Screens/TestScreen'

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Test = createNativeStackNavigator()

const TestStack = () => (
    <Test.Navigator>
        <Test.Screen name="Test1" component={TestScreen1} />
        <Test.Screen name="Test2" component={TestScreen2} />
    </Test.Navigator>
)

const TabNavigation = () => (
    <Tab.Navigator>
        <Tab.Screen name="Test Stack" component={TestStack} />
    </Tab.Navigator>
)

export default Navigation = () => (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Tabs" component={TabNavigation} />
        </Drawer.Navigator>
    </NavigationContainer>
)