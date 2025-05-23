import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile/:userId" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App