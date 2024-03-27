import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './splashscreenstyle';
import string from '../../../Components/Strings/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const navigation = useNavigation();
  
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('isLoggedIn').then((data) => {
        if (data) {
          navigation.replace('BottomNavigator', { screen: 'Home' });
        } else {
          navigation.replace(string.Navigations.Login);
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/Gnxt.png')} style={styles.image} />
      </View>
    </View>
  );
}