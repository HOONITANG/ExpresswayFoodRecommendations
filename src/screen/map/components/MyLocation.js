// import Geolocation from 'react-native-geolocation-service';

// const [myLocation, setLocation] = useState();

// async function requestPermission() {
//     try {
//         // iOS 위치 정보 수집 권한 요청
//         if (Platform.OS === "ios") {
//             return await Geolocation.requestAuthorization("always");
//         }
//         // 안드로이드 위치 정보 수집 권한 요청 
//         if (Platform.OS === "android") { 
//             return await PermissionsAndroid.request( 
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
//             ); 
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

// useEffect(() => { 
//     requestPermission().then(result => { 
//         if (result === "granted") { 
//             Geolocation.getCurrentPosition( 
//                 pos => { 
//                     setLocation(pos.coords);
//                 }, error => { 
//                     console.log(error); 
//                 }, 
//                 { 
//                     enableHighAccuracy: true, 
//                     timeout: 3600, 
//                     maximumAge: 3600, 
//                 }, 
//             ); 
//         } 
//     }); 
// }, []);

// if(!myLocation) {
//     return (
//         <View>
//             <Text>위치정보를 읽어오지 못했습니다. :(</Text>
//         </View>
//     )
// }