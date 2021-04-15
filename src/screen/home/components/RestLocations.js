import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { useRepresentFoodById } from '../../../api/apiHandler';
import { Block, Text } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';
import lib from '../../../lib';
import tvList from '../../../constants/data/tv';

const { helper } = lib;

export default function RestLocations({ onNavi, list, routeNo }) {

    const [myLocation, setLocation] = useState();
    const { status, data } = useRepresentFoodById(routeNo, list);

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
    }, []);

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
                            <Image style={styles.cardViewImage} source={{uri: "https://via.placeholder.com/80"}} />
                            <View style={styles.cardTextView}>
                                <Text subHeaderHeavy>{item.unitName}</Text>
                                {item.tvShow == 'Y' && <Text>티비 출현</Text>}
                                <View style={styles.row}>
                                    <Text color={COLORS.color_gray_700} style={styles.textMargin}>대표음식: {item.batchMenu}</Text> 
                                    <Text primary>{helper.getDistance(myLocation, item)}KM</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item,index) => index.toString()}
            />
        { 
        

            // Array.isArray(list)? 
            // (<FlatList
            //     data={list}
            //     renderItem={({ item, index }) => (
            //         <TouchableOpacity key={item.unitCode} onPress={() => onNavi(item.stdRestCd)}>
            //             <View style={styles.cardView}>
            //                 <Image style={styles.cardViewImage} source={{uri: "https://via.placeholder.com/80"}} />
            //                 <View style={styles.cardTextView}>
            //                     <Text subHeaderHeavy>{item.unitName}</Text>
            //                     {   
            //                         // 전달 받은 값이 존재한다면 TV 출현 표시
            //                         helper.getJoinColumn(
            //                             tvList, 
            //                             item.serviceAreaCode,
            //                             'serviceAreaCode', 
            //                             'foodNm') !== undefined &&  <Text>티비 출현</Text>
            //                     }
            //                     <View style={styles.row}>
            //                         <Text color={COLORS.color_gray_700} style={styles.textMargin}>대표음식: {helper.getJoinColumn(data.list, item.serviceAreaCode,'serviceAreaCode', 'batchMenu')}</Text> 
            //                         <Text primary>{helper.getDistance(myLocation, item)}KM</Text>
            //                     </View>
            //                 </View>
            //             </View>
            //         </TouchableOpacity>
            //     )}
            //     keyExtractor={(item,index) => index.toString()}
            // />) : 
            // <Text>{list}</Text>
        }  
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
    },
    cardViewImage: {
        width: 80, 
        height: 80,
        marginRight: 16, 
    },
    cardTextView: {
        flex: 1, // flex:1 을 해줘야 아래 row가 width 100%를 가짐
        justifyContent: 'space-around'
    }
})