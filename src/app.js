import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import MiningScreen from './screens/MiningScreen'
import PoolScreen from './screens/PoolScreen'
import WorkerScreen from './screens/WorkerScreen'
import FinanceScreen from './screens/FinanceScreen'
import PortfolioScreen from './screens/PortfolioScreen'

const HomeTab = createBottomTabNavigator()
const MiningStack = createNativeStackNavigator()
const FinanceStack = createNativeStackNavigator()
const PortfolioStack = createNativeStackNavigator()

const MiningStackScreen = () => (
    <MiningStack.Navigator>
        <MiningStack.Screen name="Mining Dashboard" component={MiningScreen} />
        <MiningStack.Screen name="Mining Pool" component={PoolScreen} options={({ route }) => ({ title: route.params.name })} />
        <MiningStack.Screen name="Worker" component={WorkerScreen} options={({ route }) => ({ title: route.params.name })} />
    </MiningStack.Navigator>
)

const FinanceStackScreen = () => (
    <FinanceStack.Navigator>
        <FinanceStack.Screen name="Financial Services" component={FinanceScreen} />
    </FinanceStack.Navigator>
)

const PortfolioStackScreen = () => (
    <PortfolioStack.Navigator>
        <PortfolioStack.Screen name="Your Portfolio" component={PortfolioScreen} />
    </PortfolioStack.Navigator>
)

export default () => {
    return (
        <NavigationContainer>
            <HomeTab.Navigator screenOptions={{ headerShown: false }}>
                {/* <HomeTab.Screen name="Home" component={HomeScreen} /> */}
                <HomeTab.Screen name="Mining" component={MiningStackScreen} />
                <HomeTab.Screen name="Finance" component={FinanceStackScreen} />
                <HomeTab.Screen name="Wallet" component={PortfolioStackScreen} />
            </HomeTab.Navigator>
        </NavigationContainer>
    )
}