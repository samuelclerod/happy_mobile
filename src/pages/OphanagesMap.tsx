import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons';


import mapMarker from '../images/map-marker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
    // about: string
    // instructions: string
    // opening_hours: string
    // open_on_weekends: boolean
    // images: Array<{
    //     url: string
    //     id: string
    // }>
}

export default function OphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data)
        })
    });

    const navigation = useNavigation()

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -7.2259745,
                    longitude: -39.3276117,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.018,
                }}>
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
                <RectButton style={styles.createOphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: "center",
    },

    calloutText: {
        color: '#0089a5',
        fontSize: 14,

        fontFamily: 'Nunito_700Bold'
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        // bottom: Dimensions.get('window').height * 0.1,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        color: '#8fa7b3',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },

    createOphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
});
