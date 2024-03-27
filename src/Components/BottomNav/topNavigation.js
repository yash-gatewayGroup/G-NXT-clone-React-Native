import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../../Config/Colors/Colors';
import apiConstants from '../../Config/Api/apiConstants';
import Dashboard from '../../screens/Dashboard/publicNews/dashboard.screen';
import string from '../Strings/Strings';

const TopNavigation = () => {
  const [tabData, setTabData] = useState([]);
  useEffect(() => {
    getHolidayList();
  },);

  const getHolidayList = async () => {
    try {
      const response = await fetch(apiConstants.NEWS_BASE_URL + apiConstants.Category, {
        method: 'GET',
        headers: { 'Authorization': string.Token.apiToken },
      });

      if (response.status === apiConstants.STATUSCODE.SUCCESS) {
        const responseData = await response.json();
        setTabData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const Tab = createMaterialTopTabNavigator();

  if (!tabData || tabData.length === 0) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 40,
          backgroundColor: Colors.SmokyWhite,
        },
        tabBarItemStyle: { width: "auto" },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.Yellow,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          color: Colors.Black,
        },
      }}>
      {tabData.map((tab) => (
        <Tab.Screen
          key={tab.id}
          name={tab.category_name}
          component={Dashboard}
          options={{ tabBarLabel: tab.category_name }}
          initialParams={{ tabname: tab.category_name }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TopNavigation;
