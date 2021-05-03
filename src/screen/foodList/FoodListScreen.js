import React, { useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Dimensions, Alert } from 'react-native'
import { Block, Text, Icon } from '../../common/elements';
import { connect } from 'react-redux';
import { addTodo } from '../../state/todo/todoActions';
import { useFoods } from '../../api/apiHandler';
import { COLORS } from '../../common/elements/theme';
import lib from '../../lib';
import FoodItemCard from './components/FoodItemCard';
import Banner from '../Banner';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';
import { checkTracker } from '../Banner'
const adKey = Platform.OS == 'ios' ? 'ca-app-pub-2324283980956847/8207383576' : 'ca-app-pub-2324283980956847/6348696366';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : adKey;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['trip', 'food'],
});

const { price } = lib;
const { width, height } = Dimensions.get("window");

function FoodListScreen ({ navigation, route, addTodo }) {

    const { params } = route;
    const { stdRestCd } = params;
    const { 
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage } = useFoods(stdRestCd);

    
    useEffect(()=>{
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                //setLoaded(true);
            }
            if (type === AdEventType.CLOSED) {
                //console.log("ad closed");
                //setLoaded(false);
                
                //reload ad 
                interstitial.load();
            }
        });
    
            // Start loading the interstitial straight away
        interstitial.load();
    
        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const showAd = () => {
                if (interstitial.loaded) {
                    interstitial.show().catch(error => console.warn(error));
                }
            } 
            checkTracker(showAd,'',false);
        });
    
        return unsubscribe;
    }, [navigation]);

    const handleAddFavorite = () => {
        params.gas = "N";
        params.rest = "Y";
        addTodo(params);
        Alert.alert("즐겨찾기에 등록되었습니다. ")
    }

    const initialState = {
        categories: [
            { 
                name: '대표', 
                icon: <Icon type="antdesign" style={styles.infoIcon} name="star" size={25}/>,
                onPress: () => {}
            },
            {
                name: 'BEST',
                icon: <Icon type="antdesign"  name="heart" style={styles.infoIcon} size={25} />,
                onPress: () => {}
            },
            {
                name: '추천',
                icon: <Icon type="antdesign"  name="like1" style={styles.infoIcon} size={25} />,
                onPress: () => {}
            },
            {
                name: 'Tv',
                icon: <Icon type="antdesign" name="iconfontdesktop" style={styles.infoIcon} size={25} />,
                onPress: () => {}
            },
            {
                name: '정보',
                icon: <Icon type="antdesign"  name="infocirlce" style={styles.infoIcon} size={25} />,
            },
        ]
    }

    if (status === "loading") return <Text>Loading...</Text>;
    if (status === "error") return <Text>Error :(</Text>;
    if (data?.pages.flat()[0].list.length == 0) return <Block flex={1}><Text>음식리스트가 없습니다.</Text></Block>
       
    return (
        <Block white flex>
            <Banner/>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatListView}
                data={data?.pages.flat()}
                renderItem={({ item }) => (
                    item.list.map( (food, findex) => (
                        <FoodItemCard item={food} key={food.seq}/>
                    ))
                )}
                onEndReached={ hasNextPage ? fetchNextPage : ()=>{}}
                keyExtractor={(item,index) => index.toString()}
            />
            <TouchableOpacity style={{ position: 'absolute', right: 20, left: 20, bottom: 40, }} onPress={handleAddFavorite}>
                <Block 
                    center 
                    middle 
                    padding={12} 
                    borderRadius={4} borderWidth={0.5} 
                    borderColor={COLORS.skyblue} 
                    backgroundColor={COLORS.skyblue}
                    row
                >
                    <Icon type="fontisto" name="favorite" color={COLORS.white} size={18}/>
                    <Text subHeaderHeavy white marginLeft={8}>즐겨찾기 추가</Text>
                </Block>
            </TouchableOpacity>
        </Block>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 16,
    },
    flatListView: {
        marginBottom: 70
    },
    cardHeaderColor: {
        backgroundColor: COLORS.color_primary_300,
        height: 8,
    },  
    cardViewSection: {
        padding: 16,
    },
    cardAddInfo: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        justifyContent: 'flex-end'
    },
    iconView: {
        height: 60,
        width: 60,
        borderWidth: 0.5,
        borderColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
    },
    iconBackground: {
        backgroundColor: COLORS.color_primary_400
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        todo: state.todo_list
    }
}

const mapDispatchToProps = { addTodo }

export default connect(mapStateToProps, mapDispatchToProps)(FoodListScreen)