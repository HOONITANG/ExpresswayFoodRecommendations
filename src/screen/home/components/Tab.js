import React, { useState } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native'
import { Block, Text, Icon } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';

export default function Tab({ tabArr, tabIndex, setTabIndex }) {
    // const [ activeIndex, setActiveIndex ] = useState(0);
    
    const onPress = (item, index) => {
        setTabIndex(index)
    }
    return (
        <Block row>
            {tabArr.map((item, index) => {
                const activeColor = index == tabIndex ? COLORS.primary : COLORS.gray;
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
