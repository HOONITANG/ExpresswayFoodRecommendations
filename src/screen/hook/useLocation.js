import { useState } from "react";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native'

const useLocation = () => {
    const [myLocation, setLocation] = useState();
    
    const requestPermission = async() => {
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

    const receiveLocation = (result, setLocation) => {
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
    }

    const moveLocation = (setLocation, mapRef) => {
        Geolocation.getCurrentPosition( 
            pos => { 
                setLocation(pos.coords);
                mapRef?.current.animateToRegion({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.21,
                })
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

    return { myLocation, setLocation, requestPermission, receiveLocation, moveLocation };

};

export default useLocation;