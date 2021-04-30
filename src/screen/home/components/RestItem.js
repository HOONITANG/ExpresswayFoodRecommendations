import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { Block, Text, Icon } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';
import lib from '../../../lib';

const { helper } = lib;

function RestItem({onNavi, handleAddTodo, item, myLocation}) {
    return (
        <TouchableOpacity key={item.unitCode} onPress={() => onNavi(item)}>
            <View style={styles.cardView}>
                {/* <Image style={styles.cardViewImage} source={{uri: "https://via.placeholder.com/80"}} /> */}
                <View style={styles.cardTextView}>
                    <View style={[styles.row,{ marginBottom: 8, alignItems: 'center', justifyContent: 'space-between'}]}>
                        <Text subHeaderHeavy>{item.unitName}</Text>
                        <TouchableOpacity onPress={() =>handleAddTodo(item)}>
                            <Block 
                                center 
                                middle 
                                padding={12} 
                                borderRadius={4} borderWidth={0.5} 
                                borderColor={COLORS.skyblue} 
                                backgroundColor={COLORS.skyblue}
                            >
                                <Icon type="fontisto" name="favorite" color={COLORS.white} size={18}/>
                            </Block>
                        </TouchableOpacity>
                    </View>
                    {item.tvShow == 'Y' && <Text>#맛비네이션 TV 방송 </Text>}
                    <View style={[styles.row,{ alignItems: 'center', justifyContent: 'space-between'}]}>
                        <Text color={COLORS.color_gray_700} style={styles.textMargin}>대표음식: {item.batchMenu}</Text> 
                        <Text primary>{helper.getDistance(myLocation, item)}KM</Text>
                    </View>
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
    },  
    textMargin: {
        marginRight: 16,
    },
    cardView: {
        flexDirection: 'row',
        marginVertical: 16, 
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        paddingBottom: 8,
    },
    cardViewImage: {
        width: 80, 
        height: 80,
        marginRight: 16, 
        alignSelf: 'center'
    },
    cardTextView: {
        flex: 1, // flex:1 을 해줘야 아래 row가 width 100%를 가짐
        justifyContent: 'center',
    }
})

export default React.memo(RestItem);