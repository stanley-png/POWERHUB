import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import('preline')

function App() {

  return (
    <main>
      <Header/>
      <h1>Hello power hub</h1>
    </main>
  )
}

export default App
