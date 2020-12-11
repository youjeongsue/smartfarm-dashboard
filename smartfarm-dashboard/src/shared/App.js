import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Main from '../dashboard/main/Main';

function App() {
  return (
    <BrowserRouter className='container'>
      <Route path='/' component={Main} />
    </BrowserRouter>
  );
}

export default App;
