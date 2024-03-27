import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWebView = () => {
  return (
    <WebView
      source={{uri: 'http://10.0.1.1:3000/vendor/'}}
      style={{flex: 1}}
      javaScriptEnabled={true}
      mediaCapturePermissionGrantType='grant'
    />
  );
};
export default MyWebView;
