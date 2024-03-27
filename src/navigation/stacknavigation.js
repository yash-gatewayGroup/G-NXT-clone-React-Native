import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../screens/Login/Login.screen';
import AppNavigator from './BottomNavigator';
import HolidayList from '../screens/Dashboard/options/holidayList.screen';
import BirthdayList from '../screens/Dashboard/options/birthdayList.screen';
import Events from '../screens/Dashboard/options/events.screen';
import Leave from '../screens/Dashboard/options/leave.screen';
import Settings from '../screens/Dashboard/options/settings.screen';
import ApplyLeave from '../screens/Dashboard/options/applyLeave.screen';
import ApplyWorkFromHome from '../screens/Dashboard/options/applyWorkFromHome';
import ApplyOutofOffice from '../screens/Dashboard/options/applyOutofOffice.screen';
import CreatePost from '../screens/Dashboard/bottomnavigation/CreatePost/createPost.screen';
import NotificationDetails from '../screens/Dashboard/notificationDetails/notificationDetail.screen';
// import QRCodeScannerScreen from '../screens/Dashboard/bottomnavigation/QrCodeScanner/QrCodeScanner.screen';
import QRCodeScannerScreen from '../screens/Dashboard/bottomnavigation/QrCodeScanner/Webview';
import SplashScreen from '../screens/Dashboard/splashScreen/splashscreen';
import VideoScreen from '../Components/Video/videoScreen';
import MapScreen from '../screens/Dashboard/options/Map.screen';
import ChooseLocation from '../screens/Dashboard/options/chooseLocation.screen';

const stack = createNativeStackNavigator();
export function MyStack() {
  return (
    <NavigationContainer>
      <stack.Navigator >
      <stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
        <stack.Screen name="BottomNavigator" component={AppNavigator} options={{ headerShown: false }} />
        <stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }} />
        <stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
        <stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{ headerShown: false }}  />
        <stack.Screen name="VideoScreen" component={VideoScreen} options={{ headerShown: false }}  />

        {/* Options Screen */}
        <stack.Screen name="HolidayList" component={HolidayList} options={{ headerShown: false }} />
        <stack.Screen name="BirthdayList" component={BirthdayList} options={{ headerShown: false }} />
        <stack.Screen name="EventList" component={Events} options={{ headerShown: false }} />
        <stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <stack.Screen name="Leave" component={Leave} options={{ headerShown: false }} />
        <stack.Screen name="ApplyLeave" component={ApplyLeave} options={{ headerShown: false }} />
        <stack.Screen name="ApplyWorkFromHome" component={ApplyWorkFromHome} options={{ headerShown: false }} />
        <stack.Screen name="ApplyOutofOffice" component={ApplyOutofOffice} options={{ headerShown: false }} />
        <stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        <stack.Screen name="chooseLocation" component={ChooseLocation} options={{ headerShown: false }} />

      </stack.Navigator>
    </NavigationContainer>
  );
};
