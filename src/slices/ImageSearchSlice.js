import {createAsyncThunk} from '@reduxjs/toolkit';
import getDefaultSlice from '../helpers/ReduxHelper';
import axios from 'axios';

//연동할 백엔드 주소
const API_URL = 'https://dapi.kakao.com/v2/search/image';

const API_KEY ='885e1981215e34c859312ab138c6afec';

/** Ajax처리를 위한 함수를 정의 */
export const getList = createAsyncThunk('ImageSearchSlice/getList', async(payload, {rejectWithValue}) => {
  let result = null;

  try {
    const response = await axios.get(API_URL, {
      params: {
        query: payload.keyword,
        page: payload.page || 1,
        size: 80
      },
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      }
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/** Slice 객체 생성 */
const ImageSearchSlice = getDefaultSlice('ImageSearchSlice', [getList], (state, {meta, payload}) => {
  //백엔드로부터 데이터 수신에 성공했을 경우 별도의 처리가 필요한 경우 callback함수를 구현
  //meta.arg는 백엔드에 전달한 파라미터를 의미
  //1페이지 이후의 검색 결과는 기존 데이터에 덧붙여야 한다.
  if(meta.arg.page > 1) {
    //state.data.documents는 기존 데이터
    //payload.documents는 새로운 데이터
    //A.concat(B)는 A에 B를 덧붙임
    const currentData = {...state.data};
    console.log('before: ', currentData.documents.length);
    currentData.documents = currentData.documents.concat(payload.documents);
    console.log('after: ', currentData.documents.length);

    return {
      data: currentData,
      loading: false,
      error: null
    }
  }

  return {
    data: payload,
    loading: false,
    error: null
  }
});

//리듀서 객체 내보내기
export default ImageSearchSlice.reducer;