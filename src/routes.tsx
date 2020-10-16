
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'


import OphanagesMap from './pages/OphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

const { Navigator, Screen } = createStackNavigator()

const routes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="OrphanagesMap" component={OphanagesMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} />
            </Navigator>
        </NavigationContainer>
    );
}

export default routes;
