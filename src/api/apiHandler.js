// React Fetch 라이브러리를 사용 할 예정 
import { useQuery, useInfiniteQuery } from "react-query";
// import fetch from './fetch';
import lib from '../lib';
import tv from '../constants/data/tv';
const { helper } = lib;

/*
apiKey는 한국도로공사 API Key
*/

const apiKey = "4008963540";

const params = {
    stdRestCd: "00001",
    routeNo: "0010",
}

export const fetchFoods = async ({ pageParam = 1 }) => {
    const url = `https://data.ex.co.kr/openapi/restinfo/restBestfoodList?key=${apiKey}&type=json&numOfRows=30&pageNo=${pageParam}&stdRestCd=${params.stdRestCd}`;
    let data = await fetch(url).then((result) => result.json());

    data.list = helper.getJoinArr(data.list, tv, 'seq', 'tvShow');
    return data;
};

export const fetchRestLocations = async (routeNo) => {
    const url = `https://data.ex.co.kr/openapi/locationinfo/locationinfoRest?key=${apiKey}&type=json&routeNo=${routeNo}&numOfRows=100&pageNo=1`;
    const data = await fetch(url).then((result) => result.json());
    return data;
}


export const fetchAllRestLocations = async () => {
    
    const url = `https://data.ex.co.kr/openapi/locationinfo/locationinfoRest?key=${apiKey}&type=json&numOfRows=100`
    let result = [];
    const pages = ['1','2','3','4'];
    // page 크기 만큼 네트워크 fetch을 진행 한 후 데이터를 병합함.
    const data = await Promise.all(
        pages.map( i => { 
            return fetch(url+`&pageNo=${i}`).then((result) => result.json()); })
    );
    // 리스트 데이터만 따로 추출해서 병합함.
    data.map((i) => {
        result = result.concat(i.list);
    })

    return result;
}

export const fetchRoutes = async ({ pageParam = 1 }) => {
    const url = `https://data.ex.co.kr/openapi/locationinfo/locationinfoRest?key=${apiKey}&type=json&numOfRows=100&pageNo=${pageParam}`
    const data = await fetch(url).then((result) => result.json());
    return data;
}

export const fetchRepresentFoods = async (routeNo) => {
   
    const url = `https://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${apiKey}&type=json&routeCode=${routeNo}&numOfRows=100&pageNo=1`;
    const data = await fetch(url).then((result) => result.json());
    return data;
};

export const fetchRestDirections = async (routeNo) => {
    const url = `https://data.ex.co.kr/openapi/business/conveniServiceArea?key=${apiKey}&type=json&routeCode=${routeNo}&numOfRows=100&pageNo=1`;
    const data = await fetch(url).then((result) => result.json());
    return data;
};

export const fetchRestGas = async (routeNo) => {
    const url = `https://data.ex.co.kr/openapi/business/curStateStation?key=${apiKey}&type=json&routeCode=${routeNo}&numOfRows=100&pageNo=1`;
    const data = await fetch(url).then((result) => result.json());
    return data;
};


export const fetchRestGasByIds = async (arr) => {
    let farr = helper.filterArr(arr, 'gas', 'Y');
    let result = [];
    const url = `https://data.ex.co.kr/openapi/business/curStateStation?key=${apiKey}&type=json&numOfRows=10&pageNo=1`;
    const data = await Promise.all(
        farr.map( i => { 
            return fetch(url+`&serviceAreaCode=${i.serviceAreaCode}`).then((result) => result.json()); 
        })
    );
    data.map((i) => {
        result = result.concat(i.list);
    })
    return result;
};

export const fetchRestArea = async (routeNo) => {
    const location = await fetchRestLocations(routeNo);
    const url = `https://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${apiKey}&type=json&routeCode=${routeNo}&numOfRows=100&pageNo=1`;
   
    const data = await fetch(url).then((result) => result.json());
   
    // list : 거리가 포함된 데이터
    // Tv : 이영자 소개 데이터
    let result = helper.getJoinArr(location.list, data.list, 'serviceAreaCode', 'batchMenu');
    result = helper.getJoinArr(result, tv, 'serviceAreaCode', 'tvFoodNm', 'etc', 'tvShow');
    return result;
};

export const fetchLocationInitMap = async (routeNo) => {
    const location = await fetchRestLocations(routeNo);
    const direction = await fetchRestDirections(routeNo);

    // list : 거리가 포함된 데이터
    // Tv : 이영자 소개 데이터
    let result = helper.getJoinArr(location.list, direction.list, 'serviceAreaCode', 'batchMenu');
    result = helper.getJoinArr(result, tv, 'serviceAreaCode', 'tvFoodNm', 'etc', 'tvShow');
    return result;
}

export function useFoods(stdRestCd) {
    params.stdRestCd = stdRestCd;
    return useInfiniteQuery(
        ['foods',stdRestCd], fetchFoods, {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.pageNo < lastPage.pageSize) return lastPage.pageNo + 1;
                return false;
            }
        }
    );
}

export function useRoutes(stdRestCd) {
    return useInfiniteQuery(
        'routes', fetchRoutes, {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.pageNo < lastPage.pageSize) return lastPage.pageNo + 1;
                return false;
            }
        }
    );
}

export function useRestLocations() {
    return useQuery(['restLocations'], fetchAllRestLocations)
}

export function useRestLocationsById(routeNo) {
    return useQuery(['restLocations', routeNo], async() => fetchRestLocations(routeNo))
}
export function useRestLocationForMap(routeNo) {
    return useQuery(['restLocationForMap', routeNo], async() => fetchLocationInitMap(routeNo))
}

export function useRestArea(routeNo) {
    return useQuery(['representFood', routeNo], async() => fetchRestArea(routeNo))
}

export function useRestGas(routeNo) {
    return useQuery(['fetchRestGas', routeNo], async() => fetchRestGas(routeNo))
}

export function useRestGasByIds(arr) {
    return useQuery(['fetchRestGas', arr], async() => fetchRestGasByIds(arr))
}



// export function useRoutes(routeNo) {
//     return useQuery(['routes', routeNo], async() => fetchRoutes(routeNo));
// }

