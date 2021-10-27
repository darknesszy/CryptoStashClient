import React from 'react'
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './screens/HomeScreen'
import MiningScreen from './screens/MiningScreen'
import PoolScreen from './screens/PoolScreen'
import WorkerScreen from './screens/WorkerScreen'
import FinanceScreen from './screens/FinanceScreen'
import PortfolioScreen from './screens/PortfolioScreen'
import DrawerScreen from './screens/DrawerScreen'
import AuthScreen from './screens/AuthScreen'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = createNativeStackNavigator()
const MiningStack = createNativeStackNavigator()
const FinanceStack = createNativeStackNavigator()
const PortfolioStack = createNativeStackNavigator()

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen 
            name="Home" 
            component={HomeScreen}
            options={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableHighlight onPress={() => navigation.openDrawer()}>
                        <Text>三</Text>
                    </TouchableHighlight>
                ),
            })}
        />
    </HomeStack.Navigator>
)

const MiningStackScreen = () => (
    <MiningStack.Navigator>
        <MiningStack.Screen 
            name="Mining Dashboard" 
            component={MiningScreen}
            options={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableHighlight onPress={() => navigation.openDrawer()}>
                        <Text>三</Text>
                    </TouchableHighlight>
                ),
            })}
        />
        <MiningStack.Screen name="Mining Pool" component={PoolScreen} options={({ route }) => ({ title: route.params.name })} />
        <MiningStack.Screen name="Worker" component={WorkerScreen} options={({ route }) => ({ title: route.params.name })} />
    </MiningStack.Navigator>
)

const FinanceStackScreen = () => (
    <FinanceStack.Navigator>
        <FinanceStack.Screen
            name="Financial Services"
            component={FinanceScreen}
            options={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableHighlight onPress={() => navigation.openDrawer()}>
                        <Text>三</Text>
                    </TouchableHighlight>
                ),
            })}
        />
    </FinanceStack.Navigator>
)

const PortfolioStackScreen = () => (
    <PortfolioStack.Navigator>
        <PortfolioStack.Screen
            name="Your Portfolio"
            component={PortfolioScreen}
            options={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableHighlight onPress={() => navigation.openDrawer()}>
                        <Text>三</Text>
                    </TouchableHighlight>
                ),
            })}
        />
    </PortfolioStack.Navigator>
)

const TabNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        {/* <Tab.Screen name="Home Stack" component={HomeStackScreen} /> */}
        {/* <Tab.Screen name="Test" component={DrawerScreen} /> */}
        <Tab.Screen name="Mining" component={MiningStackScreen} />
        <Tab.Screen name="Finance" component={FinanceStackScreen} />
        <Tab.Screen name="Wallet" component={PortfolioStackScreen} />
    </Tab.Navigator>
)

export default Navigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
                <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                <Drawer.Screen name="Authentication" component={AuthScreen} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}