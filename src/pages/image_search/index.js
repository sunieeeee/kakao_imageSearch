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