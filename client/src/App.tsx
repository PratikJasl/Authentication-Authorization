import './App.css'
import { ToastContainer } from 'react-toastify';
import  VerifyEmail from './components/auth/VerifyEmail'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>

      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </>
  )
}

export default App
