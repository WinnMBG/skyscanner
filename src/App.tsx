import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Page1 from './components/pages/Page1';
import Page2 from './components/pages/Page2';
import Page3 from './components/pages/Page3';
import Page4 from './components/pages/Page4';
import NavbarC from './components/usefulComponents/Navbar';

const App: React.FC = () => {
  return (
    <>
      <NavbarC/>
      <Routes>
          <Route
            path='/'
            element={<Page1/>}
          />
          <Route
            path='/reserveflight'
            element={<Page2/>}
          />
          {/* add endpoint de la route en dessous :departure/:departuredate/:return/:returndate/:id*/}
          <Route
            path='/flightdetail/:departure/:departuredate/:return/:returndate/:id'
            element={<Page3/>}
          />
          <Route
            path='/favoris'
            element={<Page4/>}
          />
          <Route
            path='*'
            element={<h1>Error 404 not found ...</h1>}
          />
      </Routes>
    </>
  );
}

export default App;
