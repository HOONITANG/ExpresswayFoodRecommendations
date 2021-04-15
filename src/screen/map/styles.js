import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    map: {
        height: '100%'
    },
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
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
        alignself: 'center',
        marginTop: 32,
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
})