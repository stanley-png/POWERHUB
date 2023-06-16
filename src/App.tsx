import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from './components/StaticPages/HomePage';
import Footer from './components/StaticPages/Footer';
import PageNotFound from './components/StaticPages/PageNotFound';
import SubmitProject from './components/SubmitProject';
import SubmitIdea from './components/SubmitIdea';
import ContactUs from './components/StaticPages/ContactUs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import('preline')

function App() {

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/submitProject" element={<SubmitProject />} />
        <Route path="/idea-submission" element={<SubmitIdea />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
