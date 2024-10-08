import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './style/body.css'
import Private from './Private.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/private" replace />}/>
      <Route path='/private' element={<Private />} />
    </Routes>
  </BrowserRouter>,
)