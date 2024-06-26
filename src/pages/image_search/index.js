/**
 * <카카오 오픈 API 페이지 구현 (무한스크롤 - infinity scroll)>
 * 카카오에서 제공하는 query인 page는 상태변수로 관리를 해야되는데
 * page번호가 1,2,3,4~ 바뀔때마다 백엔드한테 요청을 보내야 됨.
 * -> 화면에 직접적으로 반영되는게 아니고 백엔드한테 전달할 상태변수는 useRef로 만든다.
 * 
 * useState : 생성하자마자 페이지가 전부 refresh되는 변수이다.
 * -> 그래서 화면에 자동으로 반영이 된다.
 * 
 * ## 리액트에서는 스크롤이 맨 끝에 도착했다는 것을 감지하는 컴포넌트가 있음
 * react-intersection-observer
 * -> yarn add 명령어로 설치해야 함
 * 
 * import {useInView} from 'react-intersection-observer'
 * -> useInView 라는 변수를 가져와야 함
 * 
 * ## 스크롤이 맨 끝에 도착했음을 감지하는 상태변수
 * const [isEnd, inView] = useInView();
 * 
 * ## isEnd : li중에 맨 마지막 요소에 ref 속성으로 넣어주면 됨
 * [맨 마지막 요소인 li를 감지하는 방법]
 * : 배열의 length-1을 하면 마지막 요소의 index값을 찾을 수 있음
 * -> 조건부 속성 적용해야 함
 * 
 * 조건부를 삼항연산자로 쓰는데 삼항연산자를 소괄호 안에서 넣고
 * 결과를 {()} 안에다가 전부 JSON으로 덮어써라! 해서
 * {...(조건) ? {참인경우 적용값} : {거짓인경우 적용값}}
 * -> 그래서 ...이 들어감
 * 
 * {...(!loading && data.documents.length-1 == i) ? {ref : isEnd}} : {}}
 * -> 로딩중이 아니고 (스크롤을 무자비하게 내렸을 경우 중복 ajax요청을 방지하기 위함 - 요청, 응답을 하는 중에 또다른 요청을 보내지 못함)
 * -> 마지막 데이터인 경우
 * 
 * ## inView : isEnd가 스크롤을 마지막으로 내렸을 때 나타나면
 * inView는 true로 바뀐다.
 * -> isEnd가 화면상에 등장했다는 것을 감지하는게 isEnd변수이다.
 * 
 * ## infinity scroll은 데이터교체x, 누적o 이므로 slice부분을 수정해줘야 함.
 * <ReduxHelper.js>
 * //리덕스 slice객체를 생성하는 함수
 * function getDefault (slideName, asyncReducers = [], callback = null) {
 *            .
 *            .
 *            .
 *      builder.addCase(v.fulfilled, callback||fulfilled);
 * // 1. 성공했을 떄 callback이 있는지 없는지를 체크함
 * // 2. 처음에는 callback이 null이니까
 * 위에 정의해둔 기본 fullfilled함수를 씀
 * 
 * }
 * <ImageSearchSlice.js>
 * //슬라이스객체생성
 * // state : 현재 화면에 보여지는 state의 data.documents에 conccat으로 새로 받아온 데이터를 누적시킴
 * // payload.documents = state.data.documents.concat
 * ㄴ 근데 이렇게 쓰면 에러남 
 * 리덕스는 state의 데이터를 못바꾸게 되어있음
 * 그래서 state의 데이터를 복사 후 concat 해주어야 함
 * const MovieRankSLice = getDefaultSlice('ImageSearchSlice', [getList], (state, {meta, payload})=>{
 *  if(meta.arg.page > 1) {
 *    payload.documents = state.data.documents.concat(payload.documents);
 * }
 * })
 * 
 * 
 * 
 */

import React, {memo, useState, useEffect, useCallback, useRef} from 'react';

//상태값으로 로드하기 위한 hook과 action함수를 dispatch할 hook참조
import {useSelector, useDispatch} from 'react-redux';

//action함수를 참조
import {getList} from '../../slices/ImageSearchSlice';

import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import Meta from '../../components/Meta';

//이미지 표시 컴포넌트
import ImageView from './ImageView';

//날짜 처리 라이브러리
import dayjs from 'dayjs';

//이미지 목록에 대한 styled-components 참조
import {ImageList, ImageContainer} from './ImageList';

// 스크롤이 맨 끝에 도착했음을 감지하는 컴포넌트
import {useInView} from 'react-intersection-observer';

const ImageSearch = memo(() => {

  //검색어를 관리하기 위한 상태변수
  const [keyword, setKeyword] = useState("");

  //hook을 통해 slice가 관리하는 상태값 가져오기
  const {data, loading, error} = useSelector((state) => state.ImageSearchSlice);

  //dispatch함수 생성
  const dispatch = useDispatch();

  //페이지 번호를 관리하기 위한 상태변수
  //화면에 즉각적으로 출력되는 변수가 아닌 경우 useRef를 사용
  const page = useRef(1);

  //스크롤이 맨 끝에 도착했음을 감지하는 상태변수
  const [isEnd, inView] = useInView();

  const searchItem = useRef();

  //컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
  //검색어가 변경되면 다시 조회함
  useEffect(()=>{
    // console.log('[useEffect] 백엔드에 데이터 요청 --> keyword: ', keyword, "page : ", page.current);
    //신규 검색이므로 페이지 번호를 리셋
    page.current = 1;

    //검색어가 있을 경우만 조회
    if(keyword) {
      dispatch(getList({keyword: keyword}));
    }
  }, [keyword]);
  // console.log(data && data.documents && data.documents);
  //검색폼 이벤트
  const onSearchSubmit = useCallback((e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;

    //검색어를 상태변수에 저장
    setKeyword(keyword);

    searchItem.current.classList.add('on');
  }, []);

  //스크롤이 맨 끝에 도착했을 때 페이지 번호를 증가시키기 위한 useEffect
  /// => 검색어를 유지하면서 다음 페이지 데이터 조회
  useEffect(()=>{
    // console.log('[스크롤이 맨 끝에 도착했는지 검사] inView: ', inView);

    if(inView && keyword) {
      // 페이지 번호 증가
      page.current += 1;
      dispatch(getList({keyword: keyword, page: page.current}))
    }
  }, [inView]);
  return (
    <ImageContainer>      
      <Meta title={keyword} />
      <Spinner loading={loading} />

      <article>
        <form onSubmit={onSearchSubmit} ref={searchItem}>
          <input type='text' name='keyword' defaultValue={keyword} placeholder='Search'/>
          <button type='submit'>→</button>
        </form>

        {error ? (
          <ErrorView error={error} />
        ) : (
          <ImageList>
            {data && data.documents.map((v, i) => {
              return (
                <li
                  key={i}
                  className="list-item"
                  //조건부 속성 적용
                  //-> {...(조건) ? {참인경우적용값} : {거짓인경우적용값}}
                  //-> 로딩중이 아니고, 마지막 데이터인 경우 ref를 적용
                  {...(!loading && data.documents.length - 1 == i
                    ? { ref: isEnd }
                    : {})}
                >
                  <a
                    href={v.doc_url}
                    target="_blank"
                    className="list-item-link"
                  >
                    <div className="thumbnail">
                      <ImageView src={v.thumbnail_url} alt={v.display_sitename}/>
                      {/* <img src={v.thumbnail_url} alt={v.display_sitename} /> */}
                    </div>
                    <div className="content">
                      <h3>{v.display_sitename}</h3>
                      <ul>
                        <li>{v.collection}</li>
                        <li>
                          {v.width}x{v.height}
                        </li>
                        <li>{dayjs(v.datetime).format("YYYY_MM_DD hh:mm")}</li>
                      </ul>
                    </div>
                  </a>
                </li>
              );
            })}
          </ImageList>
        )}  
      </article>
    </ImageContainer>
  )
});

export default ImageSearch;