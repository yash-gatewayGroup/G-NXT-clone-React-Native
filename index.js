/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebase } from '@react-native-firebase/app';

if (!firebase.apps.length) {
    const secondaryFirebaseConfig = {
        apiKey: 'AIzaSyDFoL7oAMUajEsK5Heb5CD7WaQi4_yCoko',
        authDomain: 'gateway-prayas-d554f',
        projectId: '',
        databaseURL: '',
        storageBucket: 'gateway-prayas-d554f.appspot.com',
        messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
        appId: '1:340719472590:android:f4ae1690097c52e5fbe59f',
    };
    const secondaryApp = firebase.initializeApp(secondaryFirebaseConfig, {
        name: 'SECONDARY_APP',
    });
    const app = initializeApp(firebaseConfig);
    const messaging = messaging(app);
    onBackgroundMessage(messaging, (payload) => {
        console.log('Received background message:', payload);
    });
    secondaryApp
        .messaging()
        .requestPermission()
        .then(() => {
            return secondaryApp.messaging().getToken();
        })
        .then((token) => {
            const unsubscribe = secondaryApp.messaging().onNotificationOpenedApp((remoteMessage) => {
                console.log('Notification opened:', remoteMessage);
            });
            return () => unsubscribe();
        })
        .catch((error) => {
            console.error('FCM Token Error:', error);
        });
}
AppRegistry.registerComponent(appName, () => App);
