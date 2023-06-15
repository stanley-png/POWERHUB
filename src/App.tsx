import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from './components/StaticPages/HomePage';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import('preline')

function App() {

  return (
    <main>
      <Header/>
      <HomePage/>
      <h1>Hello power hub</h1>
    </main>
  )
}

export default App
