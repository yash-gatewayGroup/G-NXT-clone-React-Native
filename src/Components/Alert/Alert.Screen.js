import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import string from '../Strings/Strings';
import styles from './Alert.Style';

const CustomAlert = ({visible, message, onClose, action, title}) => {
  return (
    <Modal animationType={string.Common.Fade} transparent visible={visible}>
      <View style={styles.mainconatiner}>
        <View style={styles.container}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{title}</Text>
          </View>
          <View style={styles.message_container}>
            <Text style={styles.message_text}>{message}</Text>
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity style={styles.cancel_button} onPress={onClose}>
              <Text style={styles.cancel_text}>{string.Buttons.BtnCancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title_btn_container}
              onPress={action}>
              <Text style={styles.cancel_text}>{title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
