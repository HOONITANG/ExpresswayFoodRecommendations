// import Geolocation from 'react-native-geolocation-service';

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

// {"accuracy": 5, 
// "altitude": 0, 
// "altitudeAccuracy": -1, 
// "heading": -1, "latitude": 37.785834, "longitude": -122.406417, "speed": -1}




const getDistance = (p1, p2) => {
    // latitude : yValue
    // longditude: xValue
    const rad = (x) => {
        return ( x * Math.PI ) / 180;
    };
    const R = 6378; // Earth’s mean radius in meter 6378137
    const dLat = rad(p2.yValue - p1.latitude);
    const dLong = rad(p2.xValue - p1.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.yValue)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;


    console.log("hidddd");
    console.log(d);
    return d; // returns the distance in meter
}

const nearPoints = centerList.map((rows) => {
    return { ...rows, nearPoints: getDistance(geoLocation, rows) };
});

const orderBynearPointList = nearPoints.sort((a,b) => {
    return +(a.nearPoint > b.nearPoint ) || +(a.nearPoint === b.nearPoint) - 1;
});