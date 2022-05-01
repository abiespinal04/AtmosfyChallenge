import {Image, View, FlatList, Dimensions, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';

const THUMBNAIL_SIZE = {
  width: 100,
  height: 80,
};

const Scrubber = ({handleSetThumbnail, thumnails}) => {
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef();
  const onViewRef = useRef(viewableItems => {
    setCurrent(viewableItems?.viewableItems[0]?.index);
    handleSetThumbnail(viewableItems?.viewableItems[0]?.item);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const keyExtractor = item => 'unique_' + item?.timeStamp;
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={styles.listContentStyle}
        data={thumnails}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => (
          <Image
            source={{uri: item?.url}}
            style={[
              styles.thumbnail,
              {
                height: index === current ? 90 : THUMBNAIL_SIZE.height,
              },
            ]}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: 100, width: Dimensions.get('window').width},
  thumbnail: {
    width: THUMBNAIL_SIZE.width,
  },
  scanner: {
    height: 100,
    width: 100,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'transparent',
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 5,
  },
  imageStyle: {
    width: Dimensions.get('window').width / 6,
  },
  listContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: Dimensions.get('window').width - THUMBNAIL_SIZE.width,
  },
});

export default Scrubber;
