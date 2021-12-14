## 휴게소 TV 맛집

# **💡 Background**

### 목적 및 계기

- 외국인이 한국에서 고속도로 음식점을 굉장히 특이하게 생각한다.
- 고속도로 음식점을 추천 한다면 좋지 않을까 해서 만들게 되었다.
- 이미 앱이 존재하지만 현재 내 위치기준으로 지도를 통해 좀 더 시각화 해서 보여주고 음식에 더 집중해서 만들면 괜찮겠다고 생각했다.
    - 1) 지도를 통한 경로 시각화
    - 2) 매출액, TV 출현을 통한 정보를 추가하여 사용자가 휴게소 음식에 대해 더 많은 정보를 얻게 하였다.

### 필수 기능

1) 고속도로 음식점 목록
2) 고속도로 음식 추천
3) 베스트, 거리순 정렬
4) 지도 시각화
5) 휴게소 및 주유소 즐겨찾기

---

# **🛠 Development**

- Back-end
    - 한국도로공사 Open API를 활용하여 Backend에 해당하는 부분은 없습니다.
    - [http://data.ex.co.kr/dataset/datasetList/list?pn=1&CATEGORY=BU](http://data.ex.co.kr/dataset/datasetList/list?pn=1&CATEGORY=BU)
- Front-end
    
    React-Native와 redux를 사용하여 데이터를 관리하였습니다.
    
    이전 프로젝트와 다르게 common에 있는 elements를 활용하지 않고 내부에 styleSheet을 활용하여 만들었습니다.
    
    파일구조는 아래와 같습니다.
    

```jsx
- api
- common
- constans 
- lib
- navigaiton
- screen
- state
- test
App.js
RootApp.js
```

- api: 네트워크 호출을 담당하는 것들을 apiHandler.js 에 담아 사용한다. Fetch 관련 라이브러리 검색필요
- common:
    - elements: ReactNative에서 사용되는 기본적인 엘리먼트 컴포넌트들을 작성합니다.(theme, Block, icon, input 등)
    - components: 공통적으로 사용되는 컴포넌트를 작성합니다.
- constants: image, font 같은 부분들을 작성합니다.
- lib: 앱 전반적으로 사용되는 라이브러리를 작성합니다.
- navigation: 앱 네비게이션을 관리합니다.
    - BottomTabNavigator: 바텀 탭에서 이동하는 navigation을 관리합니다.
    - StackNavigator: 바텀 탭 이외에 모든 navigation을 관리합니다.
    - RootNavigator: Drawer, AlertDialog, MediaViewer 등 화면 모든 곳에서 사용되는 navigation을 관리합니다.
- screen: 화면에 표현되는 컴포넌트를 도메인별로  관리합니다.
    - 도메인 폴더 (home) :
        - HomeScreen.js : 컴포넌트를 조합합니다. Redux와 유일하게 연결되는 컴포넌트입니다. ⇒ ReactQuery를 사용하게 되면서 ui만 배치하는 작업만 하게 될 수도 있을 것 같습니다.
        - components: Home화면에서 사용되는 컴포넌트들 입니다. 컴포넌트들을 비지니스 로직을 갖지만, 리덕스와 같은 내용은 가지고 있지 않고, HomeScreen에서 전달된 props을 사용합니다.
- state: redux 관련 폴더입니다. 사용되는 리덕스를 도메인 별이 아닌 기능별로 관리합니다.
- App.js
- RootApp.js : Redux Store와 연결되는 루트 앱입니다.

---

## **Tech Stack**

- Back-end
- Front-end
    - ReactNative
    - redux
    - reactQuery

## **Features & Screens**

![foodScreen](https://user-images.githubusercontent.com/45157159/145919104-1d778de3-5a55-4648-ab44-bf08519c3b4c.png)

- 고속도로 음식점 목록을 볼 수 있고, 각 고속도로별 추천음식과 베스트 음식을 볼 수 있습니다.
- 지도를 통해 고속도로 음식점을 살펴볼 수 있습니다.
- 선택한 고속도로를 즐겨찾기 할 수 있습니다.

---

# **🛫 Result**

- ReactQuery를 사용하였습니다. 원래는 redux에 Fetch를 따로 구성하여 loading과 같은 부분을 처리했는데, 라이브러리를 이해만 잘한다면 이런 부분들을 더 편하게 사용 할 수 있을 것 같습니다.
- 개발을 진행하면서, 생각하지 않은 폴더구조나 기능이 필요하게 되면서 폴더구조가 이상해진 부분이 있습니다. (Screen 폴더에 Hook폴더가 있는 것) 이번 개인프로젝트를 하면서 명확하게 폴더를 구성하는게 생각보다 쉽지 않다는 것을 알게되었습니다.
- 마켓팅 적으로 휴게소 어플을 검색했을 때, 너무나 많은 휴게소 어플이 나오게 되고 이 앱을 다운 받지는 않을 것 같습니다. 시장조사를 제대로 하지못했다고 생각합니다.
- 추가적으로 업데이트를 하려하였으나 데이터(음식사진, 휴게소 사진)등을 찾을 수가 없어 중지하였습니다.
