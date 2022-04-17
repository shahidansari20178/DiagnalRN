import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import AppNavigation from './src/navigation/routes'

const App = () => {
  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.darker,
  };

  useEffect(() => {
    // for text scalling
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
    }

    if (TextInput.defaultProps == null) {
      TextInput.defaultProps = {};
      TextInput.defaultProps.allowFontScaling = false;
    }
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <AppNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
