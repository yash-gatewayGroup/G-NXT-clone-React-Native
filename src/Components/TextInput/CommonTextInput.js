import React from 'react';
import {TextInput} from 'react-native';
import string from '../Strings/Strings';
import styles from './CommonTextInput.Style';

const CommonTextInput = ({value,onChangeText,Type,mlength,secure,style,returnType,editable}) => {
  return (
    <TextInput
      style={[styles.textinput, style]}
      autoCapitalize={string.Common.None}
      value={value}
      onChangeText={onChangeText}
      keyboardType={Type}
      maxLength={mlength}
      secureTextEntry={secure}
      returnKeyType={returnType}
      editable={editable}
    />
  );
};

export default CommonTextInput;
