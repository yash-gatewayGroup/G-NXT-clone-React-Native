import React,{useEffect} from 'react';
import { View, StyleSheet,BackHandler } from 'react-native';
import Video from 'react-native-video';
import { loader } from '../Loader/SimpleLoader';
import { useNavigation } from '@react-navigation/native';
import string from '../Strings/Strings';

const VideoScreen = ({ route }) => {
    const videoUri = route.params.videoUri;
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
          navigation.goBack();
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          string.BackHandler.BackPress,
          backAction,
        );
        return () => backHandler.remove();
      }, []);

    return (
        <>
            {videoUri != '' ?
                (<View style={styles.container}>
                    <Video
                        source={{ uri: videoUri }}
                        style={styles.video}
                        controls={true}
                        resizeMode="contain"
                        allowsExternalPlayback={true}
                        disableFocus={true}
                        playInBackground={true}
                        volume={1.0}
                    />
                </View>
                ) : loader()}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        aspectRatio: 2 / 3,
    },
});

export default VideoScreen;
