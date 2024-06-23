import React, {memo, useCallback} from 'react';
import noimg from '../../assets/img/noImg.png';

const ImageView = memo(({src, alt}) => {
  //이미지 로딩 실패시 호출되는 이벤트 함수
  const onImageError = useCallback((e) => {
    e.currentTarget.src = noimg;
  });

  return <img src={src || noimg} alt={alt} onError={onImageError} />;
});

export default ImageView;