
import * as React from 'react';
// import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
// import Search from './pages/Search';

// import Document from "./components/Documents/Document"

// interface Props {
//   onSearch: () => void;
//   onUpload: (file: File) => void;
// }

// function App({ onSearch, onUpload }: Props): JSX.Element {
  // your component code here
  function App() {



  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route
          path="/add-user"
          element={<AddUser />}
        
        /> */}
 {/* <Route path='/document' element={<Document />} />      */}
  </Routes>
    </HashRouter>
  )
}

export default App;
