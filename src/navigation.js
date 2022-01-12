import React from 'react'
import { capitalize } from 'lodash'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faExchangeAlt, faWallet, faBars, faPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen'
import MiningScreen from './screens/MiningScreen'
import MiningPoolScreen from './screens/MiningPoolScreen'
import MiningWorkerScreen from './screens/MiningWorkerScreen'
import FinanceScreen from './screens/FinanceScreen'
import PortfolioScreen from './screens/PortfolioScreen'
import DrawerScreen from './screens/DrawerScreen'
import MiningAccountScreen from './screens/MiningAccountScreen'
import Button from './components/Button'
import MiningAccountAddScreen from './screens/MiningAccountAddScreen'
import MiningProvider from './components/MiningProvider'
import WalletAddScreen from './screens/WalletAddScreen'
import ServiceApiAddScreen from './screens/ServiceApiAddScreen'
import ServiceApiScreen from './screens/ServiceApiScreen'
import { Platform, Text } from 'react-native'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = createNativeStackNavigator()
const MiningStack = createNativeStackNavigator()
const FinanceStack = createNativeStackNavigator()
const PortfolioStack = createNativeStackNavigator()

const HeaderBtn = ({ onPress, icon }) => (
    <Button onPress={onPress}>
        <FontAwesomeIcon icon={icon} size={20} />
    </Button>
)

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="Overview"
            component={HomeScreen}
        />
    </HomeStack.Navigator>
)

const FinanceStackScreen = () => (
    <FinanceStack.Navigator>
        <FinanceStack.Screen
            name="Financial Services"
            component={FinanceScreen}
            options={({ navigation }) => ({
                headerLeft: () => Platform.OS == 'ios' ? (
                    <HeaderBtn onPress={() => navigation.push('Account')} icon={faUserCircle} />
                ) : (
                    <HeaderBtn onPress={() => navigation.openDrawer()} icon={faBars} />
                )
            })}
        />
    </FinanceStack.Navigator>
)

const MiningStackScreen = () => (
    <MiningProvider>
        <MiningStack.Navigator>
            <MiningStack.Screen
                name="Mining Dashboard"
                component={MiningScreen}
                options={({ navigation }) => ({
                    headerLeft: () => Platform.OS == 'ios' ? (
                            <HeaderBtn onPress={() => navigation.push('Account')} icon={faUserCircle} />
                        ) : (
                            <HeaderBtn onPress={() => navigation.openDrawer()} icon={faBars} />
                        ),
                    headerRight: () => (
                        <HeaderBtn
                            onPress={() => navigation.push('Add Mining Account')}
                            icon={faPlus}
                        />
                    )
                })}
            />
            <MiningStack.Screen
                name="Mining Pool"
                component={MiningPoolScreen}
                options={({ route }) => ({ title: `${capitalize(route.params.name)} Pool` })}
            />
            <MiningStack.Screen
                name="Mining Worker"
                component={MiningWorkerScreen}
                options={({ route }) => ({ title: capitalize(route.params.name) })}
            />
            <MiningStack.Screen
                name="Mining Accounts"
                component={MiningAccountScreen}
                options={({ navigation }) => ({
                    title: `Mining Accounts`,
                    headerRight: () => (
                        <HeaderBtn
                            onPress={() => navigation.push('Add Mining Account')}
                            icon={faPlus}
                        />
                    )
                })}
            />
            <MiningStack.Screen
                name="Add Mining Account"
                component={MiningAccountAddScreen}
            />
        </MiningStack.Navigator>
    </MiningProvider>
)

const PortfolioStackScreen = () => (
    <PortfolioStack.Navigator>
        <PortfolioStack.Screen
            name="My Portfolio"
            component={PortfolioScreen}
            options={({ navigation }) => ({
                headerLeft: () => Platform.OS == 'ios' ? (
                    <HeaderBtn onPress={() => navigation.push('Account')} icon={faUserCircle} />
                ) : (
                    <HeaderBtn onPress={() => navigation.openDrawer()} icon={faBars} />
                )
            })}
        />
        <PortfolioStack.Screen
            name="Add Crypto Wallet"
            component={WalletAddScreen}
        />
        <PortfolioStack.Screen
            name="Add Service API"
            component={ServiceApiAddScreen}
        />
        <PortfolioStack.Screen
            name="Service APIs"
            component={ServiceApiScreen}
            options={({ route }) => ({ 
                title: `${route.params.type} APIs`,
                headerRight: () => (
                    <HeaderBtn
                        onPress={() => navigation.push('Add Service API')}
                        icon={faPlus}
                    />
                )
            })}
        />
    </PortfolioStack.Navigator>
)

const TabIcons = {
    'Home': faCoffee,
    'Mining': faCoffee,
    'Finance': faExchangeAlt,
    'Portfolio': faWallet
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
        {/* <Tab.Screen name="Home" component={HomeStackScreen} /> */}
        <Tab.Screen name="Mining" component={MiningStackScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioStackScreen} />
        {/* <Tab.Screen name="Finance" component={FinanceStackScreen} /> */}
    </Tab.Navigator>
)

export default Navigation = () => {
    return Platform.OS == 'ios' ? (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Account"
                    component={DrawerScreen}
                    options={({ navigation }) => ({ 
                        presentation: 'formSheet',
                        headerRight: () => (
                            <Button onPress={() => navigation.goBack()}>
                                <Text>Done</Text>
                            </Button>
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
                <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}