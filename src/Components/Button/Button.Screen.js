//import liraries
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Button.Style';

// create a component
const Button = props => {
    return(
      <TouchableOpacity style={[styles.loginbtn,props.style]}
        onPress={props.onPress}>
        <Text style={[styles.loginbtntext,props.txtstyle]}>{props.text}</Text>
      </TouchableOpacity>
    )
  }

//make this component available to the app
export default Button;
