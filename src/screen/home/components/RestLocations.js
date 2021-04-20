import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { useRestArea } from '../../../api/apiHandler';
import { Block, Text, Icon } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';
import lib from '../../../lib';

const { helper } = lib;

export default function RestLocations({ onNavi, routeNo, addTodo }) {

    const [myLocation, setLocation] = useState();
    const { status, data } = useRestArea(routeNo);

    async function requestPermission() {
        try {
            // iOS 위치 정보 수집 권한 요청
            if (Platform.OS === "ios") {
                return await Geolocation.requestAuthorization("always");
            }
            // 안드로이드 위치 정보 수집 권한 요청 
            if (Platform.OS === "android") { 
                return await PermissionsAndroid.request( 
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                ); 
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleAddTodo = (task) => {
        // console.log(task);
        addTodo(task)
    }

    useEffect(() => { 
        requestPermission().then(result => { 
            if (result === "granted") { 
                Geolocation.getCurrentPosition( 
                    pos => { 
                        setLocation(pos.coords);
                    }, error => { 
                        console.log(error); 
                    }, 
                    { 
                        enableHighAccuracy: true, 
                        timeout: 3600, 
                        maximumAge: 3600, 
                    }, 
                ); 
            } 
        }); 
    }, [routeNo]);

    if (status === "loading") return <Text>Loading...</Text>;
    if (status === "error") return <Text>Error :(</Text>;

    if(!myLocation) {
        return (
            <View>
                <Text>위치정보를 읽어오지 못했습니다. :(</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text titleHeavy marginVertical={16}> 휴게소 목록 </Text>
            {data.length == 0 && <Text headLineHeavy center>고속도로 노선 검색을 해주세요...</Text>}
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={item.unitCode} onPress={() => onNavi(item.stdRestCd)}>
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