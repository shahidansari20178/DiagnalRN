import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {normalize} from '../../appHelper/responsiveHelper'
import ColorHelper from '../../appHelper/colorHelper';

const MovieEmptyList = ({ isLoading = false }) => (
    <View style={{ flex: 1, marginTop: '30%', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
        {isLoading && <ActivityIndicator size={'large'} color={ColorHelper.white} />}
        <Text style={{ color: ColorHelper.gray, fontSize: normalize(30), fontWeight: 'bold', fontFamily: 'TitilliumWeb-Light' }}>{isLoading ? 'Searching....' : "No Movie Found"}</Text>
    </View>
)
MovieEmptyList.propTypes = {
    isLoading: PropTypes.bool
};
export default memo(MovieEmptyList);