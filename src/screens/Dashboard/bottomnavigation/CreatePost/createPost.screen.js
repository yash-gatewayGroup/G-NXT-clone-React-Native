import React, { useRef, useState } from 'react';
import { View, ScrollView, TextInput, StatusBar, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import Colors from '../../../../Config/Colors/Colors';
import CustomHeader from '../../../../Components/Header/customHeader';
import string from '../../../../Components/Strings/Strings';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Button from '../../../../Components/Button/Button.Screen';
import styles from './createPost.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePost = () => {
  const richText = useRef(null);
  const [mediaType, setMediaType] = useState('photo');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSelectAction = async (action) => {
    setModalVisible(false);
    if (action === 'camera') {
      try {
        const granted = await request(
          PERMISSIONS.ANDROID.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        if (granted === RESULTS.GRANTED) {
          if (mediaType === 'photo') {
            ImageCropPicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            })
              .then((image) => {
                setSelectedImage(image.path);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            ImageCropPicker.openCamera({
              mediaType: 'video',
              compressVideoPreset: 'MediumQuality',
            })
              .then((video) => {
                setSelectedVideo(video.path);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (action === 'gallery') {
      try {
        const granted = await request(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE && PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your Storage',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        if (granted === RESULTS.GRANTED) {
          if (mediaType === 'photo') {
            ImageCropPicker.openPicker({
              width: "50%",
              height: "50%",
              cropping: true,
            })
              .then((image) => {
                setSelectedImage(image.path);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            ImageCropPicker.openPicker({
              mediaType: 'video',
            })
              .then((video) => {
                setSelectedVideo(video.path);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleLoginPress = async => {
    console.log("title", title);
    console.log("description", description);
    console.log("selectedVideo", selectedVideo);
    console.log("selectedImage", selectedImage);
    const savedUser = AsyncStorage.getItem(string.Auth.Current_User_Id);
    setUserId(savedUser);
    const params = {
      userId: userId,
      title:title,
      description: description,
      newstype: mediaType === 'video' ? 'video' : 'photo',
      newsvideo: mediaType === 'video' ? selectedVideo : undefined,
      newsimage: mediaType === 'photo' ? selectedImage : undefined,
    };

    try {
      const response = fetch('https://demo.thegatewaycorp.com/gnnapistaging/wp-json/wp/v2/savemynews', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': string.Token.apiToken
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        ToastAndroid.show('Post Created Successfully', ToastAndroid.LONG);
      } else {
        const errorData =  response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditorChange = (content) => {
    setDescription(content);
  };
  
  return (
    <>
      <CustomHeader title={"Create a Post"} />
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.SmokyWhite}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.titleContainer}
          placeholder='Title'
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionSubContainer}>
            <ScrollView>
              <RichEditor
                ref={richText}
                initialHeight={250}
                style={styles.editor}
                placeholder='Description'
                onChange={handleEditorChange}
              />
            </ScrollView>
            <RichToolbar
              style={styles.toolbar}
              editor={richText}
              actions={['undo', 'redo', 'bold', 'italic', 'underline', 'justifyCenter', 'justifyRight', 'justifyFull', 'line', 'link', 'outdent', 'keyboard']}
            />
          </View>
        </View>
        <View>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => handleSelectAction('camera')} style={styles.popupOption}>
                  <Text style={styles.popupOptionText}>Capture from Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSelectAction('gallery')} style={styles.popupOption}>
                  <Text style={styles.popupOptionText}>Open from Gallery</Text>
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.popupOption}>
                  <Text style={styles.popupOptionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.postText}>Post Type:</Text>
          <View style={styles.radioContainer}>
            <RadioButton.Group
              onValueChange={(value) => setMediaType(value)}
              value={mediaType} >
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButton}>
                  <Text style={styles.optionText}>Photo</Text>
                  <RadioButton value="photo" uncheckedColor={Colors.Yellow} color={Colors.Yellow} />
                </View>
                <View style={styles.radioButton}>
                  <Text style={styles.optionText}>Video</Text>
                  <RadioButton value="video" uncheckedColor={Colors.Yellow} color={Colors.Yellow} />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {mediaType === 'video' && (
            <TouchableOpacity onPress={handleOpenModal}>
              {selectedVideo ?
                <View style={styles.descriptionContainer}>
                  <Video
                    source={{ uri: selectedVideo }}
                    style={styles.videoPlayer}
                    controls={true}
                  />
                </View>
                :
                <View style={styles.mediaContainer}>
                  <Image source={require('../../../../assets/images.png')} style={styles.image} />
                </View>
              }
            </TouchableOpacity> 
          )}
          {mediaType === 'photo' && (
            <TouchableOpacity onPress={handleOpenModal}>
              {selectedImage ?
                <View style={styles.mediaContainer}>
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                </View>
                :
                <View style={styles.mediaContainer}>
                  <Image source={require('../../../../assets/images.png')} style={styles.image} />
                </View>
              }
            </TouchableOpacity>
          )}
        </View>
        <Button text={"Create Post"} onPress={handleLoginPress}></Button>
      </View>
    </>
  );
};
export default CreatePost;