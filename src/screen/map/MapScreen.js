import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Animated, ScrollView, Platform, PermissionsAndroid } from 'react-native'
import { Block, Text } from '../../common/elements';
import images from '../../constants/images';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useRestLocations } from '../../api/apiHandler';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from '../../common/elements';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const styles = StyleSheet.create({
    container :{
        flex: 1,
    },
    map: {
        height: '100%'
    },
    // Callout bubble
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: "#ccc",
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow betow the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    // Chanacter name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Character image
    image: {
        width: 120,
        height: 80,
    },
    searchBox : {
        position: 'absolute',
        marginTop: Platform === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: 'center',
        borderRadius: 5,
        padding : 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position:'absolute', 
        top:70, 
        paddingHorizontal:10
    },
    chipsItem: {
        flexDirection:"row",
        backgroundColor:'#fff', 
        borderRadius:20,
        padding:8,
        paddingHorizontal:20, 
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsIcon : {
        marginRight: 5,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardTitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    button: {
        alignItems: 'center',
        marginTop: 5,
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:60,
        height:60,
    },
    marker: { 
        height: 40, 
        width: 40, 
    }
});

const initialMapState = {
    categories: [
        { 
          name: 'Fastfood Center', 
          icon: <Icon type="material-community" style={styles.chipsIcon} name="food-fork-drink" size={18} />,
        },
        {
          name: 'Restaurant',
          icon: <Icon type="ionicon"  name="ios-restaurant" style={styles.chipsIcon} size={18} />,
        },
        {
          name: 'Dineouts',
          icon: <Icon type="ionicon"  name="md-restaurant" style={styles.chipsIcon} size={18} />,
        },
        {
          name: 'Snacks Corner',
          icon: <Icon type="material-community" name="food" style={styles.chipsIcon} size={18} />,
        },
        {
          name: 'Hotel',
          icon: <Icon type="fontisto" name="hotel" style={styles.chipsIcon} size={15} />,
        },
    ],
    region: {
        latitude: 37.459939,
        longitude: 127.042514,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }
}

function Markers (data, onMarkerPress, interpolations) {
    return data?.list?.map((item,index) => {
        const scaleStyle = {
            transform: [
                {
                    scale: interpolations[index].scale,
                }
            ]
        }
        return (
            <Marker
                key={index}
                coordinate={{
                    latitude: parseFloat(item.yValue),
                    longitude: parseFloat(item.xValue),
                }}
                //image={images.mapMarker}
                title={item.unitName}
                description={item.routeName}
                onPress={onMarkerPress}
            >
                <Animated.View style={styles.markerWrap}>
                    <Animated.Image
                        source={images.mapMarker} 
                        style={[styles.marker,scaleStyle]}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Marker>
        )
    })
}

function MapScreen () {

    const [state, setState] = useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
    const { status, data, } = useRestLocations("0010");

    useEffect(() => {
        mapAnimation.addListener(({value}) => {
            let index = Math.floor((value + SPACING_FOR_CARD_INSET * 2) / (width - (SPACING_FOR_CARD_INSET * 2))) // animate 30% away from landing on the next item
            const locations = data?.list;
            // 한번 스크롤 할 때 움직이는 value 의 차이는
            // width 의 길이이나 스크롤 내부에 padding을 넣었다면 그 만큼 제외해주어야 한다.
     
            if ( index >= locations.length) {
                index = locations.length - 1 ;
            }
            if ( index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    _map.current.animateToRegion({
                        latitude: parseFloat(locations[index].yValue),
                        longitude: parseFloat(locations[index].xValue),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }, 350);
                }
            }, 10);
        });
    });
    

    const _map = React.useRef(null);
    const _scrollView =React.useRef(null);

    const interpolations = data?.list.map((page,index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });
        return { scale };
    })

    const onMarkerPress = (mapEventData) => {

        const markerID = Number(mapEventData._targetInst.return.key) + 1;
        let x = (markerID * (width - (SPACING_FOR_CARD_INSET * 2))) - (width - (SPACING_FOR_CARD_INSET * 2)) ;

        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        } 

        _scrollView.current.scrollTo({ x: x, y:0, animated: true })
    }

    if ( status == "loading" ) return <Text>Loading...</Text>;
    if ( status == "error" ) return <Text>Error :(</Text>;
    
    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                initialRegion={state.region}
                style={styles.container}
            >
                { Markers(data, onMarkerPress, interpolations) }
                
            </MapView>
            <View style={styles.searchBox}>
                <TextInput 
                    placeholder="휴게소 검색..."
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Icon type="ionicon" name="ios-search" size={20}/>
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // IOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20,
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {state.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                pagingEnabled
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                contentInset={{ // only ios
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            }
                        }
                    ],
                    {useNativeDriver: true}
                )}
            >
                {data?.list.map(item => (
                    <View style={styles.card} key={item.unitCode}>
                        <Text numberOfLines={1} style={styles.cardTitle}>{item.unitName}</Text>
                        <Text numberOfLines={1} style={styles.cardDescription}>{item.routeName}</Text>

                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => {}}
                                style={[styles.signIn, {
                                    borderColor: '#FF6347',
                                    borderWidth: 1
                                }]}
                            >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>상세 보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>    
                ))}
            </Animated.ScrollView>
        </View>
    )
}

export default MapScreen;