import './App.css'
import { ToastContainer } from 'react-toastify';
import  VerifyEmail from './components/auth/VerifyEmail'
import { Route, Routes } from 'react-router-dom'
import VerifyOTP from './components/auth/VerifyOtp';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import DashBoard from './components/dashboard/DashBoard';
import Upload from './components/upload/Upload';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import AuthProvider from './components/auth/AuthProvider';

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
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
      </AuthProvider>
    </>
  )
}

export default App
