import React from 'react'
import { View, Dimensions, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Block, Icon, Text } from '../../common/elements'
import { COLORS, FONTS } from '../../common/elements/theme';
import { useRoutes } from '../../api/apiHandler';

const { width, height } = Dimensions.get("window");

export default function FilterModal({ open, closeModal, addParam }) {

    const { status, data, fetchNextPage, hasNextPage } = useRoutes();
    let routes;
    let list = [];
    if (status === "loading") return <Text>Loading...</Text>;
    if (status === "error") return <Text>Error :(</Text>;

    if (hasNextPage) {
        fetchNextPage();
        return <Text>Loading...</Text>
    }
    if (!hasNextPage) {
        data?.pages.map((item) => {
            list = list.concat(item.list);
        });
        routes = helper.findRestLocations(list, 'routeName');
    }

    const clickHandler = (item) => {
        const items = list.filter((e, i, self) => {
            return e.routeName == item ;
        })
        addParam({ key:"routeNo", value: items[0].routeNo })
        addParam({ key:"placeholder", value: items[0].routeName })
        // setRouteNo(items[0].routeNo);
        // setPlaceholder(items[0].routeName);
        closeModal();
    }

    return (
        <Modal
            transparent={true}
            visible={open}
        >
            <TouchableWithoutFeedback onPress={closeModal} >
                <View style={{ flex: 1, backgroundColor: '#eeee'}}>
                    <View style={styles.modalView}>
                        <View style={styles.title}>
                            <Text white headLineHeavy>고속도로 노선을 선택해주세요.</Text>
                        </View>
                        <FlatList
                            style={{ width: '100%'}}
                            data={routes}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={()=>{clickHandler(item)}} >
                                    <View style={{ marginVertical: 8, padding: 16 }}>  
                                        <Text>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={ (item, index) => index.toString() }
                        /> 
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        alignSelf: 'center',
        top: "25%",
        height: "50%",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        backgroundColor: COLORS.primary,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})