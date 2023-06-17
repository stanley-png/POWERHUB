import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from './components/StaticPages/HomePage';
import Alumni from './components/StaticPages/Alumni';
import Footer from './components/StaticPages/Footer';
import PageNotFound from './components/StaticPages/PageNotFound';
import SubmitProject from './components/SubmitProject';
import SubmitIdea from './components/SubmitIdea';
import Login from './components/Login';
import Specialization from './components/Specialization';
import ContactUs from './components/StaticPages/ContactUs';
import { useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice";
import Dashboard from './components/Admin/Dashboard';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import('preline')

function App() {
  const user = useSelector(selectUser)

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/submitProject" element={<SubmitProject />} />
        <Route path="/idea-submission" element={<SubmitIdea />} />
        <Route path="/specialization" element={<Specialization />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {user && <Route path="/admin" element={<Dashboard/>}/>}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
