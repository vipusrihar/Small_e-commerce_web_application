import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import BookDetail from './components/BookDetail'
import NavBar from './components/NavBar'
import OrderForm from './components/OrderForm'
import LoginPage from './pages/LoginPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/book/:bookId' element={<BookDetail />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/order/create' element={<OrderForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
