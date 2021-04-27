import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid, Alert } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { useRestGas } from '../../../api/apiHandler';
import { Block, Text, Icon } from '../../../common/elements'
import { COLORS, FONTS } from '../../../common/elements/theme';
import lib from '../../../lib';
import GasSortButton from './GasSortButton';

const { helper } = lib;

export default function GasList({ routeNo, addTodo }) {

    const [orderIdx, setOrderIdx] = useState(-1);
    const { status, data } = useRestGas(routeNo);
    //React.useMemo( helper.sortArr(data.list, 'gasolinePrice', true) , [data])

    const gasNameArr = [
        {
            name: '휘발유',
            col: 'gasolinePrice'
        },
        {
            name: '경유',
            col: 'diselPrice'
        },
        {
            name: 'LPG',
            col: 'lpgPrice'
        } 
    ]

    const filteredByPrice = (col, index) =>  { 
        helper.sortArr(data.list, col, true) 
        setOrderIdx(index);
    };
   

    const handleAddTodo = (task) => {
        // console.log(task);
        Alert.alert("즐겨찾기에 등록되었습니다. ");
        task.gas = "Y";
        task.rest = "N";
        addTodo(task)
    }


    if (status === "loading") return <Text>Loading...</Text>;
    if (status === "error") return <Text>Error :(</Text>;

    return (
        <View style={styles.container}>
            <Block marginTop={8}>
                <Text subHeaderHeavy color={COLORS.color_gray_600}>GAS 가격순</Text>
                <Block row marginTop={8}>
                    {gasNameArr.map((item, index) => {
                        const select = index == orderIdx;
                        return (
                            <GasSortButton 
                                key={index.toString()}
                                onPress={() => filteredByPrice(item.col, index)} 
                                selectBgColor={COLORS.color_primary_100}
                                selectTextColor={COLORS.color_primary_700}
                                select={select}
                                text={item.name}
                            />
                         )
                    })}
                </Block>
            </Block>
            <FlatList
                data={data.list}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <View style={styles.cardView}>
                            {/* <Image style={styles.cardViewImage} source={{uri: "https://via.placeholder.com/80"}} /> */}
                            <View style={styles.cardTextView}>
                                <View style={[styles.row,{ marginBottom: 8, alignItems: 'center', justifyContent: 'space-between'}]}>
                                    <Text subHeaderHeavy>{item.serviceAreaName}</Text>
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
                                <View style={[styles.row,{ alignItems: 'center', justifyContent: 'space-between'}]}>
                                    <Text color={COLORS.color_gray_700} style={[styles.textMargin, orderIdx == 0? { ...FONTS.titleHeavy, color: COLORS.primary } : null ]} > 휘발유: {item.gasolinePrice}</Text> 
                                    <Text color={COLORS.color_gray_700} style={[styles.textMargin, orderIdx == 1? { ...FONTS.titleHeavy, color: COLORS.primary } : null]} >경유: {item.diselPrice}</Text> 
                                    <Text color={COLORS.color_gray_700} style={[styles.textMargin, orderIdx == 2? { ...FONTS.titleHeavy, color: COLORS.primary } : null]} >LPG: {item.lpgPrice}</Text> 
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item,index) => index.toString()}
            />
        </View>
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