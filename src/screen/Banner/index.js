
import React, {useState ,useEffect} from 'react'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { Block } from '../../common/elements';

const adKey = Platform.OS == 'ios' ? 'ca-app-pub-2324283980956847/5052744802' : 'ca-app-pub-2324283980956847/2409451352';
const adUnitId = __DEV__ ? TestIds.BANNER : adKey;

const Banner = () => {
    
    const [Banner, setBanner] = useState(<></>)

    const AdComponent = <BannerAd
                            unitId={adUnitId}
                            size={BannerAdSize.ADAPTIVE_BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true,
                            }}
                        />
    
    useEffect(()=>{
        checkTracker(setBanner, AdComponent, true);
    },[])

    return (
        <Block marginVertical={4}>
            {Banner}
        </Block>
    );
}

export const checkTracker = (show, AdComponent, component) => {
    if (Platform.OS == 'ios') {
        check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
        .then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    //console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    //console.log('The permission has not been requested / is denied but requestable');
                    request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY).then((reqResult) => {
                        switch (reqResult) {
                            case RESULTS.GRANTED:
                                //console.log('The permission request is granted');
                                if(component == true) { // 배너 광고 컴포넌트 셋팅
                                    show(AdComponent)
                                } 
                                else { // 전면형 광고 showAd 함수 실행.
                                    show();   
                                }
                                // now you can make ad requests
                                break;
                            case RESULTS.BLOCKED:
                                //console.log('The permission request is denied and not requestable anymore');
                                break;
                        }
                    });
                    break;
                case RESULTS.LIMITED:
                    //console.log('The permission is limited: some actions are possible');
                    break;
                case RESULTS.GRANTED:
                    if(component == true) { // 배너 광고 컴포넌트 셋팅
                        show(AdComponent)
                    } 
                    else {  // 전면형 광고 showAd 함수 실행.
                        show();   
                    }
                    break;
                case RESULTS.BLOCKED:
                    //console.log('The permission is denied and not requestable anymore');
                    break;
            }
        })
        .catch((error) => {
            // …
        });
    }
    else {
        //console.log('Android');
        if(component == true) { // 배너 광고 컴포넌트 셋팅
            show(AdComponent)
        } 
        else { // 전면형 광고 showAd 함수 실행.
            show();   
        }
    }
}

export default Banner;