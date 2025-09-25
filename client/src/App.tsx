import './App.css'
import { ToastContainer } from 'react-toastify';
import  VerifyEmail from './components/auth/VerifyEmail'
import { Route, Routes } from 'react-router-dom'
import VerifyOTP from './components/auth/VerifyOtp';
import SignUp from './components/auth/SignUp';

function App() {

  return (
    <>
      <Routes>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signup" element={<SignUp />} />
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
