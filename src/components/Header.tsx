import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons'

import { HeaderProps } from '../interfaces'
import { useNavigation } from '@react-navigation/native';

export default function Header({ title, showCancel = true }: HeaderProps){
    const navigation = useNavigation();

    function handleClose(){
        navigation.navigate('home')
    }

  return (
      <View style={styles.container}>
        <BorderlessButton
            onPress={ navigation.goBack }
        >
            <Feather name="arrow-left" size={20} color="#A100FF"/>
        </BorderlessButton>

        <Text style={styles.title}>{title}</Text>
        { showCancel ? (
            <BorderlessButton
                onPress={handleClose}
            >
                <Feather name="x" size={20} color="#A100FF"/>
            </BorderlessButton>
        ) : (
            <View></View>
        )}
          
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
       padding: 24,
       backgroundColor: '#f9fafc',
       borderBottomWidth: 1,
       borderColor: '#dde3f0',
       paddingTop: 44,
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center'
    },
    title: {
        color: '#797979',
        fontSize: 18
    }
})

