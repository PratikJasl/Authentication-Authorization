import './App.css'
import  VerifyEmail from './components/auth/VerifyEmail'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </>
  )
}

export default App
