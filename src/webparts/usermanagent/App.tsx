
import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Profile from './components/Profile/Profile';
// import Document from "./components/Documents/Document"

function App() {



  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profilebvc/:Id" element={<Profile />} />
        {/* <Route path="/documents" element={<Document/>} /> */}

      </Routes>
    </HashRouter>
  )
}

export default App;
