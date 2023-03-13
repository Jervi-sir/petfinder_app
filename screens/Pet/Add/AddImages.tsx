import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet, Animated  } from "react-native";
import Dialog from "react-native-dialog";
import {manipulateAsync} from 'expo-image-manipulator';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import { colors } from "@constants/colors";

let images = ['', '', '', ''];
let imagesUri = ['', '', '', ''];

export const AddImages = ({ onImageSelected, onImagesUri }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedInput, setSelectedInput] = useState(false);
  
  let scrollX = new Animated.Value(0);

  const pickImage = async (number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      selectionLimit: 10,
      aspect: [4, 3],
      //base64: true,
    });
    setVisible(false);
    if (!result.canceled) {
      const manipulateResult = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1080 } }],
          { compress: 0.5, base64: true }, // from 0 to 1 "1 for best quality"
          
      );
      if(number == 1) {setImage1(manipulateResult); }
      if(number == 2) {setImage2(manipulateResult); }
      if(number == 3) {setImage3(manipulateResult); }
      if(number == 4) {setImage4(manipulateResult); }
      
      images[number - 1] = manipulateResult.base64;
      imagesUri[number - 1] = manipulateResult.uri;
      onImageSelected(images);
      onImagesUri(imagesUri);
    }
    setSelectedInput(null);
    
  };
  const openCamera = async (number) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    setVisible(false);
    if (!result.canceled) {
      const manipulateResult = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1080 } }],
          { compress: 0.5, base64: true } // from 0 to 1 "1 for best quality"
      );
      if(number == 1) {setImage1(manipulateResult)}
      if(number == 2) {setImage2(manipulateResult)}
      if(number == 3) {setImage3(manipulateResult)}
      if(number == 4) {setImage4(manipulateResult)}

      images[number - 1] = manipulateResult.base64
      onImageSelected(images);
      imagesUri[number - 1] = manipulateResult.uri;
      onImagesUri(imagesUri);

    }
    setSelectedInput(null);
  };

  const removeImage = (number) => {
    if(number == 1) {setImage1(null)}
    if(number == 2) {setImage2(null)}
    if(number == 3) {setImage3(null)}
    if(number == 4) {setImage4(null)}

    images[number - 1] = ''
    onImageSelected(images);
    imagesUri[number - 1] = '';
    onImagesUri(imagesUri);

  }
  const showDialog = (number) => {
    setSelectedInput(number);
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setSelectedInput(null);
  };
  return (
    <View>
      <View style={{marginBottom: 10}}>
        <Animated.ScrollView 
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true })}
          >
          { image1 != null && <Image source={{ uri: image1.uri }} style={styles.imageSelectedPreview} /> }
          { image2 != null && <Image source={{ uri: image2.uri }} style={styles.imageSelectedPreview} /> }
          { image3 != null && <Image source={{ uri: image3.uri }} style={styles.imageSelectedPreview} /> }
          { image4 != null && <Image source={{ uri: image4.uri }} style={styles.imageSelectedPreview} /> }
        </Animated.ScrollView>
        <View style={{
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            marginBottom: 7,
            position: 'absolute'
          }}>
            <RNAnimatedScrollIndicators
              numberOfCards={(image1 != null && 1) + (image2 != null && 1) + (image3 != null && 1) + (image4 != null && 1)}
              scrollWidth={300}
              activeColor={colors.menu}
              inActiveColor={colors.background}
              scrollAnimatedValue={scrollX}
            />
          </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
        {/* 1 */}
        <View style={[styles.image, image1 == null && styles.dashed]}>
          { image1 == null &&
          <TouchableOpacity onPress={() => showDialog(1)} style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          }
          { image1 != null && <Image source={{ uri: image1.uri }} style={styles.imageSelected} /> }
          { image1 != null &&
          <TouchableOpacity onPress={() => removeImage(1)} style={styles.removeButton}>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
          }
        </View>
        {/* 2 */}
        <View style={[styles.image, image2 == null && styles.dashed]}>
          { image2 == null &&
          <TouchableOpacity onPress={() => showDialog(2)} style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          }
          { image2 != null && <Image source={{ uri: image2.uri }} style={styles.imageSelected} /> }
          { image2 != null &&
          <TouchableOpacity onPress={() => removeImage(2)} style={styles.removeButton}>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
          }
        </View>
        {/* 3 */}
        <View style={[styles.image, image3 == null && styles.dashed]}>
          { image3 == null &&
          <TouchableOpacity onPress={() => showDialog(3)} style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          }
          { image3 != null && <Image source={{ uri: image3.uri }} style={styles.imageSelected} /> }
          { image3 != null &&
          <TouchableOpacity onPress={() => removeImage(3)} style={styles.removeButton}>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
          }
        </View>
        {/* 4 */}
        <View style={[styles.image, image4 == null && styles.dashed]}>
          { image4 == null &&
          <TouchableOpacity onPress={() => showDialog(4)} style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          }
          { image4 != null && <Image source={{ uri: image4.uri }} style={styles.imageSelected} /> }
          { image4 != null &&
          <TouchableOpacity onPress={() => removeImage(4)} style={styles.removeButton}>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
          }
        </View>
   
      </View>
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title>Add image</Dialog.Title>
        <View>
          <Dialog.Button label="Choose in Gallery" onPress={() => pickImage(selectedInput)} />
          <Dialog.Button label="Use Camera" onPress={() => openCamera(selectedInput)} />
        </View>
      </Dialog.Container>
    </View>
  )
}
const styles = StyleSheet.create({
  dashed: {
    backgroundColor: colors.background, 
    height: 69, 
    width: 69, 
    justifyContent: 'center'
  },
  imageSelected: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  imageHidden: {
    opacity: 0
  },
  addText: {
    marginTop: -5,
    fontSize: 36, 
    textAlign: 'center'
  },
  image: {
    backgroundColor: '#FFF',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 100,
    width: 22,
    height: 22
  },
  removeText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'red', 
    textAlign: 'center'
  },
  preview: {
    backgroundColor: '#FFF',
    height: 250,
    width: '100%',
    borderRadius: 10,
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 0, 0, 0.6)',
    overflow: 'hidden'
  },
  imageSelectedPreview: {
    backgroundColor: colors.background, 
    height: 250, 
    width: 298,

  },
  addButton: {
    justifyContent: 'center', 
    height: '100%',
  },
})