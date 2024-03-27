import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Colors from '../../Config/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import styles from './header.style';

const CustomHeader = ({ title}) => {
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.customheader}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Image source={require('../../assets/back.png')}  color={Colors.Black} style ={{height:20,width:20}} />
      </TouchableOpacity>
      <View style={styles.centerTextContainer}>
      <Text style={styles.customheaderText}>{title}</Text>
      </View>
    </View>
  );
};
export default CustomHeader;
