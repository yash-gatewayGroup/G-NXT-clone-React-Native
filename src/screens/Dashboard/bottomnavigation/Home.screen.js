import React from 'react';
import { StatusBar, View } from 'react-native';
import Header from '../../../Components/Header/header';
import Colors from '../../../Config/Colors/Colors';
import string from '../../../Components/Strings/Strings';
import TopNavigation from '../../../Components/BottomNav/topNavigation';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.Yellow}
      />
      <Header />
      <TopNavigation />
    </View>
  );
}
export default Home;
