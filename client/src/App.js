import "./App.css";
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Todo from "./components/Todo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/todo" element={<Todo/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App