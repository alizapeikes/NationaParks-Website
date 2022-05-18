import React from 'react';
import {Home} from '../Home/home';
import {Header} from '../Header/header';
import {Explore} from '../explore/explore'
import {Itinerary } from '../itinerary/itinerary';
import {Footer} from  '../Footer/footer'
import {WishList} from '../WishList/wishList'
import {DisplayParkProvider} from "../State/displayParkContext";
import {WishListProvider } from '../State/wishListContext';
import {ThingsTodoProvider} from '../State/thingsToDoContext';
import {HashRouter, Routes, Route,} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <DisplayParkProvider>
        <WishListProvider>
          <ThingsTodoProvider>
          <HashRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
               <Route path="/explore" element={<Explore />} />  
                <Route path="/itinerary" element={<Itinerary />} /> 
                <Route path="/wishList" element={<WishList />} /> 
            </Routes>
            <Footer />
          </HashRouter>
          </ThingsTodoProvider>
          </WishListProvider>
        </DisplayParkProvider >
    </div>
  );
}
export default App;
