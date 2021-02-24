import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from  'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import PinInsert from '../images/Pin.png';
import { useNavigation } from '@react-navigation/native';

import { IInitialMarker, IAllUnits } from '../interfaces';
import { getData } from '../service';


export default function Home() {

  const navigation = useNavigation()

  const [ allUnits, setAllUnits ] = useState<IAllUnits[]>([]);
  const [ initialMapMarker, setInitialMapMarker ] = useState<IInitialMarker>({
    latitude: -23.628949249999998,
    longitude: -46.71006813701569,
    latitudeDelta: 0.0008,
    longitudeDelta: 0.0008,
  })

  useEffect(() => {
    getData.get('all').then(
      response => {
        setAllUnits(response.data)
      }
    )
  }, [])

  navigator.geolocation.getCurrentPosition( 
    position => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      
    }
  )

  function handlePageDetails(id: number){
      navigation.navigate('accenture', { id })
  }


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={ initialMapMarker }
      >

        { allUnits.map( unit => (
          <View key={unit.id}>
            <Marker
              icon={PinInsert}
              coordinate={{
                latitude: unit.latitude,
                longitude: unit.longitude
              }}
            >
              <Callout
                tooltip={true}
                onPress={ () => handlePageDetails(unit.id) }
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{ unit.name }</Text>
                </View>
              </Callout>
            </Marker>
          </View>
        )) }

        
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{ initialMapMarker.latitude }</Text>
        <RectButton style={styles.findButton}>
          <Feather name="search" size={20} color={"#fff"}/>
        </RectButton>
      </View>
    </View>

  );
} 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
    },
    calloutText: {
      color: '#A100FF',
      textAlign: 'center',
      fontSize: 14
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 24,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerText: {
      color: '#8fa7b3'
    },
    findButton: {
      height: 56,
      width: 56,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#A100FF'
    }
  
  });
