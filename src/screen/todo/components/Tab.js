import React, { useState } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native'
import { useRoutes } from '../../../api/apiHandler';
import { Block, Text, Icon } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';
import lib from '../../../lib';

export default function Tab({ setFilter }) {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const filter = ['휴게소', '주유소'];
    const onPress = ( item, index ) => {
        setActiveIndex(index);
        setFilter( item )
    }
    return (
        <Block row>
            {filter.map((item, index) => {
                const activeColor = index == activeIndex ? COLORS.primary : COLORS.gray;
                return (
                    <TouchableOpacity key={index.toString()} onPress={() => onPress(item, index)} style={styles.tabButtonWrap}>
                        <Block style={[styles.tabButton, {borderColor: activeColor } ]}>
                            <Text subHeaderHeavy style = {{ color: activeColor }}>{item}</Text>
                        </Block>    
                    </TouchableOpacity>
                )
            })}
        </Block>
    )
}

const styles = StyleSheet.create({
    tabButtonWrap: {
        margin: 8, 
    },
    tabButton: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
    },
})
