import React, {memo} from 'react';
import ImageSearch from './pages/image_search';

const App = memo(() => {
  return (
    <div>
      <ImageSearch />
    </div>
  );
});

export default App;