import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Layouts/Home'
import Diagnosis from './Layouts/Diagnosis'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
