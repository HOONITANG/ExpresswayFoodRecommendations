import React, { useEffect } from 'react'
import { QueryClient } from 'react-query';
import { connect } from 'react-redux'
import { fetchFoods, fetchRoutes, fetchRestArea, fetchRestGas, fetchRestGasByIds} from './api/apiHandler'

const queryClient = new QueryClient()

export const prefetchTodos = async (routeNo) => {
    // The results of this query will be cached like a normal query
    // await queryClient.prefetchQuery('routes', fetchRoutes, { staleTime: 10 * 1000 });
    // await queryClient.prefetchQuery(['representFood', routeNo],  async() => fetchRestArea(routeNo), { staleTime: 10 * 1000 });
    // await queryClient.prefetchQuery(['fetchRestGas', routeNo],  async() => fetchRestGas(routeNo), { staleTime: 10 * 1000 });

    //
    // await queryClient.prefetchQuery(['restLocations'], fetchAllRestLocations); // ㅇ안씀 
    // await queryClient.prefetchQuery(['restLocations', routeNo],  async() => fetchRestLocations(routeNo)); // 안씀
    // await queryClient.prefetchQuery(['restLocationForMap', routeNo], async() => fetchLocationInitMap(routeNo)); // 안씀
    
    //await queryClient.prefetchQuery(['fetchRestGas', arr], fetchRestGasByIds(arr));
    //await queryClient.prefetchQuery(['foods',stdRestCd], fetchFoods);
}


// Image Setup
// Data Setup

// class AsyncSetup extends EzComponent {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0,
//             total: 7,
//         }
//         this._isMounted = false
//     }
//     const prefetchTodos = async () => { 

//     }

//     componentDidMount() {
//         const {navigation } = this.props;
//         this._unsubscribe = navigation.addListener('focus', () => {
//             this._isMounted = true
//             this.preloadData();
//         });
//       }
    
//     componentWillUnmount() {
//         this._isMounted = false
//         this._unsubscribe();
//     }
    

//     preloadImages(urlOfImages) { // an array of urls of images
//         let preFetchImages = [];
//         urlOfImages.forEach((url)=>{
//             preFetchImages.push(Image.prefetch(url));
//         });
    
//         Promise.all(preFetchImages).then((results)=>{
//             try {
//                 let downloadedAll = true;
//                 results.forEach((result)=>{
//                     if(!result){
//                         //error occurred downloading a pic
//                         downloadedAll = false;
//                     }
//                 })
//             }catch(e){}
//         });
//     }

//     async preloadData() {
//         let preFetchTasks = [
//             this.props._fetchBirthday, 
//             this.props._fetchAnniversary, 
//             this.props._fetchEasyStory, 
//             this.props._fetchMeetingStatus,
//             this.props._fetchMeetingRoomStatus,
//             this.props._fetchNewCoworker,
//             this.props._fetchCommunityCategories,
//             this.props._userChangeCommunityType ];
            
        
//         await Promise.all(preFetchTasks).then((results)=>{
//             try {
//                 let downloadedAll = true;
                
//                 results.forEach((result)=>{
//                     result().then((status)=>{
//                         if (status && this._isMounted) {
//                             this.setState({count: this.state.count + 1})
//                         }
//                         if(status && this.state.count == this.state.total) {
//                             // 모두 호출 완료!
//                             setTimeout(()=>{
//                                 this.props.navigation.navigate('Main');   
//                             },1000);
//                         }
//                     })
                    
//                 })
//             } catch(e){}
//         });
//     }

//     // 0 ~ 1
//     getProgressRatio = () => {
//         let barStatus = (this.state.count/this.state.total);
//         return Number(barStatus.toFixed(2))
//     }

    
//     render() {
//         // lib.renderlog(this);
//         return (
//             <Block safe flex>
//                 <Block flex middle center>
//                     <Text>데이터 동기화 중입니다...</Text>
//                     <Progress.Bar
//                         borderColor='#00CDAC'
//                         color='#00CDAC'
//                         progress={this.getProgressRatio()}
//                         width={180}
//                     />
//                 </Block>
//             </Block>
//         )
//     }
// }

// const mapStateToProps = state => {
//     let home = state.home;
//     let c = home.COMMUNITY_DETAIL.PARAMS["c"];
//     return ({
//         workAnniversaryData: home.ANNIVERSARY.DATAS,
//         birthAnniversaryData: home.BIRTHDAY.DATAS,
//         easyStoryData: home.EASYSTORY.DATAS,
//         meetingData: home.MEETING_STATUS.DATAS,
//         meetingRoomData: home.MEETINGROOM.DATAS,
//         communityCategoryData: home.COMMUNITY_CATEGORIES.DATAS,
//         noticeData: home.COMMUNITY_DETAIL.DATAS,
//         communityActiveType: c ? c : "",
//     })
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         _fetchBirthday: () => dispatch(actionThunk(HOME.BIRTHDAY)),
//         _fetchAnniversary: () => dispatch(actionThunk(HOME.ANNIVERSARY)), 
//         _fetchEasyStory: () => dispatch(actionThunk(HOME.EASYSTORY)),
//         _fetchMeetingStatus: () => dispatch(actionThunk(HOME.MEETING_STATUS)),
//         _fetchMeetingRoomStatus: () => dispatch(actionThunk(HOME.MEETINGROOM)),
//         _fetchNewCoworker: () => dispatch(actionThunk(HOME.NEW_COWORKER)),
//         _fetchCommunityCategories: () => dispatch(actionThunk(HOME.COMMUNITY_CATEGORIES)),
//         _userChangeCommunityType: (c) => {
//             dispatch(actionThunk(HOME.COMMUNITY_DETAIL, {c: c ? c : "NOTICE"}));
//         },
//     }
// }
// const connectedAsyncSetup = connect(mapStateToProps, mapDispatchToProps)(AsyncSetup)
// export default connectedAsyncSetup
