import {configureStore} from '@reduxjs/toolkit';
import ImageSearchSlice from './slices/ImageSearchSlice';

const store = configureStore({
  reducer: {
    //형식 => 이름: 값
    //--> 이름은 보통 리듀서의 객체이름과 통일 시킨다.
    ImageSearchSlice: ImageSearchSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export default store;