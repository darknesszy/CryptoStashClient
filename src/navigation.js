import React from 'react'
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faExchangeAlt, faWallet, faBars, faPlus } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen'
import MiningScreen from './screens/MiningScreen'
import PoolScreen from './screens/PoolScreen'
import WorkerScreen from './screens/WorkerScreen'
import FinanceScreen from './screens/FinanceScreen'
import PortfolioScreen from './screens/PortfolioScreen'
import DrawerScreen from './screens/DrawerScreen'
import PoolAccountScreen from './screens/PoolAccountScreen'
import Button from './components/Button'
import PoolAccountAddScreen from './screens/PoolAccountAddScreen'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = createNativeStackNavigator()
const MiningStack = createNativeStackNavigator()
const FinanceStack = createNativeStackNavigator()
const PortfolioStack = createNativeStackNavigator()

const DrawerButton = ({ nav }) => (
    <Button onPress={() => nav.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={24} />
    </Button>
)

const HeaderBtn = ({ onPress, icon }) => (
    <Button onPress={onPress}>
        <FontAwesomeIcon icon={icon} size={20} />
    </Button>
)

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
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
                    <HeaderBtn 
                        onPress={() => navigation.openDrawer()} 
                        icon={faBars}
                    />
                )
                // headerLeft: () => <DrawerButton nav={navigation} />,
            })}
        />
        <MiningStack.Screen 
            name="Mining Pool" 
            component={PoolScreen} 
            options={({ route }) => ({ title: route.params.name })} 
        />
        <MiningStack.Screen 
            name="Worker" 
            component={WorkerScreen} 
            options={({ route }) => ({ title: route.params.name })}
        />
        <MiningStack.Screen 
            name="Pool Accounts" 
            component={PoolAccountScreen} 
            options={({ route, navigation }) => ({ 
                title: `${route.params.name} Accounts`,
                headerRight: () => (
                    <HeaderBtn 
                        onPress={() => navigation.push('New Account', route.params)} 
                        icon={faPlus}
                    />
                )
            })}
        />
        <MiningStack.Screen 
            name="New Account" 
            component={PoolAccountAddScreen} 
        />
    </MiningStack.Navigator>
)

const FinanceStackScreen = () => (
    <FinanceStack.Navigator>
        <FinanceStack.Screen
            name="Financial Services"
            component={FinanceScreen}
            options={({ navigation }) => ({
                headerLeft: () => <DrawerButton nav={navigation} />,
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
                headerLeft: () => <DrawerButton nav={navigation} />,
            })}
        />
    </PortfolioStack.Navigator>
)

const TabIcons = {
    'Mining': faCoffee,
    'Finance': faExchangeAlt,
    'Wallet': faWallet
}

const TabNavigator = () => (
    <Tab.Navigator 
        screenOptions={({ route }) => ({ 
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <FontAwesomeIcon 
                    icon={TabIcons[route.name]}
                    color={focused ? 'orange' : 'lightgrey'}
                    size={24}
                />
            ),
            tabBarActiveTintColor: 'orange',
        })}
    >
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
            </Drawer.Navigator>
        </NavigationContainer>
    )
}