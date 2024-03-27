import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './header.style';
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{"G-NXT"}</Text>
    </View>
  );
};
export default Header;
