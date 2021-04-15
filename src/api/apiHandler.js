// React Fetch 라이브러리를 사용 할 예정 
import { useQuery, useInfiniteQuery } from "react-query";
import fetch from './fetch';
import lib from '../lib';
import tv from '../constants/data/tv';
const { helper } = lib;

/*
apiKey는 한국도로공사 API Key
serviceKey는 공공데이터 포털 키
*/

const apiKey = "4008963540";
const serviceKey = "fp9ZFJ07Vvb4djBjCFjoq67eXYDIe23cZpN8vtOGcGI0nRz5TdSKkWDTMdtfzryzz%2BzdiqDAQ1RmkGRu4EJURQ%3D%3D"; 

const params = {
    stdRestCd: "00001",
    routeNo: "0010",
}

export const fetchFoods = async ({ pageParam = 1 }) => {
    const url = `https://data.ex.co.kr/openapi/restinfo/restBestfoodList?key=${apiKey}&type=json&numOfRows=30&pageNo=${pageParam}&stdRestCd=${params.stdRestCd}`;
    let data = await fetch(url);
    data.list = helper.getJoinArr(data.list, tv, 'seq', 'tvShow');
    return data;
};

export const fetchRestLocations = async (routeNo) => {
    const url = `https://data.ex.co.kr/openapi/locationinfo/locationinfoRest?key=${apiKey}&type=json&routeNo=${routeNo}&numOfRows=100&pageNo=1`;
    const data = await fetch(url);
    return data;
}

export const fetchRoutes = async ({ pageParam = 1 }) => {
    const url = `https://data.ex.co.kr/openapi/locationinfo/locationinfoRest?key=${apiKey}&type=json&numOfRows=100&pageNo=${pageParam}`
    const data = await fetch(url);
    return data;
}

export const fetchRepresentFood = async (routeNo, list) => {
    const url = `https://data.ex.co.kr/openapi/business/representFoodServiceArea?key=${apiKey}&type=json&routeCode=${routeNo}&numOfRows=100&pageNo=1`;
    const data = await fetch(url);
    // list : 거리가 포함된 데이터
    // Tv : 이영자 소개 데이터
    let result = helper.getJoinArr(list, data.list, 'serviceAreaCode', 'batchMenu');
    result = helper.getJoinArr(result, tv, 'serviceAreaCode', 'tvFoodNm', 'etc', 'tvShow');
    return result;
};

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

export function useRestLocationsById(routeNo) {
    return useQuery(['restLocations', routeNo], async() => fetchRestLocations(routeNo))
}

export function useRepresentFoodById(routeNo, list) {
    return useQuery(['representFood', routeNo], async() => fetchRepresentFood(routeNo, list))
}

// export function useRoutes(routeNo) {
//     return useQuery(['routes', routeNo], async() => fetchRoutes(routeNo));
// }

