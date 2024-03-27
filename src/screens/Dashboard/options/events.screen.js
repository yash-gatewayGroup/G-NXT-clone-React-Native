import React,{ useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import Header from '../../../Components/Header/header';
import string from '../../../Components/Strings/Strings';
import { useNavigation } from '@react-navigation/native';

const Events = () => {

  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      string.BackHandler.BackPress,
      backAction,
    );
    return () => backHandler.remove();
  }, []); 

  return (
    <View>
      <Header />
      <Text>Events</Text>
    </View>
  );
};

export default Events;