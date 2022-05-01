/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {PreviewVideo} from './src/screens';

const App = () => {
  return (
    <SafeAreaView
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'gray',
      }}>
      <PreviewVideo />
    </SafeAreaView>
  );
};

export default App;
