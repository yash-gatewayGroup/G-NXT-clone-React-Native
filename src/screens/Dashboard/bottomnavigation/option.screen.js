import React from 'react';
import { View, StatusBar, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../../../Components/Header/header';
import string from '../../../Components/Strings/Strings';
import Colors from '../../../Config/Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import styles from './bottom.style';

const Options = () => {
  const apiData = [
    { id: '1', text: 'Birthdays', image: require('../../../assets/balloons.png'), screen: "BirthdayList"},
    { id: '2', text: 'Settings',image: require('../../../assets/settings.png'), screen: "Settings" },
    { id: '3', text: 'Holiday List' ,image: require('../../../assets/holidaylist.png'), screen: "HolidayList" },
    { id: '4', text: 'Take a Leave' ,image: require('../../../assets/leave.png'), screen: "Leave" },
    { id: '5', text: 'Events' , image: require('../../../assets/party.png'), screen: "EventList" },
    { id: '6', text: 'Drive to HQ' ,image: require('../../../assets/headquater.png') },
    { id: '7', text: 'Maps' , image: require('../../../assets/party.png'), screen: "MapScreen" },
  ];

  const navigation = useNavigation();
  const rows = [];
  for (let i = 0; i < apiData.length; i += 3) {
    rows.push(apiData.slice(i, i + 3)); 
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.Yellow}
      />
      <Header />
      <FlatList
        data={rows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.gridRow}>
            {item.map((data) => (
              <TouchableOpacity
                key={data.id}
                style={styles.gridItem}
                onPress={() => {
                  navigation.navigate(data.screen);
                }}
              >
               <Image source={data.image} style={styles.gridItemImage} />
                <Text>{data.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default Options;