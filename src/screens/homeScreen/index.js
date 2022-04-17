import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import ColorHelper from '../../appHelper/colorHelper';
import styles from './styles';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation?.navigate?.('Movie')} style={{ backgroundColor: '#DCDCDC', padding: 10, borderRadius: 10 }}>
        <Text style={{ color: ColorHelper.white, fontSize: 20, fontWeight: 'bold',color:Colors.darker }}>Go to Movie Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default memo(Home);
