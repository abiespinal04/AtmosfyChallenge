import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {createThumbnail} from 'react-native-create-thumbnail';

import Scrubber from '../../components/Scrubber';

const PreviewVideo = () => {
  const [thumbnails, setThumbnails] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnails = async (url, duration) => {
    try {
      let t = [];

      for (let c = 0; c < duration * 1000; c += 1000) {
        t.push(c);
      }

      const r = t.map(async i => {
        const res = await createThumbnail({
          url,
          timeStamp: i,
        });

        return {url: res?.path, timeStamp: i};
      });

      const resAll = await Promise.all(r);

      // Set the initial thumbnail.
      setThumbnail(resAll[0]);

      setThumbnails([...resAll]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLaunchImageLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        includeExtra: true,
      });

      if (result?.didCancel) return;

      handleThumbnails(result?.assets[0]?.uri, result?.assets[0]?.duration);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetThumbnail = tn => {
    if (!tn) return;
    setThumbnail(tn);
  };

  return (
    <View style={styles.container}>
      {thumbnails?.length && (
        <View style={styles.scrubberContainer}>
          <Scrubber
            handleSetThumbnail={handleSetThumbnail}
            thumnails={thumbnails}
          />
        </View>
      )}
      {thumbnail && (
        <Image source={{uri: thumbnail.url}} style={styles.previewThumbnail} />
      )}
      <TouchableOpacity
        onPress={handleLaunchImageLibrary}
        style={styles.selectBox}>
        <Text>Press Me</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>
        To select a cover image, choose a frame from your video or an image from
        your camera roll.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  scrubberContainer: {alignSelf: 'center', height: 80, marginBottom: 40},
  previewThumbnail: {width: Dimensions.get('window').width, height: 300},
  backgroundVideo: {
    width: '100%',
    height: 300,
  },
  selectBox: {
    width: '80%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  instructions: {color: 'white', textAlign: 'center'},
});

export default PreviewVideo;
