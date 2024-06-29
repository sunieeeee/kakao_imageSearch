# IMAGE SEARCH - 이미지 검색

- `project duration` : 2024.5.28 ~ 2024.6.8 (약 2주)
- `Link` : 
- `Stack` : React, Redux, Axios, SCSS

## 프로적트 기능 설명
- **검색어를 통한 이미지 검색**: useEffet와 Redux를 사용하여 데이터를 조회.
- **무한 스크롤**: 'react-intersection-observer'를 사용하여 페이지 끝에 도달 시 데이터를 새로 불러옴.
- **로딩 스피너**: 'react-loader-spinner'라이브러리를 사용하여 데이터를 불러오는 동안 로딩 스피너를 표시.
- *SEO 처리*:  검색어에 따라 <head>태그 내의 title 속성값이 바뀌도록 구현.

## 느낀점과 보완이 필요한 부분
연동할 API를 리덕스와 useEffect를 활용하여 검색어를 실시간으로 모니터링하며 백엔드에 요청하는 방식으로 구현하였다. 초기 검색어 입력 시 데이터 조회는 문제없이 이루어졌지만, 인피니트 스크롤을 구현하는 과정에서 스크롤이 화면 끝에 도달하면 데이터가 원하는대로 누적되지 않아 이 문제를 해결하는 데 많은 시간이 소요되었다.

Redux의 상태를 직접 변경하지 않고 새로운 객체를 반환하여 상태를 업데이트하는 점이 어려웠지만, 이를 통해 상태 관리의 원칙을 준수하는 방법을 배우게 되었다.
앞으로는 비동기 처리와 상태 관리 패턴을 더 깊이 공부하고, 효율적이고 최적화된 코드를 짜려고 노력해야겠다.


## 작업 화면
💡 검색 기능
- useState를 사용하여 검색어를 상태변수로 관리한다.
- useEffect와 Redux를 통해 검색어가 변경될때마다 데이터를 조회. 
![검색기능](https://github.com/sunieeeee/kakao_imageSearch/assets/167268984/17033b90-afc0-4bcc-90c8-0a0594f27151)


💡 무한 스크롤
- 마지막 요소에 ref 속성을 적용하여 스크롤 끝 감지.
- 스크롤이 페이지 끝에 도달 시 검색어, 페이지 번호를 백엔드로 요청.
![무한스크롤](https://github.com/sunieeeee/kakao_imageSearch/assets/167268984/134363cb-8404-48f5-9396-36ae85f20ccb)