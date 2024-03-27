import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Dashboard/bottomnavigation/Home.screen'; 
import Options from '../screens/Dashboard/bottomnavigation/option.screen'; 
import { BottomNav } from '../Components/BottomNav/BottomNav'; 
import Notification from '../screens/Dashboard/bottomnavigation/notification.screen';
import Refreshment from '../screens/Dashboard/bottomnavigation/refreshment.screen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator tabBar={() => <BottomNav />}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Options" component={Options} options={{ headerShown: false }}/>
        <Tab.Screen name="Notifications" component={Notification} options={{ headerShown: false }}/>
        <Tab.Screen name="Refreshment" component={Refreshment} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
};

export default AppNavigator;
