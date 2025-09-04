import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import BookDetail from './components/BookDetail'
import NavBar from './components/NavBar'
import OrderForm from './components/OrderForm'
import ProfilePage from './pages/ProfilePage'
import OrdersPage from './pages/OrdersPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/book/:bookId' element={<BookDetail />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/orders' element={<OrdersPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App




